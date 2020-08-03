function createMap(earthquakes) {

    // Create the tile layer that will be the background of our map
    var lightmap = L.tileLayer("https://api.mapbox.com/styles/v1/mapbox/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
      attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
      maxZoom: 18,
      id: "light-v10",
      accessToken: API_KEY
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
      center: [34, 0],
      zoom: 3,
      layers: [lightmap, earthquakes]
    });
  
    // Create a layer control, pass in the baseMaps and overlayMaps. Add the layer control to the map
    L.control.layers(baseMaps, overlayMaps, {
        position: "topright",
        collapsed: false
    }).addTo(map);
  }
  
  function createCircles(response) {
  
    // Pull the "coordinates" property off of response.data
    var coordinates = []
    var circles = []
    for (x in response.features) {
        latitude = response.features[x].geometry.coordinates[1]
        longitude = response.features[x].geometry.coordinates[0]
        mag = response.features[x].properties.mag
        if (mag > 5) {
            color = "#fa0505",
            radius = 50000
        }
        else if (mag > 4) {
            color = "#fa7f05",
            radius = 40000
        }
        else if (mag > 3) {
            color = "#faa805",
            radius = 30000
        }
        else if (mag > 2) {
            color = "#fac505",
            radius = 20000
        }
        else if (mag > 2) {
            color = "#fae605",
            radius = 10000
        }
        else {color = "#d5fa05",
        radius = 5000}
        var circle = L.circle([latitude, longitude], radius, {color: color, fillColor: color, opacity: 2}).bindPopup("<h3>Location: " + response.features[x].properties.place + "<h3><h3>Magnitude: " + mag + "</h3>")
        circles.push(circle)
    }
    // console.log(location)
    // console.log()
  
  
    // Create a layer group made from the markers array, pass it into the createMap function
    createMap(L.layerGroup(circles));
  }
  
  
  // Perform an API call to the API to get station information. Call createMarkers when complete
  d3.json("https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson", createCircles);