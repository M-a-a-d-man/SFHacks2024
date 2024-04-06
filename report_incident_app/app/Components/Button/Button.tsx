import IconButton from '@mui/material/IconButton';
import CrisisAlertIcon from '@mui/icons-material/CrisisAlert';
import { initMap } from '../Maps/Map';
import { Loader } from "@googlemaps/js-api-loader";

const loader = new Loader({
    apiKey: "AIzaSyAKcdk8y3vAzqhYFJhJy5E4V51rPBl4Zf4",
    version: "weekly",
});

async function createRadius(){
    try{
        const {Circle} = await loader.importLibrary('maps');
        



    }catch (error) {
        console.log("Map not loaded.", error);
    }


     


}

export default function Button() {
    return (
        <div style={{
            position: 'fixed', 
            bottom: '20px', // Adds padding from the bottom
            left: '60px', // Adds padding from the left side
            right: '60px', // Adds padding from the right side
            backgroundColor: '#d32f2f', // Uses a shade of red for better appeal
            display: 'flex',
            justifyContent: 'center', // Centers the IconButton horizontally
            alignItems: 'center', // Centers the IconButton vertically
            borderRadius: '25px', // Rounds the corners for a softer look
            padding: '10px 50px', // Adds internal padding for a larger click area
            boxShadow: '0 4px 8px rgba(0,0,0,0.2)', // Adds a subtle shadow for depth
            color: 'white', // Ensures the text is white
            cursor: 'pointer' // Changes the mouse cursor to indicate it's clickable
        }}> 
            <IconButton 
              onClick={initMap}
              style={{ 
                  color: 'white', // Ensures the icon is white
                  marginRight: '8px', // Adds some space between the icon and text
              }}
            >
                <CrisisAlertIcon />
            </IconButton>
            Report Incident
        </div>
    );
}

