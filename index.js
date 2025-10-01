const express = require('express');
const axios = require('axios');
const app = express();
const port = process.env.PORT || 3000;

// Server you want to monitor
const targetServer = 'https://brochat-2cqd.onrender.com/health';

// Function to check health of BroChat
const checkHealth = async () => {
  try {
    await axios.get(targetServer);
    console.log(`[✅ Healthy] ${targetServer} at ${new Date().toLocaleTimeString()}`);
  } catch (error) {
    console.error(`[❌ Down] ${targetServer} at ${new Date().toLocaleTimeString()} - ${error.message}`);
  }
};

// Start continuous health check every 3 seconds
setInterval(checkHealth, 300000);

// Health route for this monitoring server
app.get('/health', (req, res) => {
  res.status(200).send("✅ Monitor server is running good");
});

// Start the monitoring server
app.listen(port, () => {
  console.log(`Monitoring server running on port ${port}`);
  checkHealth(); // Run immediately on startup
});
