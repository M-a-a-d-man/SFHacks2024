import { Loader } from "@googlemaps/js-api-loader"
const loader = new Loader({
    apiKey: "AIzaSyAKcdk8y3vAzqhYFJhJy5E4V51rPBl4Zf4",
    version: "weekly",
});

export function test(data){
    console.log(data);
}

export async function draw_circle(center: {lat: number, lng: number}, radius: number, map: HTMLElement){

    const { Circle } = await loader.importLibrary('maps'); // Import Circle class
    const userCircle = new Circle({
        strokeColor: "#00ABF0",
        strokeOpacity: 0.5,
        strokeWeight: 5,
        fillColor: "#00ABF0",
        fillOpacity: 0.5,
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

    snap_road(circlePath);
}

export async function snap_road (coordinates) {

    const snapToRoadsRequest = {
        path: coordinates.map(coord => `${coord.lat},${coord.lng}`).join("|"),
        interpolate: true, // Optional parameter to interpolate points between known points
        key: loader.apiKey
    };

    fetch(`https://roads.googleapis.com/v1/snapToRoads?path=${snapToRoadsRequest.path}&interpolate=${snapToRoadsRequest.interpolate}&key=${snapToRoadsRequest.key}`)
        .then(response => response.json())
    .then(data => {
        // Handle the response
        let placeIds = []
        let points = data.snappedPoints;
        for ( let i = 0 ; i < points.length ; i++ ){
            if ( !placeIds.includes(points[i].placeId) )
                placeIds.push(points[i].placeId);
        }
        console.log(placeIds);

    })
    .catch(error => {
        console.error("Error:", error);
    });
}

