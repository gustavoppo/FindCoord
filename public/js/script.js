// Renderizar o mapa
let map;
let marker;

let lat = -23.3055;
let lng = -45.967;
const position = { lat: lat, lng: lng };

async function initMap() {
  //@ts-ignore
  const { Map } = await google.maps.importLibrary("maps");
  const { Marker } = await google.maps.importLibrary("marker"); // Use Marker instead of AdvancedMarkerElement

  map = new Map(document.getElementById("map"), {
    center: position,
    zoom: 13,
  });

  marker = new Marker({ // Create the marker after the map is initialized
    position: position,
    map: map,
    title: "Pin",
  });
}

function updateMap(lat, lng) {
  if (
    typeof lat === "number" &&
   !isNaN(lat) &&
    typeof lng === "number" &&
   !isNaN(lng)
  ) {
    const position = { lat: lat, lng: lng };
    map.setCenter(position);
    map.setZoom(19);
    marker.setPosition(position); // Use setPosition instead of position
  } else {
    console.error("Invalid latitude or longitude");
  }
}

document.addEventListener("DOMContentLoaded", (event) => {
  const searchBtn = document.getElementById("search-btn");

  searchBtn.addEventListener("click", (e) => {
    e.preventDefault();
    const latInput = document.getElementById("latitude").value;
    const lngInput = document.getElementById("longitude").value;

    const newLat = parseFloat(latInput);
    const newLng = parseFloat(lngInput);

    if (!isNaN(newLat) &&!isNaN(newLng)) {
      lat = newLat;
      lng = newLng;
      updateMap(lat, lng);
    } else {
      console.error("Invalid input: Latitude and Longitude must be numbers.");
    }
  });
});

initMap();