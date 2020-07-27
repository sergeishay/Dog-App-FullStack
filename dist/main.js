const apiManager = new APIManager();
const renderer = new Renderer();
const geocoder = new google.maps.Geocoder()

const loadPage = () => {
    if (apiManager.checkAuthState()) {
        renderer.renderAuthNav(apiManager.data.mainUser);
    } else {
        renderer.renderNonAuthNav("");
    }
    renderer.renderLandingPage("")
}

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

$("#main-container").on("click", ".register-btn", async function() {
    const firstName = $(this).siblings(".name").find("#register-first").val()
    const lastName = $(this).siblings(".name").find("#register-last").val();
    const email = $(this).siblings(".email").find("input").val();
    const password = $(this).siblings(".password").find("input").val();
    await navigator.geolocation.getCurrentPosition(async position => {
        const userLat = position.coords.latitude;
        const userLon = position.coords.longitude;
        const user = { firstName, lastName, password, email, userLat, userLon };
        apiManager.createNewUser(user);
        localStorage.setItem("user", JSON.stringify(apiManager.data.mainUser));
        renderer.renderProfileForm(apiManager.data.mainUser)
    })
})

$("#main-container").on("click", ".login-btn", function() {
    const email = $(this).siblings(".email").find("input").val();
    const password = $(this).siblings(".password").find("input").val();
});

$("#navbar-container").on("click", ".profile", () => {
    renderer.renderProfile(apiManager.data.mainUser);
});

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

    if (address) {
        geocoder.geocode({ address: address }, async function(result, status) {
            const userLat = result[0].geometry.location.lat();
            const userLon = result[0].geometry.location.lng();
            const fullAddress = result[0].formatted_address.split(", ");
            const city = fullAddress[0]
            const country = fullAddress[1]
            const info = { firstName, lastName, userPicture, radius, aboutMe, userLat, userLon, city, country };
            renderer.renderProfile(apiManager.getMainUserById(apiManager.data.mainUser._id))
        })
    }
    renderer.renderProfile(apiManager.getMainUserById(apiManager.data.mainUser._id))
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
            '<div id="iw-container">' +
            `<div class="iw-title"><img src="${apiManager.data.users[i].dogs[0].dogPicture}" onerror="this.src='https://www.shvilhalev.co.il/wp-content/uploads/2018/07/default-user-image-300x300.png'" "class="map-image" height="80" width="80">` +
            `<div class="iw-name">${apiManager.data.users[i].dogs[0].dogName}</div>` +
            '</div>' +
            '<div class="iw-content">' +
            `<div class="iw-subTitle">${apiManager.data.users[i].dogs[0].breed}</div>` +
            `<p>${apiManager.data.users[i].dogs[0].favoriteToy}<br>${apiManager.data.users[i].dogs[0].favoriteTreat}</p>` +
            '<button>Profile</button>' +
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

        marker.addListener('click', function() {
            infowindow.open(marker.get("map"), marker);
        });
    }
}


loadPage();

$(document).ready(function() {
    $("#navbar-container").on("click", ".map", async() => {
        $("#main-container").empty().append("<div id='map'></div>");
        await apiManager.getAllNearbyUsers();
        initMap();
    });
})