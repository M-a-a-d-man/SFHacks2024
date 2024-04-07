import connectDB from '../../../app/db';
import Report from '../../../models/hazard';
await connectDB();

export default async function handler(req, res) {

  if (req.method === 'POST') {

    try {
      const hazard = await Report.create(req.body);
      res.status(201).json({ success: true, data: hazard });
    } catch (error) {
      res.status(400).json({ success: false });
    }
  } else if (req.method === 'GET') {
    try {
      const hazards = await Report.find({});
      res.status(200).json({ success: true, data: hazards.map(h => ({ coordinates: h.coordinates, radius: 100 })) }); // Modify as needed
    } catch (error) {
      res.status(400).json({ success: false });
    }
  } else {
    res.status(405).json({ success: false, message: 'Method Not Allowed' });
  }
}
