import IconButton from '@mui/material/IconButton';
import CrisisAlertIcon from '@mui/icons-material/CrisisAlert';
import { initMap } from '../Maps/Map';


function createRadius(){
     // Add marker at the center
     var marker = new google.maps.Marker({
        position: centerLocation,
        map: map,
        title: 'Center Marker'
    });c

}

export default function Button(){


    return (
        <div className="fixed bottom-8 left-8"> {/* Position at bottom left with margin */}
            <IconButton 
            onClick={initMap}
            >
                <CrisisAlertIcon/>
            </IconButton>
        </div>
    );
}