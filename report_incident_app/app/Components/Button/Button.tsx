import IconButton from '@mui/material/IconButton';
import CrisisAlertIcon from '@mui/icons-material/CrisisAlert';
import { initMap } from '../Maps/Map';
import { draw_circle } from '../../../public/middleware/locationcalc';


function createRadius(){
     // Add marker at the center
     var marker = new google.maps.Marker({
        position: centerLocation,
        map: map,
        title: 'Center Marker'
    });

}

export default function Button() {
    const addCircleToMap = () => {
        if (window.myMapGlobal) {
            // Assuming window.myMapGlobal.center gives the current center. Adjust according to your implementation.
            const center = { lat: window.myMapGlobal.center.lat(), lng: window.myMapGlobal.center.lng() };
            draw_circle(center, 100, window.myMapGlobal);
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

