import { Loader } from "@googlemaps/js-api-loader"
const loader = new Loader({
    apiKey: "AIzaSyAKcdk8y3vAzqhYFJhJy5E4V51rPBl4Zf4",
    version: "weekly",
    libraries: ["places", "geometry"],
});

export function test(data){
    console.log(data);
}

export async function draw_circle(center: {lat: number, lng: number}, radius: number, map: HTMLElement){

    const { Circle } = await loader.importLibrary('maps'); // Import Circle class
    const userCircle = new Circle({
        strokeColor: "#00ABF0",
        strokeOpacity: 0.01,
        strokeWeight: 5,
        fillColor: "#00ABF0",
        fillOpacity: 0.01,
        map: map,
        center: center, // Center of the circle is user's current location
        radius: radius // Example radius in meters (adjust as needed)
    });

    const circleCenter = userCircle.getCenter();
    const circleRadius = userCircle.getRadius();

    const circlePath = [];
    const numPoints = 50;
    for ( let i = 0 ; i < numPoints ; i++ ){
        const angle = (i / numPoints) * Math.PI * 2;
        const dx = circleRadius * Math.cos(angle);
        const dy = circleRadius * Math.sin(angle);
        const latLng = {
            lat: circleCenter.lat() + (dy / 111111), // Approximate 1 degree of latitude as 111111 meters
            lng: circleCenter.lng() + (dx / (111111 * Math.cos(circleCenter.lat() * Math.PI / 180))) // Adjust for longitude based on latitude
        };
    circlePath.push(latLng);
    }

    snap_road(circlePath, map);
}

export async function drawDangerousRoadsOnMap(coordinates, map) {
    const { Polyline } = await loader.importLibrary('maps'); // Import Polyline class

    const dangerousRoadPath = new Polyline({
        path: coordinates,
        geodesic: true,
        strokeColor: '#FF0000',
        strokeOpacity: 1.0,
        strokeWeight: 2,
        map: map,
    });
}

export async function snap_road(coordinates, map) {
    // Convert coordinates array to a string format required by the API
    const pathString = coordinates.map(coord => `${coord.lat},${coord.lng}`).join("|");

    fetch(`https://roads.googleapis.com/v1/snapToRoads?path=${pathString}&interpolate=true&key=${loader.apiKey}`)
        .then(response => response.json())
        .then(data => {
            // Extract the snapped points' coordinates
            const roadCoordinates = data.snappedPoints.map(point => {
                return { lat: point.location.latitude, lng: point.location.longitude };
            });
            drawDangerousRoadsOnMap(roadCoordinates, map);
        })
        .catch(error => {
            console.error("Error:", error);
        });
}