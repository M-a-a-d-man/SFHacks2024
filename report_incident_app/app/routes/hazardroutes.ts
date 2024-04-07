import express from 'express';
const router = express.Router();

// Import handlers from your existing API files or define them here
import { handler as hazardHandler } from '../api/hazards'; // Adjust the path according to your project structure

router.post('/', hazardHandler);
router.get('/', hazardHandler); // Adjust according to your API design

export default router;
