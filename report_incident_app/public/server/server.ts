// server.js
import express from express;

const app = express();
const port = 3000;

// Middleware to parse JSON bodies
app.use(bodyParser.json());

// Define your routes here

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
