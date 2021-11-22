export function initializeMap(mapboxgl:any, map:any) {
  
  map.setRenderWorldCopies(false) //sets the duplicate map display to false

    // map.on("mousemove", "data", function (e:any) {
    //   console.log("POINTS"); 
    //   console.log(e.features);
       
    //   var features = map.queryRenderedFeatures(e.point, {
    //     layers: ["data"],
    //   });
    //   var clusterId = features[0].properties.volume;
    //   map
    //     .getSource("data") 
    //     .getClusterExpansionZoom(clusterId, function (err:any, zoom:any) {
    //       console.log("Co ordinated");
    //       console.log(features[0].properties.region);
          
    //       if (err) return;
    //       map.easeTo({
    //         center: features[0].geometry.coordinates,
    //         zoom: zoom,
    //       });
    //     });
    // });
  
    map.on("click", "unclustered-point", function (e:any) {
      
      var coordinates = e.features[0].geometry.coordinates.slice();
      var mag = e.features[0].properties.name;

      console.log("Namesss");
      console.log(mag);
      
      
    });

    
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
  