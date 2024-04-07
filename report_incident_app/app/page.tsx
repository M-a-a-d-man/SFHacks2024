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

const HazardForm = () => {
    const [coordinates, setCoordinates] = useState({});
    const [lastReportedTime, setLastReportedTime] = useState(0);
}

const handleSubmit = async (e) => {
    e.preventDefault();
    try{
        const res = await fetch('/api/hazards', {
            method: 'POST',
            headers: {
                'Content-Type' : 'application/json',
            },
            body: JSON.stringify({coordinates, lastReportedTime}),

        });
        const data = await res.json();
        console.log('Hazard reported', data.data);
        setCoordinates([]);
        setLastReportedTime = 0;

    } catch (error) {
        console.error('Error creating task:', error);
    }

};

export default function Home() {
  return (
    <main>
      <MapComponent/>
      <form onSubmit={handleSubmit}>
      onChange={(e) => setCoordinates({'lat':30, 'lng':30})}
      onChange={(e) => setLastReportedTime = 5}
      </form>
      <Button onClick= {handleSubmit}>Send Data</Button>
    </main>
  );
}
