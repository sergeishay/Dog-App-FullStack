class Renderer {
    renderData = mapInfo => {
        $('#container').empty()
        const source = $('#map-template').html()
        const template = Handlebars.compile(source)
        const newHTML = template({ mapInfo })

        $('#container').append(newHTML)
    }
}

dogInfo = {
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
    otherUsers: {
        
    }
}