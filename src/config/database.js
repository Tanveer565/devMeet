const mongoose = require("mongoose");

const dns = require('dns');
dns.setServers(['8.8.8.8', '8.8.4.4']);


const connectdb = async() => {
     await mongoose.connect(
      "mongodb+srv://tanveerkhan9:VxSos4c1OA7QSF0i@devmeet.lgahh3s.mongodb.net/devmeetDB"
);
}

module.exports = connectdb;
