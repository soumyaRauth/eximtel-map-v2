export function addDataLayer(map: any, data: any) {
  var hoveredStateId: any = null;

  if (!map.getSource("data")) {
    map.addSource("data", {
      type: "geojson",
      data: data,
      // cluster: true,
      // clusterMaxZoom: 14,
      // clusterRadius: 50,
      // clusterProperties: {
      //   sum: ["+", ["get", "volume"]],
      // },
    });
  } else {
    map.getSource("data").setData(data);
  }

  const dataLayer = {
    id: "data",
    type: "fill",
    source: "data",
    // layout: {},
    // paint: {
    //   "fill-color": {
    //     property: "name",
    //     type: "categorical",
    //     stops: [
    //       ["Bangladesh", "#f1f5f9"],
    //       ["Bhutan", "#f1f5f9"],
    //       ["India", "#f1f5f9"],
    //       ["Pakistan", "#f1f5f9"],
    //       ["Nepal", "#f1f5f9"],
    //       ["Afghanistan", "#f1f5f9"],
    //       ["Sri Lanka", "#f1f5f9"],
    //       ["Saudi Arabia", "#f1f5f9"],
    //       ["Yemen", "#f1f5f9"],
    //       ["Oman", "#f1f5f9"],
    //       ["UAE", "#f1f5f9"],
    //       ["Qatar", "#f1f5f9"],
    //       ["Kuwait", "#f1f5f9"],
    //     ],
    //   },
    //   "fill-opacity": 1,
    // },

    layout: {},
    paint: {
      "fill-color": "#627BC1",
      "fill-opacity": [
        "case",
        ["boolean", ["feature-state", "hover"], false],
        1,
        0.5,
      ],
    },
  };

  

  map.addLayer({ ...dataLayer });

  map.on("mousemove", "data", (e: any) => {
    console.log("Mouse moved");
    console.log(e.features[0].id);
    hoveredStateId = e.features[0].id;

    if (data.features.length > 0) {
      if (data !== null) {
        console.log("Into data exist");
        console.log(hoveredStateId);
        
        map.setFeatureState(
          { source: "data", id: hoveredStateId },
          { hover: true }
        );

        console.log("Featured State is");
        console.log(map);
        
        
      }
      
    }
  });

  // console.log(hoveredStateId);
  // console.log(hoveredStateId);
  
  map.on('mouseleave', 'data', () => {
    console.log("ON LEAVEEE");
    
    if (hoveredStateId !== null) {
    map.setFeatureState(
    { source: 'data', id: hoveredStateId },
    { hover: false }
    );
    }
    hoveredStateId = null;
    });
}
