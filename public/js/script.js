// Renderizar o mapa
let map;
let marker;

let lat = -23.3055;
let lng = -45.967;
const position = { lat: lat, lng: lng };

async function initMap() {
  //@ts-ignore
  const { Map } = await google.maps.importLibrary("maps");
  const { Marker } = await google.maps.importLibrary("marker");

  map = new Map(document.getElementById("map"), {
    center: position,
    zoom: 13,
  });

  marker = new Marker({
    position: position,
    map: map,
    title: "Pin",
  });
}

function updateMap(loc) {
  const geocoder = new google.maps.Geocoder();
  
  let positionCep = { lat: 0, lng: 0 };

  geocoder.geocode({ address: loc }, function (results, status) {
    if (status === google.maps.GeocoderStatus.OK) {
      if (results[0]) {
        positionCep.lat = results[0].geometry.location.lat();
        positionCep.lng = results[0].geometry.location.lng();
        
        document.getElementById('lat').textContent = 'Latitude: ' + positionCep.lat.toFixed(6);
        document.getElementById('lng').textContent = 'Longitude: ' + positionCep.lng.toFixed(6);

        map.setCenter(positionCep);
        map.setZoom(19);
        marker.setPosition(positionCep);
      }
    } else {
      console.error('Geocode was not successful for the following reason: ' + status);
    }
  });
}

document.addEventListener("DOMContentLoaded", (event) => {
  const searchBtn = document.getElementById("search-btn");

  searchBtn.addEventListener("click", (e) => {
    e.preventDefault();

    const loc = document.getElementById("local").value;

    updateMap(loc);
  });
});

initMap();
