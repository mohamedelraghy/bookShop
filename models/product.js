const mongoDB = require('mongodb');
const getDB = require('../util/database').getDB;

class Product {
  constructor(title, price, imageUrl, description, id) {
    this.title = title;
    this.price = price;
    this.description = description;
    this.imageUrl = imageUrl;
    this._id = id ? new mongoDB.ObjectId(id) : null;
  }

  save() {
    const db = getDB();
    let dbOp;
    if(this._id) {
      dbOp = db
      .collection('products')
      .updateOne({ _id: this._id}, { $set:  this });
    }else {
      dbOp = db.collection('products').insertOne(this);
    }
    return dbOp 
      .then(result => {
        console.log(result);
      })
      .catch(err => console.log(err));
  }

  static fetchAll(){
    const db = getDB();
    return db.collection('products')
      .find()
      .toArray()
      .then(products => {
        console.log(products);
        return products;
      })
      .catch(err => console.log(err));
  }

  static findById(prodId) {
    const db = getDB();
    return db.collection('products')
      .find({_id: new mongoDB.ObjectId(prodId)})
      .next()
      .then(product => {
        console.log(product);
        return product;
      })
      .catch(err => console.log(err));
  }

  static deleteByID(prodId) {
    const db = getDB();
    return db.collection('products')
      .deleteOne({_id: new mongoDB.ObjectId(prodId)})
      .then(result => {
        console.log("Product Deleted successfully");
      })
      .catch(err => console.log(err));
  }

}

// const Product = sequelize.define('product', {
//   id: {
//     type: Sequelize.INTEGER,
//     autoIncrement: true,
//     allowNull: false,
//     primaryKey: true
//   },
//   title: Sequelize.STRING,
//   price: {
//     type: Sequelize.DOUBLE,
//     allowNull: false
//   },
//   imageUrl: {
//     type: Sequelize.STRING,
//     allowNull: false
//   },
//   description: {
//     type: Sequelize.STRING,
//     allowNull: false
//   }
// });

module.exports = Product;