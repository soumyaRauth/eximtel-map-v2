import type { NextPage } from "next";
import BaseComponent from "./maps/basecomponent";

const mapboxgl = require("mapbox-gl/dist/mapbox-gl.js");

mapboxgl.accessToken =
  "pk.eyJ1Ijoic2hvdW1tb3JhdXRoIiwiYSI6ImNrdTE0OTA5YTB6ZGQybnBjN3U4dTA3eHkifQ.YBf9n4C77kkV_vePiPHamQ";

const Home: NextPage = () => {
  return (
    <>
      
      <BaseComponent></BaseComponent>
    </>
  );
};

export default Home;
