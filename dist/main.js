const apiManager = new APIManager();
const renderer = new Renderer();
const socket = io();
const geocoder = new google.maps.Geocoder();

const loadPage = () => {
    if (apiManager.checkAuthState()) {
        renderer.renderAuthNav(apiManager.data.mainUser);
        apiManager.getMainUserById(JSON.parse(localStorage.getItem("user"))._id)
    } else {
        renderer.renderNonAuthNav("");
    }
    renderer.renderLandingPage("")
}

$("#navbar-container").on("click", ".logout", () => {
    apiManager.data.mainUser = {}
    renderer.renderNonAuthNav();
    renderer.renderLandingPage();
})

$("#main-container").on("click", ".home-btn", () => {
    renderer.renderLogin();
});

$("#main-container").on("click", ".login", () => {
    renderer.renderLogin();
});

$("#main-container").on("click", ".register", () => {
    renderer.renderRegister()
});

$("#navbar-container").on("click", ".login", () => {
    renderer.renderLogin()
});

$("#navbar-container").on("click", ".register", () => {
    renderer.renderRegister()
});

$("#main-container").on("click", ".register-btn", async function(e) {
    e.preventDefault()
    const firstName = $(this).siblings(".name").find("#register-first").val()
    const lastName = $(this).siblings(".name").find("#register-last").val();
    const email = $(this).siblings(".email").find("input").val();
    const password = $(this).siblings(".password").find("input").val();
    navigator.geolocation.getCurrentPosition(async position => {
        const userLat = position.coords.latitude;
        const userLon = position.coords.longitude;
        const user = { firstName, lastName, password, email, userLat, userLon };
        await apiManager.createNewUser(user);
        localStorage.setItem("user", JSON.stringify(apiManager.data.mainUser));
        renderer.renderProfileForm(apiManager.data.mainUser);
    })
})

$("#main-container").on("click", ".login-btn", function () {
    const email = $(this).siblings(".email").find("input").val();
    const password = $(this).siblings(".password").find("input").val();
    const user = JSON.parse(localStorage.getItem("user"));
    if (email === user.email && password === user.password) {
        apiManager.data.mainUser = user;
        renderer.renderAuthNav();
        renderer.renderProfile(apiManager.data.mainUser);
    } else {
        prompt("Username or password is not correct :(")
    }
});

$("#navbar-container").on("click", ".profile", () => {
    renderer.renderProfile(apiManager.data.mainUser);
});

$("#navbar-container").on("click", ".map", async () => {
    $("#main-container").empty();
    await apiManager.getAllNearbyUsers();
    initMap();
})

$("#main-container").on("click", ".profileEdit-btn", () => {
    renderer.renderProfileForm(apiManager.data.mainUser);
});

$("#main-container").on("click", ".edit-profile", async function() {
    const userPicture = $(this).siblings(".photo").find(".user-photo").val()
    const firstName = $(this).siblings(".photo").find(".user-first").val()
    const lastName = $(this).siblings(".photo").find(".user-last").val()
    const radius = $(this).siblings(".distance").find(".user-radius").val()
    const address = $(this).siblings(".distance").find(".user-location").val()
    const aboutMe = $(this).siblings(".about").find(".user-about").val();

    const dogPicture = $(this).siblings(".dogPhoto").find(".user-dog-photo").val();
    const dogName = $(this).siblings(".dogPhoto").find(".user-dog-name").val();
    const breed = $(this).siblings(".dogPhoto").find(".user-dog-breed").val();
    const weight = $(this).siblings(".weight").find(".user-dog-weight").val();
    const favoriteTreat = $(this).siblings(".weight").find(".user-dog-treat").val();
    const favoriteToy = $(this).siblings(".weight").find(".user-dog-toy").val();
    const dog = { dogName, dogPicture, breed, weight, favoriteToy, favoriteTreat }
    await apiManager.createNewDog(apiManager.data.mainUser._id, dog)

    await geocoder.geocode({ address: address }, async function(result, status) {
        const userLat = result[0].geometry.location.lat();
        const userLon = result[0].geometry.location.lng();
        const fullAddress = result[0].formatted_address.split(", ");
        const city = fullAddress[0]
        const country = fullAddress[1]
        const info = { firstName, lastName, userPicture, radius, aboutMe, userLat, userLon, city, country };
        await apiManager.updateUserProfile(apiManager.data.mainUser._id, info);
        localStorage.setItem("user", JSON.stringify(apiManager.data.mainUser));
        $("#main-container").empty().append("<div id='map'></div>");
        await apiManager.getAllNearbyUsers();
        renderer.renderAuthNav();
        initMap();
    })
})

