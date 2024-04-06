'use client'
import Image from "next/image";
import {MapComponent} from "./Components/Maps/Map";
import Button from "./Components/Button/Button";



export default function Home() {
  return (

    <main>
      <MapComponent/>
      <Button/>
    </main>
  );
}
