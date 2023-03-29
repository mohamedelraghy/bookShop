const mongoDB = require('mongodb');
const getDB = require('../util/database').getDB;

const ObjectId = mongoDB.ObjectId;


class User {
  constructor(username, email, cart, id) {
    this.name = username;
    this.email = email;
    this.cart = cart;
    this._id = id;
  }

  save() {
    const db = getDB();
    return db
      .collection('users')
      .insertOne(this);
  }

  addToCart(product) {
    console.log(this.cart);
    const cartProductsIndex = this.cart.items.findIndex(cp => {
      return cp.productId == product.id;
    });
 
    let newQuantity = 1;
    const updaedCartItems = [...this.cart.items];

    if(cartProductsIndex >= 0) {
      newQuantity = this.cart.items[cartProductsIndex].quantity++;
      updaedCartItems[cartProductsIndex].quantity = newQuantity;
    } else {
      updaedCartItems.push({ productId: new ObjectId(product._id) , quantity: newQuantity});
    }
    const updaedCart = {items: updaedCartItems};
    const db = getDB();
    return db.collection('users').updateOne(
      { _id: new ObjectId(this._id)},
      { $set: {cart: updaedCart}} 
    );
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