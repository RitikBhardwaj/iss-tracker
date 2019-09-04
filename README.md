# ISS - tracker with GIPHY!

### Check out the project => https://ritik-iss.herokuapp.com <= on Heroku

Tracks the coordinates, velocity and altitude of the International Space Station.

![Website](Public/images/website.png)

# API

#### ISS data

https://whereistheiss.at/w/developer

#### Giphy API

https://developers.giphy.com

#### Map [leaflet.js, Mapbox]

- [leaflet.js](https://leafletjs.com)
- [Mapbox](https://www.mapbox.com)

# Technology stack

#### Front end

- HTML
- CSS
- Jquery

#### Backend

- Node.js
- Express

#### Deployment

- Heroku



# Javascript (Front-end)

```javascript
$(document).ready(() => {
  const url = "https://api.wheretheiss.at/v1/satellites/25544";
  printInfo(0);

  // Initializing the map
  const mymap = L.map("mapid").setView([0, 0], 3);
  // Change the map icon
  const myIssIcon = L.icon({
    iconUrl: "../images/200iss.png",
    iconSize: [50, 32],
    iconAnchor: [25, 16]
  });
  const marker = L.marker([0, 0], { icon: myIssIcon }).addTo(mymap);
  //Add mapbox tiles
  L.tileLayer(
    "https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token=pk.eyJ1Ijoicml0aWstYmhhcmR3YWoiLCJhIjoiY2p4cDMzbHd6MDk5eDNubzIzb28xNmNwcyJ9.NiInb99O-Fa_BvA5ZyfjwQ",
    {
      attribution:
        'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery Â© <a href="https://www.mapbox.com/">Mapbox</a>',
      maxZoom: 18,
      id: "mapbox.streets",
      accessToken:
        "pk.eyJ1Ijoicml0aWstYmhhcmR3YWoiLCJhIjoiY2p4cDMzbHd6MDk5eDNubzIzb28xNmNwcyJ9.NiInb99O-Fa_BvA5ZyfjwQ"
    }
  ).addTo(mymap);

  //to fetch the data every 3 seconds
  setInterval(() => {
    fetch(url)
      .then(response => {
        return response.json();
      })
      .then(parsedResponse => {
        var latlng = L.latLng(
          parsedResponse.latitude,
          parsedResponse.longitude
        );
        marker.setLatLng(latlng);
        mymap.panTo(latlng);
      });
  }, 3000);

  //event handler for the li's
  $("div#api-content div#menu ul").click(e => {
    if (e.target !== e.currentTarget) {
      if (e.target.id === "location") {
        printInfo(0);
      } else if (e.target.id === "speed") {
        printInfo(1);
      } else if (e.target.id === "altitude") {
        printInfo(2);
      }
    }
    e.stopPropagation();
  });

  $("button#change-giphy").click(() => {
    var index = Math.floor(100 * Math.random());
    changeGiphy(index);
  });

  function changeGiphy(index) {
    //ajax call to the api using jquery ajax
    $.ajax({
      url:
        "https://api.giphy.com/v1/gifs/search?api_key=QNMAgj5xQCnIARW3YiQ24rmuVqQSWS1r&q=nasa+iss&limit=100&offset=0&rating=G&lang=en"
    }).done(data => {
      console.log(data.data[0].images.original.url);
      $("body").css(
        "background-image",
        `url(${data.data[index].images.original.url})`
      );
    });
  }
  //function to print the data onto the DOM
  function printInfo(number) {
    fetch(url)
      .then(response => {
        return response.json();
      })
      .then(response => {
        // finalResponse = parsedResponse;
        // printInfo(number, finalResponse);
        if (number === 0) {
          $("div#api-content div#result").html(`
        <h3>Latitude: ${response.latitude.toFixed(3)} &deg</h3>
        <h3>Longitude: ${response.longitude.toFixed(3)} &deg</h3>
      `);
        }
        if (number === 1) {
          $("div#api-content div#result").html(
            `<h3>Speed: ${response.velocity.toFixed(
              3
            )} <span style="font-size: 10px;">km/h</span></h3>`
          );
        }
        if (number === 2) {
          $("div#api-content div#result").html(
            `<h3>Altitude: ${response.altitude.toFixed(
              3
            )}<span style="font-size: 10px">Km</span></h3>`
          );
        }
      });
  }
});
```

