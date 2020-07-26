class Renderer {
    renderMap = mapInfo => {
        this.makeHandlebar("#map-template", "#map", mapInfo)
    }

    renderAuthNav = user =>{
        this.makeHandlebar("#authNav-template", '#navbar-container', user)
    }

    renderNonAuthNav = () => {
        this.makeHandlebar("#authNav-template", '#navbar-container', undefined)
    }
}
Renderer.prototype.makeHandlebar = (templateId, containerId, data) => {
    const source = $(templateId).html();
    const template = Handlebars.compile(source);
    const newHTML = template(data);
    $(containerId).empty().append(newHTML);
}