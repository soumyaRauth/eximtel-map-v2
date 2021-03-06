import type { NextPage } from "next";
import WorldMapView from "./worldmapview";


//interfaces
interface MapObject {
  container?: string;
  style?: string;
  center?: Array<number>;
  zoom?: number;
  maxZoom?: number;
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
    center: [25.085598897064756, 44.6923828125],
    zoom: 0.7,
    dragPan: false,
    dragRotate: false,
    scrollZoom: false,
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
  
      <WorldMapView mapObj={mapObject}></WorldMapView> 
   
    </>
  );
};

export default BaseComponent;
