import { Loader } from "@googlemaps/js-api-loader";
import {test, draw_circle, snap_road} 
    from '../../../public/middleware/locationcalc';
import {useEffect} from "react";

const loader = new Loader({
    apiKey: "AIzaSyAKcdk8y3vAzqhYFJhJy5E4V51rPBl4Zf4",
    version: "weekly",
});

interface mapOptions{
    center: { lat: number, lng: number },
    zoom: number,
}
window.myMapGlobal = null;

export function getCurrentLocation(mapOptions:mapOptions){
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(position => {
            return{
                lat: position.coords.latitude,
                lng: position.coords.longitude
            };    
        }, error => {
            console.error('Error getting user location:', error);
            return mapOptions.center;
        });
    } else {
        console.error('Geolocation is not supported by this browser.');
        return mapOptions.center;
    }
}

export const initMap = async () => {
    try {
        const { Map, Circle } = await loader.importLibrary('maps'); // Import Circle class

                const mapOptions = {
                    center: { lat: 0, lng: 0 },
                    zoom: 18,
                };

        // Try to get user's current location
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(position => {
                mapOptions.center = {
                    lat: position.coords.latitude,
                    lng: position.coords.longitude
                };
                const map = new Map(document.getElementById("map"), mapOptions);
                window.myMapGlobal = map; 
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

export const MapComponent = () => {
    useEffect(() => {
        initMap();
    }, []); // empty dependency array ensures the effect runs only once
    return <div id="map" className="h-screen w-screen flex items-center justify-center"/>;
};
