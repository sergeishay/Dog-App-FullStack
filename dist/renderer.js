class Renderer {

    renderAuthNav = user => {
        this.makeHandlebar("#authNav-template", '#navbar-container', user)
    }

    renderNonAuthNav = (string) => {
        this.makeHandlebar("#nonAuthNav-template", '#navbar-container', string)
    }

    renderLandingPage = (string) => {
        this.makeHandlebar("#home-template", '#main-container', string)
    }

    renderLogin = () => {
        this.makeHandlebar("#login-template", '#main-container', null)
    }

    renderRegister = () => {
        this.makeHandlebar("#register-template", '#main-container', null)
    }

    renderProfile = (user) => {
        this.makeHandlebar("#profile-template", '#main-container', user)
    }

    renderEvent = (events) => {
        this.makeHandlebar("#events-template", '#main-container', events)
    }

    renderEventForm = (events) => {
        this.makeHandlebar("#eventsForm-template", '#main-container', events)
    }
}

Renderer.prototype.makeHandlebar = (templateId, containerId, data) => {
    const source = $(templateId).html();
    const template = Handlebars.compile(source);
    const newHTML = template(data);
    $(containerId).empty().append(newHTML);
}