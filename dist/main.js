const apiManager = new APIManager()

function initMap() {

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

        marker.addListener('click', function () {
            infowindow.open(marker.get("map"), marker);
        });
    }


    // google.maps.event.addListener(marker, 'click', (function (marker, content, infowindow) {
    //     return function () {

    //         infowindow.setContent(content);
    //         infowindow.open(map, marker);
    //     }
    // })(marker, contentString, infowindow))

}


//     var infowindow = new google.maps.InfoWindow({
//         content: contentString
//     });


//     var infowindow2 = new google.maps.InfoWindow({
//         content: contentString2
//     });

//     var marker = new google.maps.Marker({
//         position: uluru,
//         map: map,
//         title: 'Dog 1',
//         icon: "assets/download1.png"
//     });

//     var marker2 = new google.maps.Marker({
//         position: uluru2,
//         map: map,
//         title: 'Dog 2',
//         icon: "assets/download1.png"
//     });

//     marker.addListener('click', function () {
//         infowindow.open(map, marker);
//     });

//     marker2.addListener('click', function () {
//         infowindow2.open(map, marker2);
//     });
// }


// mapInfo = {
//     user: {
//         _id: 12345,
//         lat: 32.0784,
//         lon: 34.815,
//         dog: {
//             name: "Lucky",
//             breed: "husky",
//             picture: "http://cdn.akc.org/content/article-body-image/newfoundland_dog_pictures.jpg",
//             toy: "ball",
//             treat: "bone"
//         }

//     },
//     otherUsers: [
//         {
//             _id: 2345,
//             lat: 32.0783,
//             lon: 34.814,
//             dog: {
//                 name: "Lucky",
//                 breed: "husky",
//                 picture: "http://cdn.akc.org/content/article-body-image/newfoundland_dog_pictures.jpg",
//                 toy: "ball",
//                 treat: "bone"
//             }
//         }
//         , {
//             _id: 2346,
//             lat: 32.0783,
//             lon: 34.816,
//             dog: {
//                 name: "Lucky",
//                 breed: "husky",
//                 picture: "http://cdn.akc.org/content/article-body-image/newfoundland_dog_pictures.jpg",
//                 toy: "ball",
//                 treat: "bone"
//             }
//         },
//         {
//             _id: 2347,
//             lat: 32.0783,
//             lon: 34.815,
//             dog: {
//                 name: "Lucky",
//                 breed: "husky",
//                 picture: "http://cdn.akc.org/content/article-body-image/newfoundland_dog_pictures.jpg",
//                 toy: "ball",
//                 treat: "bone"
//             }
//         },
//     ]
// }}
