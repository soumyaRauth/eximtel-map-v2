import type { NextPage } from "next";

import Head from "next/head";
import fetcher from "../utilities/fetcher";
import useSWR from "swr";
import { addDataLayer } from "../map/addLayer";
import { initializeMap } from "../map/initializeMap";
import styles from "../styles/Home.module.css";
import { useState, useRef, useEffect, useMemo, useCallback } from "react";

const mapboxgl = require("mapbox-gl/dist/mapbox-gl.js");

mapboxgl.accessToken =
  "pk.eyJ1Ijoic2hvdW1tb3JhdXRoIiwiYSI6ImNrdTE0OTA5YTB6ZGQybnBjN3U4dTA3eHkifQ.YBf9n4C77kkV_vePiPHamQ";

const Home: NextPage = () => {
  const [pageIsMounted, setPageIsMounted] = useState(false);
  const [hoverInfo, setHoverInfo] = useState(null);
  const [allData, setAllData] = useState(null);
  const [Map, setMap] = useState();
  const { data, error } = useSWR("/api/asia", fetcher);
  

  useEffect(() => {
    setPageIsMounted(true);

    let map = new mapboxgl.Map({
      container: "world-map",
      style: "mapbox://styles/shoummorauth/ckw8z8avm3fcs14paluhc6a4v",
      center: [20.5937, 78.9629],
      // maxBounds: [
      //   [-77.875588, 38.50705], // Southwest coordinates
      //   [-76.15381, 39.548764], // Northeast coordinates
      // ],
    });


   

    map.setRenderWorldCopies(false)
    initializeMap(mapboxgl, map); 
    setMap(map);


  }, []);

  useEffect(() => {
    console.log("this is MAPP");
    console.log(Map);

    if (pageIsMounted && data) {
      console.log(Map);
      Map.on("load", function () {
        console.log("This is dataa");
        console.log(data);

        addDataLayer(Map, data);
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
      </main>
    </div>
  );
};

export default Home;
