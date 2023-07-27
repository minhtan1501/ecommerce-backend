const mongoose = require("mongoose");
const {
  db: { userName, password, name },
} = require("../configs/config.mongodb");
const { countConnect } = require("../helper/check.connect");
const connectString = `mongodb+srv://${userName}:${password}${name}`;
console.log(connectString);
class Database {
  constructor() {
    this.connect();
  }

  connect() {
    if (1 === 1) {
      mongoose.set("debug", true);
      mongoose.set("debug", { color: true });
    }
    mongoose
      .connect(connectString)
      .then((_) => {
        console.log("Connected MongoDB Successfully");
        countConnect();
    })
      .catch((err) => {
        console.log("Error connecting " + err);
      });
  }

  static getInstance() {
    if (!Database.instance) {
      Database.instance = new Database();
    }
  }
}

const instanceMongoDB = Database.getInstance();

module.exports = instanceMongoDB;
