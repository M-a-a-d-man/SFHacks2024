import IconButton from '@mui/material/IconButton';
import CrisisAlertIcon from '@mui/icons-material/CrisisAlert';
import { initMap } from '../Maps/Map';
import { draw_circle } from '../../../public/middleware/locationcalc';
import { postData } from '../../../public/api/api'; // Correct the import path as needed

function createRadius(){
     // Add marker at the center
     var marker = new google.maps.Marker({
        position: centerLocation,
        map: map,
        title: 'Center Marker'
    });
}

const saveHazardToDatabase = async (center, radius) => {
    // Create an object with the data you want to save
    const hazardData = {
        coordinates: center,
        radius: radius,
        lastReportedTime: new Date()
    };

    // Send the data to the server
    await postData(hazardData);
};

export default function Button() {
    const addCircleToMap = () => {
        if (window.myMapGlobal) {
            const center = { lat: window.myMapGlobal.center.lat(), lng: window.myMapGlobal.center.lng() };
            const radius = 100; // Example radius, adjust as needed
            draw_circle(center, radius, window.myMapGlobal);
            saveHazardToDatabase(center, radius); // Save the hazard to the database
        }
    };

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
              onClick={addCircleToMap}
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

