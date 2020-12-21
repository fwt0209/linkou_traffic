function initMap() {
  var map = new google.maps.Map(document.getElementById("map"), {
    zoom: 13,
    center: { lat: 25.068371, lng: 121.371302 },
  });

  var trafficLayer = new google.maps.TrafficLayer();
  trafficLayer.setMap(map);
}

export { initMap };
