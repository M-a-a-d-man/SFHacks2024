'use client'
import React, { useState, useEffect } from 'react';
import { MapComponent } from "./Components/Maps/Map";
import Button from "./Components/Button/Button";


/*

const hazardSchema = new mongoose.Schema({
    coordinates: {   
        lat:number, 
        lng:number
    },
    lastReportedTime: Date
});
*/

export default function Home() {
  return (
    <main>
      <MapComponent/>
      <Button> Send Data </Button>
    </main>
  );
}
