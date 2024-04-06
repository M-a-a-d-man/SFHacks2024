import { Loader } from "@googlemaps/js-api-loader"
const loader = new Loader({
    apiKey: "AIzaSyAKcdk8y3vAzqhYFJhJy5E4V51rPBl4Zf4",
    version: "weekly",
});

export function test(){
    console.log("you are smelly");
}

export async function draw_circle(center: {lat, lng}, radius, map){
    try {

        const { Circle } = await loader.importLibrary('maps'); // Import Circle class
        const { RoadsService } = await loader.load('roads');
        const userCircle = new Circle({
            strokeColor: "#00ABF0",
            strokeOpacity: 0.8,
            strokeWeight: 2,
            fillColor: "#00ABF0",
            fillOpacity: 0.40,
            map: map,
            center: center, // Center of the circle is user's current location
            radius: radius // Example radius in meters (adjust as needed)
        });

        const circleCenter = userCircle.getCenter();
        const circleRadius = userCircle.getRadius();

        const snapToRoadsRequest = {
            path: circleCenter.toJSON(),
            interpolate: true,
            radius: circleRadius ,
        };
    }

}
