import * as React from "react";
import { Marker } from "react-map-gl";


const ICON = `M8.36,6.481C8.203,4.852,7.838,2.485,7.189,0.88C6.423,1.242,5.75,1.748,5.16,2.361C6.753,3.708,7.822,5.457,8.36,6.481z`;
const UNIT = "px";

// const SIZE = 40;

// Important for perf: the markers never change, avoid rerender when the map viewport changes
export function Pins(props:any) {
  const { data, onClick } = props;


  

  return data.map((city:any, index:any) => (
    <Marker
    key={`marker-${index}`}
    longitude={city.longitude}
    latitude={city.latitude}
     
    >
      {/* <div class="circle" onClick={() => onClick(city)}>{city.region}</div> */}
      <small >{city.region}</small>
    
      <svg
        height={city.size}
        viewBox="0 0 24 24"
        style={{
          cursor: "pointer",
          fill: city.color,
          stroke: "none",
          fillOpacity:0.3
          // transform: `translate(0px,0px)`,
          // transform: `translate(${SIZE/2 + UNIT}, ${SIZE/2 + UNIT}`
        }}
        onClick={() => onClick(city)}
      >
        <path d={city.icon.join("")} />

      
      </svg>
    </Marker>
  ));
}

export default React.memo(Pins);
