import mongoose from 'mongoose';

const hazardSchema = new mongoose.Schema({
    coordinates: {   
        lat:number, 
        lng:number
    },
    lastReportedTime: Date
});

export default mongoose.models.Hazard || mongoose.model('Hazard', hazardSchema);
