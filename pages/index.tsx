import type { NextPage } from "next";
import { Marker } from "react-map-gl";

import Head from "next/head";
import useSWR from "swr";

import fetcher from "../utilities/fetcher";
import { addDataLayer } from "../map/addLayer";

import * as CITIES from "./api/cities.json";
import { initializeMap } from "../map/initializeMap";
import styles from "../styles/Home.module.css";
import { useState, useRef, useEffect, useMemo, useCallback } from "react";
import Pins from "../map/pins";

const mapboxgl = require("mapbox-gl/dist/mapbox-gl.js");

mapboxgl.accessToken =
  "pk.eyJ1Ijoic2hvdW1tb3JhdXRoIiwiYSI6ImNrdTE0OTA5YTB6ZGQybnBjN3U4dTA3eHkifQ.YBf9n4C77kkV_vePiPHamQ";

const Home: NextPage = () => {
  const [pageIsMounted, setPageIsMounted] = useState(false);
  const [Map, setMap] = useState();
  const [regioncentre, setRegionCentre] = useState(null);
  const { data, error } = useSWR("/api/asia", fetcher);
  const [pinInfo, setPinInfo] = useState(null);

  useEffect(() => {
    setPageIsMounted(true);

    let map = new mapboxgl.Map({
      container: "world-map",
      style: "mapbox://styles/shoummorauth/ckw8z8avm3fcs14paluhc6a4v",
      center: [20.5937, 78.9629],
      zoom:0.5,
      dragPan: false,
      dragRotate: false,
      scrollZoom: false,
      touchZoom: false,
      touchRotate: false,
      keyboard: false,
      doubleClickZoom: true,
      // maxBounds: [
      //   [-77.875588, 38.50705], // Southwest coordinates
      //   [-76.15381, 39.548764], // Northeast coordinates
      // ],
    });

    map.setRenderWorldCopies(false);
    initializeMap(mapboxgl, map);
    setMap(map);
  }, []);

  useEffect(() => {
    // /* global fetch */
    // fetch(
    //   // './bd_banani_polygon.json'
    //   "./api/cities.json"
    //   // './data.json',
    // )
    //   .then((resp) => resp.json())
    //   .then((json) => {
    //     console.log("JSON DATAAAAAA");
    //     console.log(json);
    //     setRegionCentre(json)
    //   });
  }, []);

  // //On click pins get the city information
  // //Get the city info on click
  // useEffect(() => {
  //   console.log("This is pin info");
  //   if (pinInfo) {
  //     alert(`REGION: ${pinInfo.region}`);
  //   } else {
  //     console.log("No data");
  //   }
  //   // console.log(isMounted.current? pinInfo:"");
  //   console.log("This is pin data");
  // }, [pinInfo]);

  useEffect(() => {
    console.log("CITY DATA");
    let region_centres = Object.values(CITIES);
    console.log(region_centres[1]);
    console.log("CONST CONST");
    console.log(region_centres[1]);

    if (pageIsMounted && data) {
      Map.on("load", function () {
        addDataLayer(Map, data, region_centres[2]);
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

export default Home;
