import connectDB from './index.js';
import Hazard from '../../../models/hazard';

export default async function handler(req, res) {
    const {
        query: { id },
        method,
    } = req;

    await connectDB();

    switch (req.method) {
        console.log(req.method)
        case 'GET':
        try {
            const hazard = await Hazard.findById(id);
            if (!hazard) {
                return res.status(404).json({ success: false, message: 'Hazard not found' });
            }
            res.status(200).json({ success: true, data: hazard });
        } catch (error) {
            res.status(400).json({ success: false });
        }
        break;
        case 'PUT':
        try {
            const hazard = await Hazard.findByIdAndUpdate(id, req.body, {
                new: true,
                runValidators: true,
            });
            if (!hazard) {
                return res.status(404).json({ success: false, message: 'Hazard not found' });
            }
            res.status(200).json({ success: true, data: hazard });
        } catch (error) {
            res.status(400).json({ success: false });
        }
        break;
        case 'DELETE':
        try {
            const deletedHazard = await Hazard.deleteOne({ _id: id });
            if (!deletedHazard) {
                return res.status(404).json({ success: false, message: 'Hazard not found' });
            }
            res.status(200).json({ success: true, data: {} });
        } catch (error) {
            res.status(400).json({ success: false });
        }
        break;
        default:
        res.status(405).json({ success: false, message: 'Method Not Allowed' });
        break;
    }
}
