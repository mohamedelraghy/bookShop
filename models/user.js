const mongoDB = require('mongodb');
const getDB = require('../util/database').getDB;

const ObjectId = mongoDB.ObjectId;


class User {
  constructor(username, email, id) {
    this.name = username;
    this.email = email;
  }

  save() {
    const db = getDB();
    return db
      .collection('users')
      .insertOne(this);
  }

  static findById(userId) {
    const db = getDB();
    return db.collection('users')
      .findOne({_id : new ObjectId(userId)})
      .then(user => {
        console.log(user);
        return user
      })
      .catch(err => console.log(err));
  }

}

// const User = sequelize.define('user', {
//   id: {
//     type: Sequelize.INTEGER,
//     autoIncrement: true,
//     allowNull: false,
//     primaryKey: true
//   },
//   name: Sequelize.STRING,
//   email: Sequelize.STRING
// });

module.exports = User;