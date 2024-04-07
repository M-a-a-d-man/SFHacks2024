import dbConnect from '../../../utils/db';
import Hazards from '../../../models/hazard';

export default async function handler(req, res) {
  await dbConnect();

  if (req.method === 'POST') {
    try {
      const hazard = await Hazards.create(req.body);
      res.status(201).json({ success: true, data: hazard });
    } catch (error) {
      res.status(400).json({ success: false });
    }
  } else if (req.method === 'GET') {
    try {
      const hazards = await Hazards.find({});
      res.status(200).json({ success: true, data: hazards });
    } catch (error) {
      res.status(400).json({ success: false });
    }
  } else {
    res.status(405).json({ success: false, message: 'Method Not Allowed' });
  }
}
