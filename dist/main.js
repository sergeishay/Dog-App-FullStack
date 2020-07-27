const apiManager = new APIManager();
const renderer = new Renderer();

function loadScript() {
    const script = document.createElement("script");
    script.type = "text/javascript";
    script.src = 'https://maps.googleapis.com/maps/api/js?key=AIzaSyDZAMd5ujixxcusvcP1f8SCsSVDcQaZp-o&callback=initMap';
    script.defer = true;
    script.async = true
    document.body.appendChild(script)
}

const loadPage = () => {
    if (apiManager.checkAuthState()) {
        apiManager.getMainUserById(JSON.parse(localStorage.getItem("user"))._id);
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
        await apiManager.createNewUser(user);
        localStorage.setItem("user", JSON.stringify(apiManager.data.mainUser));
        renderer.renderProfile(apiManager.data.mainUser);
    })
})

$("#main-container").on("click", ".login-btn", function() {
    const email = $(this).siblings(".email").find("input").val();
    const password = $(this).siblings(".password").find("input").val();
});

$("#navbar-container").on("click", ".profile", () => {
    renderer.renderProfile(apiManager.data.mainUser);
});
const mapDiv = document.getElementById('map')

function initMap() {

    // var script = document.createElement("script");
    // script.type = "text/javascript";
    // script.src = "https://maps.googleapis.com/maps/api/js?key=AIzaSyDZAMd5ujixxcusvcP1f8SCsSVDcQaZp-o";
    // script.async = true;
    // document.body.prepend(script);


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