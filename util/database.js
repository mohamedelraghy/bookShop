// const Sequelize = require('sequelize');

// const sequelize = new Sequelize('shop', 'root', 'password', {
//   dialect: 'mysql',
//   host: 'localhost'
// });

// module.exports = sequelize;


const mongodb = require('mongodb');
const MongoClinet = mongodb.MongoClient;

const mongoConnect = callback => {

  MongoClinet.connect('mongodb+srv://Mohamed:Anaconda1@shop.zye25w7.mongodb.net/?retryWrites=true&w=majority')
    .then(client => {
      console.log('DB Connected');
      callback(client);
    })
    .catch( err => console.log(err));
}

module.exports = mongoConnect;