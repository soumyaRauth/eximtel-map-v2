import type { NextPage } from "next";
import { Marker } from "react-map-gl";

import Head from "next/head";
import useSWR from "swr";


import fetcher from "../../utilities/fetcher";
import { addWorldMapLayer } from "../../map_config/addWorldMapLayer";

import * as CITIES from "../api/cities.json";
import * as SINGLEREGION from "../api/single_region.json";
import { initializeMap } from "../../map_config/initializeMap";
import styles from "../../styles/Home.module.css";
import { useState, useRef, useEffect, useMemo, useCallback, Props } from "react";


  
const mapboxgl = require("mapbox-gl/dist/mapbox-gl.js");

mapboxgl.accessToken =
  "pk.eyJ1Ijoic2hvdW1tb3JhdXRoIiwiYSI6ImNrdTE0OTA5YTB6ZGQybnBjN3U4dTA3eHkifQ.YBf9n4C77kkV_vePiPHamQ";

const WorldMapView: NextPage = ({mapObj}:any) => {
  const [pageIsMounted, setPageIsMounted] = useState(false);
  const [Map, setWorldMap] = useState();
  const [RegionMap, setRegionMap] = useState();
  const [regioncentre, setRegionCentre] = useState(null);
  const { data, error } = useSWR("/api/world_regions", fetcher);
  const [pinInfo, setPinInfo] = useState(null);

  useEffect(() => {
    setPageIsMounted(true);

    let map = new mapboxgl.Map(mapObj);

    map.setRenderWorldCopies(false);
    initializeMap(mapboxgl, map);
    setWorldMap(map);
  }, []);

  
 

  useEffect(() => {
    let getSingleRegion = Object.values(SINGLEREGION);
    console.log("GET SINGLE REGION");
    console.log(getSingleRegion);
    let region_centres = Object.values(CITIES);
 
    if (pageIsMounted && data) {
      Map.on("load", function () {
        addWorldMapLayer(Map, data,getSingleRegion, region_centres[2]);
      });
    }
  }, [pageIsMounted, setWorldMap, data, Map]);

  

  return (
    <div className={styles.container}>
      <Head>
        <title>Eximtel Map</title>
        <link rel="icon" href="/favicon.ico" />
        <link
          href="https://api.mapbox.com/mapbox-gl-js/v2.6.0/mapbox-gl.css"
          rel="stylesheet"
        />
      </Head>

      <main className={styles.main}>
        <div id="world-map" style={{ height: 550, width: 700 }} />
        {/* <Pins data={cities} onClick={setPinInfo} />*/}
      </main>
    </div>
  );
};

export default WorldMapView;