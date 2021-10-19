const mongoose = require("mongoose");
require('dotenv').config();

async function dbConnect() {
  mongoose
    .connect(process.env.MONGODB_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true,
        useFindAndModify: false
      }
    ).then(() => {
      console.log("Successfully connected to MongoDB Atlas! TEST");
    }).catch((error) => {
      console.log("Unable to connect to MongoDB Atlas!");
      console.error(error);
    });
}

module.exports = dbConnect;