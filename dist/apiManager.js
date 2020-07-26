class APIManager {
    constructor() {
        this.data = {
            mainUser: { _id: 12345,
                lat: 32.0784,
                lon: 34.815,
                dog: {
                    name: "Lucky",
                    breed: "husky",
                    picture: "http://cdn.akc.org/content/article-body-image/newfoundland_dog_pictures.jpg",
                    toy: "ball",
                    treat: "bone"
                }},
            users: [{
                _id: 2345,
                lat: 32.0783,
                lon: 34.814,
                dog: {
                    name: "Star",
                    breed: "italian",
                    picture: "assets/download.jpg",
                    toy: "ball",
                    treat: "stuff"
                }
            }
            , {
                _id: 2346,
                lat: 32.0783,
                lon: 34.816,
                dog: {
                    name: "Nova",
                    breed: "Greyhound",
                    picture: "http://cdn.akc.org/content/article-body-image/newfoundland_dog_pictures.jpg",
                    toy: "things",
                    treat: "bone"
                }
            },
            {
                _id: 2347,
                lat: 32.0783,
                lon: 34.815,
                dog: {
                    name: "Henry",
                    breed: "golden",
                    picture: "http://cdn.akc.org/content/article-body-image/newfoundland_dog_pictures.jpg",
                    toy: "ball",
                    treat: "bone"
                }
            }],
            events: []
        };
    }
    createNewUser = async user => {
        this.data.mainUser = await $.post("/user", user);
    }
    createNewEvent = async event => {
        this.data.events.push(await $.post("/event", event))
    }
    createNewDog = (userId, dog) => {
        $.post(`/dog/${userId}`, dog);
    }
    getAllEvents = async() => {
        this.data.events = await $.get("/events");
    }
    getAllNearbyUsers = async() => {
        this.data.users = await $.get("/users");
    }
    updateUserProfile = (userId, info) => {
        $.ajax({
            url: `user/${userId}`,
            method: "PUT",
            data: info,
            success: updatedUser => {
                this.mainUser = updatedUser;
            }
        });
    }
    joinEvent = async eventId => {
        $.ajax({
            url: `/event/${eventId}`,
            method: "PUT",
            data: this.mainUser
        });
    }

    checkAuthState = user => {
        if (user) {
            return true;
        } else {
            return false;
        }
    }

    updateEvent = async(eventId, info) => {
        $.ajax({
            url: `/event/${eventId}`,
            method: "PUT",
            data: info,
            success: updatedEvent => {
                const oldEventIndex = this.data.events.findIndex(event => event.id === eventId);
                this.data.events.splice(oldEventIndex, 1, updatedEvent);
            }
        });
    }
    deleteUser = async userId => {
        return $.ajax({
            url: `/user/${userId}`,
            method: `DELETE`,
            success: () => {
                if (this.data.mainUser.id === userId) {
                    this.data.mainUser = {}
                }
                const oldUserIndex = this.data.users.findIndex(user => user.id === userId);
                this.data.users.splice(oldUserIndex, 1);
            }
        });
    }
    deleteEvent = async eventId => {
        return $.ajax({
            url: `/event/${eventId}`,
            method: `DELETE`,
            success: () => {
                const oldEventIndex = this.data.events.findIndex(event => event.id === eventId);
                this.data.events.splice(oldEventIndex, 1);
            }
        });
    }
    deleteDog = async dogId => {
        return $.ajax({
            url: `/event/${dogId}`,
            method: `DELETE`,
        });
    }

    initMap = () => {
        var map = new google.maps.Map(document.getElementById('map'), {
            zoom: 10,
            center: new google.maps.LatLng(user.lat, user.lon),
            mapTypeId: google.maps.MapTypeId.ROADMAP
          });
          var infowindow = new google.maps.InfoWindow();
          var marker, i;
          for (i = 0; i < this.data.users.length; i++) {
            marker = new google.maps.Marker({
              position: new google.maps.LatLng(user[i][1], user[i][2]),
              map: map
            });
            google.maps.event.addListener(marker, 'click', (function(marker, i) {
              return function() {
                infowindow.setContent(user[i][0]);
                infowindow.open(map, marker);
              }
            })(marker, i));
          }
    }
}
