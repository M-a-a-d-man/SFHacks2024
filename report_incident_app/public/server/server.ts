// server.js
import express from express;
import bodyParser from 'body-parser';
import connectDB from './db'; // Adjust the path according to your project structure
import hazardRoutes from './routes/hazardRoutes'; // You'll create this file next

const app = express();
const port = 3000;

connectDB();

// Middleware to parse JSON bodies
app.use(bodyParser.json());

// Define your routes here
app.post('/api/hazards', async (req, res) => {
  // Assume req.body contains hazard data
  try {
    const hazard = await Report.create(req.body);
    res.status(201).json({ success: true, data: hazard });
  } catch (error) {
    res.status(400).json({ success: false });
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
