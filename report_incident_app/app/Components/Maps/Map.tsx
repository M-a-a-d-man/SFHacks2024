import { Loader } from "@googlemaps/js-api-loader";
import {test, draw_circle, snap_road} 
    from '../../../public/middleware/locationcalc';
import {useEffect, useState} from "react";
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import SearchIcon from '@mui/icons-material/Search';
import { fetchData } from '../../../public/api/api'; // Correct the import path as needed

const loader = new Loader({
    apiKey: "AIzaSyAKcdk8y3vAzqhYFJhJy5E4V51rPBl4Zf4",
    version: "weekly",
    libraries: ["places", "geometry"],
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
    const [searchQuery, setSearchQuery] = useState('');

    useEffect(() => {
        // This function is defined to use async/await inside useEffect
        const fetchAndDrawHazards = async () => {
            await initMap(); // Make sure the map is initialized

            const hazards = await fetchData(); // Fetch hazards from the backend
            if (hazards && window.myMapGlobal) {
                hazards.forEach(hazard => {
                    draw_circle(hazard.coordinates, hazard.radius, window.myMapGlobal); // Draw circles for each hazard
                });
            }
        };

        fetchAndDrawHazards(); // Call the function
    }, []);

    const handleSearch = () => {
        if (!window.myMapGlobal) {
            console.error('Map not initialized');
            return;
        }

        const service = new google.maps.places.PlacesService(window.myMapGlobal);
        const request = {
            query: searchQuery,
            fields: ['name', 'geometry'],
        };

        service.textSearch(request, (results, status) => {
            if (status === google.maps.places.PlacesServiceStatus.OK && results) {
                // Clear existing markers or results if necessary

                results.forEach((place) => {
                    // For each result, you can create a marker
                    new google.maps.Marker({
                        position: place.geometry.location,
                        map: window.myMapGlobal,
                        title: place.name,
                    });

                    // Optionally, adjust the map's viewport to the search result
                    window.myMapGlobal.setCenter(place.geometry.location);
                });
            } else {
                console.error('Places search failed due to: ' + status);
            }
        });
    };

    return (
        <>
            <div className="fixed top-0 left-1/2 transform -translate-x-1/2 z-10 mt-4 p-2 bg-white shadow-lg flex items-center">
                <TextField
                    size="small"
                    variant="outlined"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search places"
                    className="flex-grow"
                />
                <Button variant="contained" color="primary" onClick={handleSearch} className="ml-2">
                    <SearchIcon />
                </Button>
            </div>
            <div id="map" className="h-screen w-screen"/>
        </>
    );
};
