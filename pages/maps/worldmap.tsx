import type { NextPage } from "next";
import { Marker } from "react-map-gl";

import Head from "next/head";
import useSWR from "swr";

import fetcher from "../../utilities/fetcher";
import { addRegionLayer } from "../../map/addRegionLayer";

import * as CITIES from "../api/cities.json";
import { initializeMap } from "../../map/initializeMap";
import styles from "../../styles/Home.module.css";
import { useState, useRef, useEffect, useMemo, useCallback, Props } from "react";

//interfaces
interface MapObject {
    container?: string;
    style?: string;
    center?: Array<number>;
    zoom?: number;
    dragPan?: boolean;
    dragRotate?: boolean;
    scrollZoom?: boolean;
    touchZoom?: boolean;
    touchRotate?: boolean;
    keyboard?: boolean;
    doubleClickZoom?: boolean;
  }
  
const mapboxgl = require("mapbox-gl/dist/mapbox-gl.js");

mapboxgl.accessToken =
  "pk.eyJ1Ijoic2hvdW1tb3JhdXRoIiwiYSI6ImNrdTE0OTA5YTB6ZGQybnBjN3U4dTA3eHkifQ.YBf9n4C77kkV_vePiPHamQ";

const WorldMap: NextPage = ({mapObj}:any) => {
  const [pageIsMounted, setPageIsMounted] = useState(false);
  const [Map, setMap] = useState();
  const [regioncentre, setRegionCentre] = useState(null);
  const { data, error } = useSWR("/api/asia", fetcher);
  const [pinInfo, setPinInfo] = useState(null);

  useEffect(() => {
    setPageIsMounted(true);

    let map = new mapboxgl.Map(mapObj);

    map.setRenderWorldCopies(false);
    initializeMap(mapboxgl, map);
    setMap(map);
  }, []);

  

  useEffect(() => {
    let region_centres = Object.values(CITIES);
 
    if (pageIsMounted && data) {
      Map.on("load", function () {
        addRegionLayer(Map, data, region_centres[2]);
      });
    }
  }, [pageIsMounted, setMap, data, Map]);

  return (
    <div className={styles.container}>
      <Head>
        <title>Eximtel Map</title>
        <link rel="icon" href="/favicon.ico" />
        <link
          href="https://api.mapbox.com/styles/v1/shoummorauth/ckw93ttp8dpn714pcrwdfg5bq.html?title=view&access_token=pk.eyJ1Ijoic2hvdW1tb3JhdXRoIiwiYSI6ImNrdTE0OTA5YTB6ZGQybnBjN3U4dTA3eHkifQ.YBf9n4C77kkV_vePiPHamQ&zoomwheel=true&fresh=true#0.06/0/168.3"
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

export default WorldMap;
