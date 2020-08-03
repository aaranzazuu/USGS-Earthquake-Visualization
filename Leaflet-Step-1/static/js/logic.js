function createMap(earthquakes) {

    // Create the tile layer that will be the background of our map
    var lightmap = L.tileLayer("https://api.mapbox.com/styles/v1/mapbox/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
      attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
      maxZoom: 18,
      id: "light-v10",
      accessToken: "pk.eyJ1IjoiYWFyYW56YXp1dSIsImEiOiJja2N4czF3cTQwMzBoMnJuaHB4Ympoa3pqIn0.eljAoRIWk2NBRNN26ymnNg"
    });
  
    // Create a baseMaps object to hold the lightmap layer
    var baseMaps = {
      "Light Map": lightmap
    };
  
    // Create an overlayMaps object to hold the earthquakes layer
    var overlayMaps = {
      "earthquakes": earthquakes
    };
  
    // Create the map object with options
    var map = L.map("map", {
      center: [34, -118],
      zoom: 5,
      layers: [lightmap, earthquakes]
    });
  
    // Create a layer control, pass in the baseMaps and overlayMaps. Add the layer control to the map
    L.control.layers(baseMaps, overlayMaps, {
      collapsed: false
    }).addTo(map);
  }
  
  function createMarkers(response) {
  
    // Pull the "coordinates" property off of response.data
    var coordinates = []
    var markers = []
    for (x in response.features) {
        latitude = response.features[x].geometry.coordinates[1]
        longitude = response.features[x].geometry.coordinates[0]
        var marker = L.marker([latitude, longitude])
        coordinates.push([latitude, longitude])
        markers.push(marker)
    }
    console.log(coordinates)
  
    // var markers = L.marker(coordinates) 
    // console.log(markers)
    for (coordinate in coordinates) {
    //   // For each station, create a marker and bind a popup with the station's name
      var marker = L.marker(coordinate)
    //   console.log(marker)
    //   // Add the marker to the markers array
    //   ;
    }
  
    // Create a layer group made from the markers array, pass it into the createMap function
    createMap(L.layerGroup(markers));
  }
  
  
  // Perform an API call to the API to get station information. Call createMarkers when complete
  d3.json("https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/significant_week.geojson", createMarkers);