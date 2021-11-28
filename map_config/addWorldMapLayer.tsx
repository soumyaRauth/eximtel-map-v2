export function addWorldMapLayer(
  map: any,
  data: any,
  single_region: any,
  cluster_data: any
) {
  var hoveredStateId: any = null;
  var clicked: boolean = false;
  var mapboxgl = require("mapbox-gl/dist/mapbox-gl.js");

  console.log("SINGLE REGION DATA FROM LAYER");
  console.log(data);
  var single_region = single_region.reduce(function (r: any, e: any) {
    // r[e.field] = e.value;

    return e;
  }, {});

  console.log("SINGLE REGION DATA FROM DDDDD");
  console.log(single_region);

  mapboxgl.accessToken =
    "pk.eyJ1Ijoic2hvdW1tb3JhdXRoIiwiYSI6ImNrdTE0OTA5YTB6ZGQybnBjN3U4dTA3eHkifQ.YBf9n4C77kkV_vePiPHamQ";

  if (!map.getSource("data")) {
    map.addSource("data", {
      type: "geojson",
      data: data,
    });
  } else {
    map.getSource("data").setData(data);
  }



  if (!map.getSource("single_region")) {
    map.addSource("single_region", {
      type: "geojson",
      data: single_region,
    });
  } else {
    map.getSource("single_region").setData(single_region);
  }

  if (!map.getSource("cluster_data")) {
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

  //world information data layer
  const worldMapLayer = {
    id: "data",
    type: "fill",
    source: "data",
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
  };

  //Single Region information data layer
  const singleRegionMapLayer = {
    id: "single_region",
    type: "fill",
    source: "single_region",
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
  };

  //cluster information data layer
  const clusterLayerForWorld = {
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
      "circle-radius": ["step", ["get", "volume"], 20, 100, 15, 750, 40],
      "circle-opacity": 0.8,
    },
  };

  //cluster information data layer
  const clusterLayerForCountry = {
    id: "country_cluster",
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
      "circle-radius": ["step", ["get", "volume"], 20, 100, 15, 750, 40],
      "circle-opacity": 0.8,
    },
  };
  //
  const clusterLabel = {
    id: "cluster-count",
    type: "symbol",
    source: "cluster_data",
    filter: ["has", "region"],
    layout: {
      "text-field": `{region}`,
      "text-font": ["Open Sans Bold"],
      "text-size": 8,
    },
    paint: {
      "text-color": "grey",
    },
  };

  map.addLayer({ ...worldMapLayer });
  map.addLayer({ ...clusterLayerForWorld });
  map.addLayer({ ...clusterLabel });
  // map.addLayer({ ...clusterCountLayer });
  // map.addLayer({ ...unclusteredPointLayer });

  /**
   * *Cluster on click event
   */

  const popup = new mapboxgl.Popup({
    closeButton: false,
    closeOnClick: false,
  });

  map.on("mousemove", "clusters", function (e: any) {
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


 

  map.on("mousemove", "country_cluster", function (e: any) {
    
    hoveredStateId = e.features[0].id;
    console.log("Country Cluster");
    console.log(e.features[0].properties);



    if (single_region.features.length > 0) {
      if (single_region !== null) {
        map.setFeatureState(
          { source: "single_region", id: hoveredStateId },
          { hover: true }
        );
      }
    }

    map.getCanvas().style.cursor = "pointer";
  });

    /**
   * *Mouse on hover leave change pointer
   */
     map.on("mouseleave", "country_cluster", () => {
      map.getCanvas().style.cursor = "";
      // popup.remove();
    });

  /**
   * *Mouse on hover change pointer
   */
  map.on("mouseenter", "clusters", (e: any) => {
    const coordinates = e.features[0].geometry.coordinates.slice();
    popup
      .setLngLat(coordinates)
      .setHTML(
        `
          <div>Region: ${e.features[0].properties.region}</div>
          <div>Product Volume:  ${e.features[0].properties.volume}</div>
      `
      )
      .addTo(map);
    map.getCanvas().style.cursor = "pointer";
  });

  /**
   * *Mouse on hover leave change pointer
   */
  map.on("mouseleave", "clusters", () => {
    map.getCanvas().style.cursor = "";
    popup.remove();
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
   * *Click on the bubble zoom effect
   */
  map.on("click", "clusters", (e: any) => {
    clicked = !clicked;

    map.flyTo({
      center: e.features[0].geometry.coordinates,
      zoom: 3.2,
      // zoom: clicked ? 3.2 : 0,  //commented out because this code adds the zoom out effect on the clusters
      bearing: 0,
      scrollZoom: false,
      doubleClickZoom: false,
      speed: 2, // make the flying slow
      curve: 1, // change the speed at which it zooms out

      // This can be any easing function: it takes a number between
      // 0 and 1 and returns another number between 0 and 1.
      easing: (t: any) => t,

      // this animation is considered essential with respect to prefers-reduced-motion
      essential: true,
    });

    // map.removeLayer("data");
    // map.removeLayer("clusters");
    // map.removeLayer("cluster-count");
    // // map.removeLayer("clusters");

    
    // map.addLayer({ ...singleRegionMapLayer });
    // map.addLayer({ ...clusterLayerForCountry });
    // map.addLayer({ ...clusterLabel });


  });
}
