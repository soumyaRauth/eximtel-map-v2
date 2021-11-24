import type { NextPage } from "next";
import WorldMap from "./worldmap";
import React, { useState, useEffect } from "react";

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

const mapObject:MapObject = {
    container: "world-map",
    style: "mapbox://styles/shoummorauth/ckw8z8avm3fcs14paluhc6a4v",
    center: [20.5937, 78.9629],
    zoom: 0.5,
    dragPan: false,
    dragRotate: false,
    scrollZoom: true,
    touchZoom: false,
    touchRotate: false,
    keyboard: false,
    doubleClickZoom: false,
  };

mapboxgl.accessToken =
  "pk.eyJ1Ijoic2hvdW1tb3JhdXRoIiwiYSI6ImNrdTE0OTA5YTB6ZGQybnBjN3U4dTA3eHkifQ.YBf9n4C77kkV_vePiPHamQ";

const BaseComponent: NextPage<MapObject>  = () => {



  return (
    <>
      <WorldMap mapObj={mapObject}></WorldMap> 
    </>
  );
};

export default BaseComponent;
