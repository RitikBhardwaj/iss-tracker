
const url = "https://api.wheretheiss.at/v1/satellites/25544";
setInterval(getLatLng,3000);
function getLatLng(){
    $.getJSON(url,data =>{
        $('#latitude').text(' '+data.latitude.toFixed(3)+' ');
        $('#longitude').text(' ' + data.longitude.toFixed(3)+' ');
        $('#altitude').text(' ' + data.altitude.toFixed(2) + ' ');
        $("#velocity").text(" " + data.velocity.toFixed(3) + " ");
    }
)};

function changeGiphy(index){
    $.getJSON(
      'https://api.giphy.com/v1/gifs/search?api_key=QNMAgj5xQCnIARW3YiQ24rmuVqQSWS1r&q=nasa+iss&limit=100&offset=0&rating=G&lang=en'
    ,data=>{
        console.log(data.data[0].images.original.url);
        $('body').css('background-image',`url(${data.data[index].images.original.url})`);
    });
}

$('button#change-giphy').click(()=>{
    var index = Math.floor(100*Math.random());
    changeGiphy(index);
});