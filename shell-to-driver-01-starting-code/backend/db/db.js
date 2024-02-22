const mongodb = require("mongodb");

let _db;

const initDB = (callback) => {
  if (_db) {
    console.log("Database is already initialized.");
    return callback(null, _db);
  }

  mongodb.MongoClient.connect("mongodb://localhost:27017/shop")
    .then((client) => {
      _db = client.db();
      return callback(null, _db);
    })
    .catch((err) => {
      return callback(err, null);
    });
};

const getDB = () => {
  if (!_db) {
    throw new Error("DB is not initialized.");
  }
  return _db;
};

module.exports = { initDB, getDB };
