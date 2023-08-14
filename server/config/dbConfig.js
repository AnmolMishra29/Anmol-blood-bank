const mongoose = require("mongoose");

const URL =
  "mongodb://user:Anmol1234@ac-qcuajhe-shard-00-00.4dnh431.mongodb.net:27017,ac-qcuajhe-shard-00-01.4dnh431.mongodb.net:27017,ac-qcuajhe-shard-00-02.4dnh431.mongodb.net:27017/?ssl=true&replicaSet=atlas-g5l9eq-shard-0&authSource=admin&retryWrites=true&w=majority";
mongoose.connect(URL);

const connection = mongoose.connection;

//verify connection
connection.on("connected", () => {
  console.log("Database Connected Successfully");
});

//verify connection error
connection.on("error", (err) => {
  console.log("Error in connecting with database", err);
});
