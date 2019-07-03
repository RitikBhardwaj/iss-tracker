const url = "https://api.wheretheiss.at/v1/satellites/25544";

//update the information every 1.5 seconds
setInterval(getLatLng, 1500);
function getLatLng() {
  $.ajax({
    url: url
  }).done(data => {
    $("#latitude").text(" " + data.latitude.toFixed(3) + " ");
    $("#longitude").text(" " + data.longitude.toFixed(3) + " ");
    $("#altitude").text(" " + data.altitude.toFixed(2) + " ");
    $("#velocity").text(" " + data.velocity.toFixed(3) + " ");
  });
}

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

$("button#change-giphy").click(() => {
  var index = Math.floor(100 * Math.random());
  changeGiphy(index);
});
