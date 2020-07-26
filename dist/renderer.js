class Renderer {
    renderMap = mapInfo => {
        this.makeHandlebar("#map-template", "#map", mapInfo)
    }

    renderAuthNav = user => {
        this.makeHandlebar("#authNav-template", '#navbar-container', user)
    }

    renderNonAuthNav = (string) => {
        this.makeHandlebar("#nonAuthNav-template", '#navbar-container', string)
    }
}
Renderer.prototype.makeHandlebar = (templateId, containerId, data) => {
    const source = $(templateId).html();
    const template = Handlebars.compile(source);
    const newHTML = template(data);
    $(containerId).empty().append(newHTML);
}