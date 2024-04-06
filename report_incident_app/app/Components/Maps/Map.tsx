import { Loader } from "@googlemaps/js-api-loader"
import {useEffect} from "react";
  
  const loader = new Loader({
    apiKey: "AIzaSyAKcdk8y3vAzqhYFJhJy5E4V51rPBl4Zf4",
    version: "weekly",
  });
  
  export const MapComponent = () => {
    useEffect(() => {
      const initMap = async () => {
        try {
          const { Map } = await loader.importLibrary('maps');
          const mapOptions = {
            center: { lat: 0, lng: 0 }, // Default to center of the map
            zoom: 8, // Default zoom level
          };
  
          // Try to get user's current location
          if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(position => {
              mapOptions.center = {
                lat: position.coords.latitude,
                lng: position.coords.longitude
              };
              new Map(document.getElementById("map"), mapOptions);
            }, error => {
              console.error('Error getting user location:', error);
              new Map(document.getElementById("map"), mapOptions);
            });
          } else {
            console.error('Geolocation is not supported by this browser.');
            new Map(document.getElementById("map"), mapOptions);
          }
        } catch (error) {
          console.log("Map not loaded.", error);
        }
      };
      initMap();
    }, []); // empty dependency array ensures the effect runs only once
  
    return <div id="map" className="h-screen w-screen flex items-center justify-center" />;
  };