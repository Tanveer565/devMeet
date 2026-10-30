const mongoose = require("mongoose");

const dns = require('dns');
dns.setServers(['8.8.8.8', '8.8.4.4']);


const connectdb = async() => {
     await mongoose.connect(
      
      process.env.DB_CONNECTION_SECRET
);
}

module.exports = connectdb;
