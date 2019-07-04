$(document).ready(() => {
  const url = "https://api.wheretheiss.at/v1/satellites/25544";
  printInfo(0);

  const mymap = L.map("mapid").setView([0, 0], 3);
  const myIssIcon = L.icon({
    iconUrl: "../images/200iss.png",
    iconSize: [50, 32],
    iconAnchor: [25, 16]
  });
  const marker = L.marker([0, 0], { icon: myIssIcon }).addTo(mymap);

  L.tileLayer(
    "https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token=pk.eyJ1Ijoicml0aWstYmhhcmR3YWoiLCJhIjoiY2p4cDMzbHd6MDk5eDNubzIzb28xNmNwcyJ9.NiInb99O-Fa_BvA5ZyfjwQ",
    {
      attribution:
        'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
      maxZoom: 18,
      id: "mapbox.streets",
      accessToken:
        "pk.eyJ1Ijoicml0aWstYmhhcmR3YWoiLCJhIjoiY2p4cDMzbHd6MDk5eDNubzIzb28xNmNwcyJ9.NiInb99O-Fa_BvA5ZyfjwQ"
    }
  ).addTo(mymap);

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
