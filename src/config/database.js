const mongoose = require("mongoose");

const dns = require('dns');
dns.setServers(['8.8.8.8', '8.8.4.4']);


const connectdb = async() => {
     await mongoose.connect(
      "mongodb+srv://tanveerkhan9:pass@devmeet.lgahh3s.mongodb.net/devmeetDB"
);
}

module.exports = connectdb;
