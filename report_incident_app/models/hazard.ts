// import mongoose from 'mongoose';

// const hazardSchema = new mongoose.Schema({
//     coordinates: {   
//         lat: Number, 
//         lng: Number
//     },
//     radius: Number, 
//     lastReportedTime: Date
// }, { collection: 'danger_zone_reports' });

// export default mongoose.models.Hazard || mongoose.model('Hazard', hazardSchema, 'danger_zone_reports');

import mongoose from 'mongoose';

const reportSchema = new mongoose.Schema({
    coordinates: {   
        lat: Number, 
        lng: Number
    },
    radius: Number,
    lastReportedTime: Date
}, { collection: 'reports' }); // Specify the collection name

const Report = mongoose.model('Report', reportSchema);

export default Report;
