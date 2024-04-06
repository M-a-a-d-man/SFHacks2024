import Image from "next/image";
import {InitMap} from "./Components/Maps/Map";



export default function Home() {
  return (

    <main>
      <div id="map" className="">
        <InitMap/>

      </div>

    </main>
   
  );
}
