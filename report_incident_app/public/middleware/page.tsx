'use client'
import Image from "next/image";
import {MapComponent} from "./Components/Maps/Map";
import {addLatLng} from "./locationcalc"



export default function Home() {
  return (

    <main>
      
      <MapComponent/>

    </main>
   
  );
}
