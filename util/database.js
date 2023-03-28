// const Sequelize = require('sequelize');

// const sequelize = new Sequelize('shop', 'root', 'password', {
//   dialect: 'mysql',
//   host: 'localhost'
// });

// module.exports = sequelize;

let _db;

const mongodb = require('mongodb');
const MongoClinet = mongodb.MongoClient;

const mongoConnect = callback => {

  MongoClinet.connect('mongodb+srv://Mohamed:Anaconda1@shop.zye25w7.mongodb.net/shop?retryWrites=true&w=majority')
    .then(client => {
      console.log('DB Connected');
      _db = client.db();
      callback(client);
    })
    .catch( err => {
      console.log(err)
      throw err;
    });
}

const getDB = () => {
  if(_db) return _db;
  throw 'No database found!';
}

exports.mongoConnect = mongoConnect;
exports.getDB = getDB;