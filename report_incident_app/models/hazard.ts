import mongoose from 'mongoose';

const hazardSchema = new mongoose.Schema({
    coordinates: {   
        lat:Number, 
        lng:Number
    },
    lastReportedTime: Date
});

export default mongoose.models.Hazard || mongoose.model('Hazard', hazardSchema);
