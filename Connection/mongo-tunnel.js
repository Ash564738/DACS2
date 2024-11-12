const tunnel = require('tunnel-ssh');  // Import the tunnel-ssh module
const mongoose = require('mongoose');  // Import mongoose to connect to MongoDB
const fs = require('fs');  // To read the private key file

// SSH Tunnel Configuration
const config = {
    username: 'myusername',  // Your SSH username
    host: 'my.ip.address',   // The IP of the remote machine
    agent: process.env.SSH_AUTH_SOCK,  // SSH agent for authentication (optional)
    privateKey: fs.readFileSync('C:/Users/LEMAN/.ssh/id_rsa'), // Path to your private SSH key
    port: 22,  // The SSH port (typically 22)
    dstPort: 27017,  // The remote port (MongoDB port)
    password: 'mypassword',  // SSH password if necessary
    localPort: 27018  // Local port to forward to (can be any unused port on your local machine)
};

// Setting up the SSH tunnel
tunnel(config, function (error, server) {
    if (error) {
        console.log("SSH connection error: " + error);
        return;
    }

    // Once the SSH tunnel is established, connect to MongoDB through the tunnel
    mongoose.connect('mongodb://localhost:27018/DACS2');  // Use the local port where the tunnel is forwarded

    const db = mongoose.connection;

    // Handle errors in MongoDB connection
    db.on('error', console.error.bind(console, 'DB connection error:'));

    // Handle successful connection
    db.once('open', function() {
        console.log("DB connection successful via SSH tunnel");
    });
});
