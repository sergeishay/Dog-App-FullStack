class Renderer {
    renderData = mapInfo => {
        $('#container').empty()
        const source = $('#map-template').html()
        const template = Handlebars.compile(source)
        const newHTML = template({ mapInfo })

        $('#container').append(newHTML)
    }
}

{
    user: {
        _id: 12345,
        location:
            {
                lat: 32.0784,
                lng: 34.815
            },
        dog: {
            name: Lucky,
            breed: husky,
            picture:
            toy:
            treat:
        }

    }
}