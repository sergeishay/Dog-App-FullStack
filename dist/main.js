const renderer = new Renderer()
// Chat Box Listeners-------------------------------------------------------
$("#chat-circle").click(function () {
    $("#chat-circle").toggle('scale');
    $(".chat-box").toggle('scale');
})

$(".chat-box-toggle").click(function () {
    $("#chat-circle").toggle('scale');
    $(".chat-box").toggle('scale');
})

$('select').material_select();


mapInfo = {
    user: {
        _id: 12345,
        lat: 32.0784,
        lon: 34.815,
        dog: {
            name: "Lucky",
            breed: "husky",
            picture: "http://cdn.akc.org/content/article-body-image/newfoundland_dog_pictures.jpg",
            toy: "ball",
            treat: "bone"
        }

    },
    otherUsers: [
        {
            _id: 2345,
            lat: 32.0783,
            lon: 34.814,
            dog: {
                name: "Lucky",
                breed: "husky",
                picture: "http://cdn.akc.org/content/article-body-image/newfoundland_dog_pictures.jpg",
                toy: "ball",
                treat: "bone"
            }
        }
        , {
            _id: 2346,
            lat: 32.0783,
            lon: 34.816,
            dog: {
                name: "Lucky",
                breed: "husky",
                picture: "http://cdn.akc.org/content/article-body-image/newfoundland_dog_pictures.jpg",
                toy: "ball",
                treat: "bone"
            }
        },
        {
            _id: 2347,
            lat: 32.0783,
            lon: 34.815,
            dog: {
                name: "Lucky",
                breed: "husky",
                picture: "http://cdn.akc.org/content/article-body-image/newfoundland_dog_pictures.jpg",
                toy: "ball",
                treat: "bone"
            }
        },
    ]
}

renderer.renderData(mapInfo)