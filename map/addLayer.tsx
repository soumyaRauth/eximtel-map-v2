export function addDataLayer(map: any, data: any, cluster_data: any) {
  var hoveredStateId: any = null;

  if (!map.getSource("data")) {
    map.addSource("data", {
      type: "geojson",
      data: data
    });
  } else {
    map.getSource("data").setData(data);
  }

  if (!map.getSource("cluster_data")) {
    console.log("CLUSTER DATA FROM ADD LAYER");
    console.log(cluster_data);

    map.addSource("cluster_data", {
      type: "geojson",
      data: cluster_data,
      cluster: true,
      clusterMaxZoom: 1,
      clusterRadius: 2,
    });
  } else {
    map.getSource("cluster_data").setData(data);
  }

  const dataLayer = {
    id: "data",
    type: "fill",
    source: "data",
    // layout: {},
    // paint: {
    //   "fill-color": {
    //     property: "region",
    //     type: "categorical",
    //     stops: [
    //       ["South Asia", "#f1f5f9"],
    //       ["Middle Eash", "#f1f5f9"],
    //     ],
    //   },
    //   "fill-opacity": 1,
    // },

    layout: {},
    paint: {
      "fill-color": [
        "case",
        ["boolean", ["feature-state", "hover"], false],
        "#85C1E9", //on hover color
        "#e4ecf3", //default color
      ],
      "fill-opacity": 0.5,
    },
    // "fill-outline-color": "red",
  };

  //cluster map
  const clusterLayer = {
    id: "clusters",
    type: "circle",
    source: "cluster_data",
    filter: ["has", "volume"],
    paint: {
      "circle-color": [
        "step",
        ["get", "volume"],
        "#c1dcf6",
        200,
        "#c1dcf6",
        500,
        "#c1dcf6",
      ],
      "circle-radius": ['step', ['get', 'volume'], 20, 100, 15, 750, 40],
      "circle-opacity": 0.8,
    },
  };


  const clusterLabel = {
    id: "cluster-count",
    type: "symbol",
    source: "cluster_data",
    filter: ["has", "region"],
    layout: {
      "text-field": "{region}",
      "text-font": ["Open Sans Bold"],
      "text-size": 8,
    },
    paint: {
      "text-color": "grey",
    },
  };

  // const clusterCountLayer = {
  //   id: 'cluster-count',
  //   type: 'symbol',
  //   source: 'cluster_data',
  //   filter: ['has', 'volume'],
  //   layout: {
  //     'text-field': '{volume_abbreviated}',
  //     'text-font': ['DIN Offc Pro Medium', 'Arial Unicode MS Bold'],
  //     'text-size': 12
  //   }
  // };

  // const unclusteredPointLayer = {
  //   id: 'unclustered-point',
  //   type: 'circle',
  //   source: 'cluster_data',
  //   filter: ['has', 'volume'],
  //   paint: {
  //     'circle-color': ['step', ['get', 'volume'], '#c1dcf6', 200, '#c1dcf6', 50000, '#c1dcf6'],
  //     'circle-radius': ['step', ['get', 'volume'], 20, 100, 30, 750, 40]
  //   }
  // };



  map.addLayer({ ...dataLayer });
  map.addLayer({ ...clusterLayer });
  map.addLayer({ ...clusterLabel });
  // map.addLayer({ ...clusterCountLayer });
  // map.addLayer({ ...unclusteredPointLayer });
  //adding bubble layer



  /**
   * *Cluster on click event
   */
  // inspect a cluster on click
  map.on("mousemove", "clusters", function (e:any) {
       
    hoveredStateId = e.features[0].properties.region_id;

    if (data.features.length > 0) {
      if (data !== null) {
        map.setFeatureState(
          { source: "data", id: hoveredStateId },
          { hover: true }
        );
      }
    }
  });

 
  /**
   * On hover mouse leave
   */

  map.on("mouseleave", "data", () => {

    if (hoveredStateId !== null) {
      map.setFeatureState(
        { source: "data", id: hoveredStateId },
        { hover: false }
      );
    }
    hoveredStateId = null;
  });

  /**
   * *Click on the bubble effect
   */
  map.on("click", "clusters", (e:any) => {

   console.log("IDDDDD");
   alert(e.features[0].properties.region);
   
  });
}
