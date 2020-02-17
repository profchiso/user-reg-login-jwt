const mongoose = require("mongoose");
const config = require("config");
const dburi = config.get("dbURI");

const connectToDB = async () => {
  try {
    await mongoose.connect(dburi, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    console.log("connected to DB");
  } catch (err) {
    console.log(err.message);
    process.exit(1); // exit process if it fails(application)
  }
};
module.exports = connectToDB;
