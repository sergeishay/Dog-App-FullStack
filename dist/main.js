const apiManager = new APIManager();
const renderer = new Renderer();

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

$("#main-container").on("click", ".register-btn", function() {
    const firstName = $(this).siblings(".name").find("#register-first").val()
    const lastName = $(this).siblings(".name").find("#register-last").val();
    const email = $(this).siblings(".email").find("input").val();
    const password = $(this).siblings(".password").find("input").val();
    const user = { firstName, lastName, password, email };
    apiManager.createNewUser(user);
    localStorage.setItem("user", JSON.stringify(user));
    loadPage();
})

$("#main-container").on("click", ".login-btn", function() {
    const email = $(this).siblings(".email").find("input").val();
    const password = $(this).siblings(".password").find("input").val();

});

$("#navbar-container").on("click", ".profile", () => {
    renderer.renderProfile(apiManager.mainUser);
});

$("#navbar-container").on("click", ".map", async() => {
    $("#main-container").empty();
    await apiManager.getAllNearbyUsers();
    initMap();
});

const initMap = () => {

    var map = new google.maps.Map(document.getElementById('map'), {
        streetViewControl: false,
        rotateControl: false,
        fullscreenControl: false,
        mapTypeControl: false,
        zoomControl: true,
        zoomControlOptions: {
            position: google.maps.ControlPosition.RIGHT_TOP
        },
        zoom: 16,
        center: new google.maps.LatLng(apiManager.data.mainUser.lat, apiManager.data.mainUser.lon)
    });

    const markerArr = []
    const contentArr = []
    for (let i = 0; i < apiManager.data.users.length; i++) {
        let marker = new google.maps.Marker({
            position: new google.maps.LatLng(apiManager.data.users[i].lat, apiManager.data.users[i].lon),
            map: map,
            title: apiManager.data.users[i].dog.name,
            icon: "assets/download1.png"
        })

        let contentString =
            '<div id="iw-container">' +
            `<div class="iw-title"><img src="${apiManager.data.users[i].dog.picture}" class="map-image" height="80" width="80">` +
            `<div class="iw-name">${apiManager.data.users[i].dog.name}</div>` +
            '</div>' +
            '<div class="iw-content">' +
            `<div class="iw-subTitle">${apiManager.data.users[i].dog.breed}</div>` +
            `<p>${apiManager.data.users[i].dog.toy}<br>${apiManager.data.users[i].dog.treat}</p>` +
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