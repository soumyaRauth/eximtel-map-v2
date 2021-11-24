export function initializeMap(mapboxgl:any, map:any) {
  
  map.setRenderWorldCopies(false) //sets the duplicate map display to false

    //Adding markers

  // const geojson = {
  //   type: 'FeatureCollection',
  //   features: [
  //     {
  //       type: 'Feature',
  //       geometry: {
  //         type: 'Point',
  //         coordinates: [24.720798906855872, 77.94167410279117]
  //       },
  //       properties: {
  //         title: 'Mapbox',
  //         description: 'Washington, D.C.'
  //       }
  //     },
  //     {
  //       type: 'Feature',
  //       geometry: {
  //         type: 'Point',
  //         coordinates: [-122.414, 37.776]
  //       },
  //       properties: {
  //         title: 'Mapbox',
  //         description: 'San Francisco, California'
  //       }
  //     }
  //   ]
  // };

  
//   // add markers to map
// for (const feature of geojson.features) {

  
//   // create a HTML element for each feature
//   const el = document.createElement('div');
//   el.className = 'marker';

// console.log("THIS IS ELLLL");
// console.log(el);

  

//   // make a marker for each feature and add to the map
//   new mapboxgl.Marker(el).setLngLat(feature.geometry.coordinates).addTo(map);
// }




  
    // map.on("click", "unclustered-point", function (e:any) {
      
    //   var coordinates = e.features[0].geometry.coordinates.slice();
    //   var mag = e.features[0].properties.name;

    //   console.log("Namesss");
    //   console.log(mag);
      
      
    // });

    
    // map.on("click", "data", function (e:any) {
    //   console.log("hello");
      
      
    //   var coordinates = e.features[0].geometry.coordinates.slice();
    //   var mag = e.features[0].properties.name;

    //   console.log("Namesss");
    //   console.log(e.lngLat);
      
      
    // });

    
    map.addControl(
      new mapboxgl.GeolocateControl({
        positionOptions: {
          enableHighAccuracy: true,
        },
        trackUserLocation: true,
      })
    );
  
    // map.on("mouseenter", "data", function () {
    //   map.getCanvas().style.cursor = "pointer";
    // });
    // map.on("mouseleave", "data", function () {
    //   map.getCanvas().style.cursor = "";
    // });
  }
  