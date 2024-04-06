import { Loader } from "@googlemaps/js-api-loader"
import {useEffect} from "react";
  
  const loader = new Loader({
    apiKey: "YOUR_API_KEY",
    version: "weekly",
  });
  const MapComponent = () => {
    useEffect(() => {
      const initMap = async () => {
        try {
          const { Map } = await loader.importLibrary('maps');
          new Map(document.getElementById("map"));
        } catch (error) {
          console.log("Map not loaded.", error);
        }
      };
      initMap();
    }, []); // empty dependency array ensures the effect runs only once
  
    return <div id="map" style={{ width: '100%', height: '400px' }} />;
  };