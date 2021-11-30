export function addWorldMapLayer(
  map: any,
  data: any,
  single_region: any,
  cluster_data: any,
  country_cities: any
) {
  var hoveredStateId: any = null;
  var clicked: boolean = false;
  var mapboxgl = require("mapbox-gl/dist/mapbox-gl.js");
  var backButton = document.getElementById("fly");
  backButton.style.visibility = "hidden";

  console.log("SINGLE REGION DATA FROM LAYER");
  console.log(data);

  var single_region = single_region.reduce(function (r: any, e: any) {
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

  if (!map.getSource("country_cities")) {
    map.addSource("country_cities", {
      type: "geojson",
      data: country_cities,
      cluster: true,
      clusterMaxZoom: 1,
      clusterRadius: 2,
    });
  } else {
    map.getSource("country_cities").setData(country_cities);
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
      "fill-opacity": 0.5
    },
  };

   //Single Region information data layer
   const singleRegionMapLayerBorder = {
    id: "single_region_line",
    type: "line",
    source: "single_region",
    layout: {},
    paint: {
      "line-color": [
        "case",
        ["boolean", ["feature-state", "hover"], false],
        "#dedede", //on hover color
        "#dedede", //default color
      ],
        // 'line-color': '#E2E8F0',
        'line-width': 1,
      
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
      // "circle-radius": ["step", ["get", "volume"], 20, 100, 15, 750, 40],
      "circle-radius": {
        property: "volume",
        stops: [
          // zoom is 0 and "rating" is 0 -> circle radius will be 0px
          [{ zoom: 0, value: 0 }, 0],

          // zoom is 0 and "rating" is 5 -> circle radius will be 5px
          [{ zoom: 0, value: 5 }, 10],

          // zoom is 20 and "rating" is 0 -> circle radius will be 0px
          [{ zoom: 0, value: 100 }, 15],

          // zoom is 20 and "rating" is 5 -> circle radius will be 20px
          [{ zoom: 0, value: 200 }, 20],
        ],
      },
      "circle-opacity": 0.8,
    },
  };

  //cluster information data layer
  const clusterLayerForCountry = {
    id: "country_cluster",
    type: "circle",
    source: "country_cities",
    filter: ["has", "volume"],
    paint: {
      "circle-color": [
        "step",
        ["get", "volume"],
        "#7bb4e3",
        200,
        "#7bb4e3",
        500,
        "#7bb4e3",
      ],
      "circle-radius": {
        property: "volume",
        stops: [
          // zoom is 0 and "rating" is 0 -> circle radius will be 0px
          [{ zoom: 0, value: 0 }, 0],

          // zoom is 0 and "rating" is 5 -> circle radius will be 5px
          [{ zoom: 0, value: 5 }, 10],

          // zoom is 20 and "rating" is 0 -> circle radius will be 0px
          [{ zoom: 0, value: 100 }, 15],

          // zoom is 20 and "rating" is 5 -> circle radius will be 20px
          [{ zoom: 0, value: 200 }, 20],
        ],
      },
      "circle-opacity": 0.3,
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

  const countryClusterLabel = {
    id: "country-cluster-count",
    type: "symbol",
    source: "country_cities",
    filter: ["has", "country"],
    layout: {
      "text-field": `{country}`,
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

  //data onclick
  map.on("click", "single_region", function (e: any) {
    console.log("COUNTRY POINTS");
    console.log(e);
  });

  /**
   * *On hover on the country clusters
   */
  map.on("mousemove", "country_cluster", function (e: any) {
    hoveredStateId = e.features[0].id;
    console.log("hoveredStateId");
    console.log(hoveredStateId);
    

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
    map.setFeatureState(
      { source: "single_region", id: hoveredStateId },
      { hover: false }
    );
    popup.remove();
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
   * *Mouse on hover change pointer
   */
  map.on("mouseenter", "country_cluster", (e: any) => {
    const coordinates = e.features[0].geometry.coordinates.slice();
    popup
      .setLngLat(coordinates)
      .setHTML(
        `
          <div>Country: ${e.features[0].properties.country}</div>
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
    map.setFeatureState(
      { source: "single_region", id: hoveredStateId },
      { hover: false }
    );
    popup.remove();
  });

  /**
   * On hover mouse leave on region map
   */

  map.on("mouseleave", "single_region", () => {
    if (hoveredStateId !== null) {
      map.setFeatureState(
        { source: "single_region", id: hoveredStateId },
        { hover: false }
      );
    } else {
      console.log("hover stated id is");
      console.log(hoveredStateId);
    }
    hoveredStateId = null;
  });

  /**
   * On hover mouse leave on world map
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

  document.getElementById("fly").addEventListener("click", () => {
    map.flyTo({
      zoom:0,
      center: [
        -45.5 ,
        44,
      ],
      essential: true, // this animation is considered essential with respect to prefers-reduced-motion
    });

    map.removeLayer("single_region");
    map.removeLayer("country_cluster");
    map.removeLayer("single_region_line");

    // map.removeLayer("cluster-count");
    // // map.removeLayer("clusters");

    map.addLayer({ ...worldMapLayer });
    map.addLayer({ ...clusterLayerForWorld });
    map.addLayer({ ...clusterLabel });

    backButton.style.visibility = "hidden";
  });

  // var zoomOut=document.getElementsByClassName("mapboxgl-ctrl-zoom-out");
  // console.log(zoomOut);

  /**
   * *Click on the bubble zoom effect
   */
  map.on("click", "clusters", (e: any) => {
    console.log("e.features[0].geometry.coordinates");
    console.log(e.features[0].geometry.coordinates);

    backButton.style.visibility = "visible";

    clicked = !clicked;

    map.flyTo({
      center: e.features[0].geometry.coordinates,
      zoom: 3.4,
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

    map.removeLayer("data");
    map.removeLayer("clusters");
    map.removeLayer("cluster-count");
    // // map.removeLayer("clusters");

    map.addLayer({ ...singleRegionMapLayer });
    map.addLayer({ ...singleRegionMapLayerBorder });
    map.addLayer({ ...clusterLayerForCountry });

    // map.addLayer({ ...countryClusterLabel });
  });

  /**
   * *Click on the bubble zoom effect
   */
  // map.on("click", "country_cluster", (e: any) => {

  // });
}
