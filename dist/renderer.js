class Renderer {
    renderMap = mapInfo => {
        $('#map').empty()
        const source = $('#map-template').html()
        const template = Handlebars.compile(source)
        const newHTML = template({ mapInfo })

        $('#map').append(newHTML)
    }
}