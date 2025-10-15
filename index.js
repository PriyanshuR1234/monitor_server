const express = require('express');
const axios = require('axios');
const app = express();
const port = process.env.PORT || 3000;

// List of servers you want to monitor
const targetServers = [
  'https://brochat-2cqd.onrender.com/health',
  'https://e-tongue-b.onrender.com/health',
  'https://crop-service-wkxt.onrender.com/health'// Add your second server here
];

// Function to check health of servers
const checkHealth = async () => {
  for (const server of targetServers) {
    try {
      await axios.get(server);
      console.log(`[✅ Healthy] ${server} at ${new Date().toLocaleTimeString()}`);
    } catch (error) {
      console.error(`[❌ Down] ${server} at ${new Date().toLocaleTimeString()} - ${error.message}`);
    }
  }
};

// Start continuous health check every 3 seconds
setInterval(checkHealth, 30000);

// Health route for this monitoring server
app.get('/health', (req, res) => {
  res.status(200).send("✅ Monitor server is running good");
});

// Start the monitoring server
app.listen(port, () => {
  console.log(`Monitoring server running on port ${port}`);
  checkHealth(); // Run immediately on startup
});
