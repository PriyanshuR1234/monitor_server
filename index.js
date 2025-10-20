const express = require('express');
const axios = require('axios');
const app = express();
const port = process.env.PORT || 3000;

// List of servers you want to monitor
const targetServers = [
  'https://brochat-2cqd.onrender.com/health',
  'https://e-tongue-b.onrender.com/health',
  'https://crop-service-wkxt.onrender.com/health'
];

// Function to check one server’s health
const checkServer = async (server) => {
  try {
    const startTime = Date.now();
    await axios.get(server);
    const responseTime = Date.now() - startTime;
    console.log(`[✅ Healthy] ${server} | Response time: ${responseTime}ms | Checked at ${new Date().toLocaleTimeString()}`);
  } catch (error) {
    console.error(`[❌ Down] ${server} | Checked at ${new Date().toLocaleTimeString()} | Error: ${error.message}`);
  }
};

// Function to continuously check servers one by one
const startMonitoring = async () => {
  let index = 0;
  while (true) {
    const server = targetServers[index];
    console.log(`\n🌐 Checking server ${index + 1}/${targetServers.length}: ${server}`);
    await checkServer(server);
    await new Promise(resolve => setTimeout(resolve, 3000)); // Wait 3 seconds before next check
    index = (index + 1) % targetServers.length; // Cycle through servers
  }
};

// Health route for this monitoring server
app.get('/health', (req, res) => {
  res.status(200).send("✅ Monitor server is running well");
});

// Start the monitoring server
app.listen(port, () => {
  console.log(`Monitoring server running on port ${port}`);
  startMonitoring(); // Start continuous monitoring loop
});
