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

    renderProfileForm = () => {
        this.makeHandlebar("#profileEdit-template", '#main-container', null)

    }

    renderChatMessage = (msg) => {
        this.makeHandlebar("#message-template", '.chat-logs', msg, true)
    }
}

    Renderer.prototype.makeHandlebar = (templateId, containerId, data, bool) => {
        if(!bool) $(containerId).empty()
        const source = $(templateId).html();
        const template = Handlebars.compile(source);
        console.log(data)
        const newHTML = template(data);
        $(containerId).append(newHTML);
    }

