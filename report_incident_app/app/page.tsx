'use client'
import React, { useState } from 'react';
import { MapComponent } from "./Components/Maps/Map";
import Button from "./Components/Button/Button";

export default function Home() {
  const [data, setData] = useState({});

  const sendDataToServer = async () => {
    const dummyData = { 
      report_time: "2024-04-01T00:00:00.000+00:00",
      hazard_id: "9999999",
      last_report_user: "user3",
      coordinates: [40.7128, -74.0060] // Latitude, Longitude
    };

    try {
      const response = await fetch('/api/mongo', { // Ensure this endpoint matches your API route
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(dummyData), // Sending dummyData
      });

      if(response.ok) {
        const responseData = await response.json();
        console.log("Data Added", responseData);
        setData(responseData); // Update state with the response
      } else {
        console.error("Error", response.statusText);
      }
    } catch (error) {
      console.error('Failed to send data to server:', error);
    }
  };

  return (
    <main>
      <MapComponent />
      <Button onClick={sendDataToServer}>Send Data</Button>
    </main>
  );
}