$("#main-container").on("click", ".map-profile", async function() {
    const otherUserId = $(this).closest("#iw-container").attr("class");
    await apiManager.getOtherUserById(otherUserId);
    renderer.renderProfile(apiManager.data.otherUser);
})

function initMap() {

    var map = new google.maps.Map(document.getElementById("map"), {
        streetViewControl: false,
        rotateControl: false,
        fullscreenControl: false,
        mapTypeControl: false,
        zoomControl: true,
        zoomControlOptions: {
            position: google.maps.ControlPosition.RIGHT_TOP
        },
        zoom: 16,
        center: new google.maps.LatLng(apiManager.data.mainUser.userLat, apiManager.data.mainUser.userLon)
    });

    const markerArr = []
    const contentArr = []
    for (let i = 0; i < apiManager.data.users.length; i++) {
        let marker = new google.maps.Marker({
            position: new google.maps.LatLng(apiManager.data.users[i].userLat, apiManager.data.users[i].userLon),
            map: map,
            title: apiManager.data.users[i].dogs[0].dogName,
            icon: "assets/download1.png"
        })

        let contentString =
            `<div class="${apiManager.data.users[i]._id}" id="iw-container">` +
            `<div class="iw-title"><img src="${apiManager.data.users[i].dogs[0].dogPicture}" onerror="this.src='https://www.shvilhalev.co.il/wp-content/uploads/2018/07/default-user-image-300x300.png'" "class="map-image" height="80" width="80">` +
            `<div class="iw-name">${apiManager.data.users[i].dogs[0].dogName}</div>` +
            '</div>' +
            '<div class="iw-content">' +
            `<div class="iw-subTitle">${apiManager.data.users[i].dogs[0].breed}</div>` +
            `<p>${apiManager.data.users[i].dogs[0].favoriteToy}<br>${apiManager.data.users[i].dogs[0].favoriteTreat}</p>` +
            '<button class="map-profile">Profile</button>' +
            '</div>' +
            '<div class="iw-bottom-gradient"></div>' +
            '</div>';
        markerArr.push([marker])
        contentArr.push([contentString])

    }
    for (let i = 0; i < markerArr.length; i++) {
        creatContent(markerArr[i][0], contentArr[i][0])

    }

    function creatContent(marker, content) {
        let infowindow = new google.maps.InfoWindow({
            content: content
        })

        marker.addListener('click', function () {
            infowindow.open(marker.get("map"), marker);
        });
    }
}

socket.on('messege', message => {
    renderer.renderChatMessage(message)
    apiManager.data.messages.push(message)
})

function ck(){
    event.preventDefault()
    const name = apiManager.data.mainUser.firstName
    const id = apiManager.data.mainUser._id
    const input = $("#chat-input").val()
    const time = moment().format('LTS')
    const messageObj = { 
        id: id,
        name: name,
        input: input,
        time: time 
    }
    socket.emit('chatMessage', messageObj)
    $("#chat-input").val('')
}    

$(document).ready(function() {
    $("#navbar-container").on("click", ".map", async() => {
        $("#main-container").empty().append("<div id='map'></div>");
        await apiManager.getMainUserById(JSON.parse(localStorage.getItem("user"))._id)
        await apiManager.getAllNearbyUsers();
        renderer.renderAuthNav()
        initMap();
    });
})

loadPage()