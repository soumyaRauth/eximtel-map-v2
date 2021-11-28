export function addWorldMapLayer(map: any, data: any, singleRegion:any, cluster_data: any) {
  var hoveredStateId: any = null;
  var clicked: boolean = false;
  var mapboxgl = require("mapbox-gl/dist/mapbox-gl.js");
  

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

  //region information data layer
  const dataLayer = {
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

  //region information data layer
  // const regionLayer = {
  //   id: "region_data",
  //   type: "fill",
  //   source: "regionData",
  //   layout: {},
  //   paint: {
  //     "fill-color": [
  //       "case",
  //       ["boolean", ["feature-state", "hover"], false],
  //       "#85C1E9", //on hover color
  //       "#e4ecf3", //default color
  //     ],
  //     "fill-opacity": 0.5,
  //   },
  // };

  //cluster information data layer
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

  map.addLayer({ ...dataLayer });
  map.addLayer({ ...clusterLayer });
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

    console.log("This is data layer");
    console.log(dataLayer);

    // map.removeLayer({dataLayer});


  });
}
