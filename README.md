# leaflet-challenge
Earthquake Data Visualization
This project is a simple web application that visualizes earthquake data on a map. The data is fetched from the USGS Earthquake Hazards Program API.

Features
Fetches real-time earthquake data from the USGS API.
Visualizes the data on a map using Leaflet.js.
Uses circle markers to represent earthquakes, with the size of the marker indicating the magnitude and the color indicating the depth.
Includes a legend for easy interpretation of the marker colors.
Code Overview
The code is written in JavaScript and uses the Leaflet.js library for creating the map and markers. The main steps in the code are:

Initialize a map centered on the geographic center of Earth.
Add an OpenStreetMap tile layer to the map.
Fetch the earthquake data from the USGS API.
For each earthquake in the data, create a circle marker at the earthquake’s coordinates. The size and color of the marker are determined by the earthquake’s magnitude and depth, respectively.
Bind a popup to each marker displaying details about the earthquake.
Add a legend to the map explaining the marker colors.
Customization
The colors used for the markers and the legend, as well as the depth ranges associated with each color, can be easily customized in the getDepthColor function. The size of the markers can be adjusted in the getMarkerSize function.
