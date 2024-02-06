// URL of the data
const dataUrl = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson";

// Initialize the map centered on the geographic center of Earth
let myMap = L.map('map').setView([0, 0], 3);

// Add OpenStreetMap tile layer to the map
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  maxZoom: 19,
}).addTo(myMap);

// Fetch the data
fetch(dataUrl)
  .then(res => res.json())
  .then(data => {
    // Function to determine marker size based on magnitude
    const getMarkerSize = (magnitude) => {
      return magnitude * 10000;
    };

    // Function to determine marker color based on depth
    const getDepthColor = (depth) => {
        return depth > 70 ? '#FF5733' : 
               depth > 50  ? '#C70039' : 
               depth > 30  ? '#900C3F' : 
                             '#581845';  
    };

    // Loop through the data
    data.features.forEach(feature => {
      // Coordinates for the marker
      const coordinates = feature.geometry.coordinates;

      // Create a circle marker
      let circleMarker = L.circle([coordinates[1], coordinates[0]], {
        color: 'black',  // black outline
        weight: 1,  // outline weight
        fillColor: getDepthColor(coordinates[2]),
        fillOpacity: 0.8,
        radius: getMarkerSize(feature.properties.mag)
      }).addTo(myMap);

      // Bind a popup to the marker
      circleMarker.bindPopup(`<h2>${feature.properties.place}</h2><hr><p>${new Date(feature.properties.time)}</p><p>Magnitude: ${feature.properties.mag}</p><p>Depth: ${coordinates[2]}</p>`);
    });

    // Add a legend
    let legend = L.control({position: 'bottomright'});
    legend.onAdd = function (map) {
      let div = L.DomUtil.create('div', 'info legend'),
          grades = [0, 30, 50, 70],
          labels = ['0-30', '30-50', '50-70', '70+'];

      // Add a black border to the legend
        div.style.border = '2px solid black';
        div.style.backgroundColor = 'rgba(0, 0, 0, 0.8)';
        for (let i = 0; i < grades.length; i++) {
        div.innerHTML += '<i style="background:' + getDepthColor(grades[i] + 1) + '; width: 18px; height: 18px; float: left; margin-right: 8px; opacity: 0.7"></i> ' +
                         labels[i] + '<br>';
      }
      return div;
    };
    legend.addTo(myMap);
  })
  .catch(err => console.error('Error:', err));
