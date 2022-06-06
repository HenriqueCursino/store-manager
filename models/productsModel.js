const { ObjectId } = require('mongodb');
const connection = require('./connection');

// req 1
const addProduct = async (name, quantity) => {
  const conn = await connection();
  const { insertedId: id } = await conn.collection('products').insertOne({ name, quantity });
  
  return id;
};

const findProductByName = async (name) => {
  const conn = await connection();
  const productName = await conn.collection('products').findOne({ name });

  return productName;
};

// req 2
const getAllProducts = async () => {
  const conn = await connection();
  const productList = await conn.collection('products').find().toArray();

  return productList;
};

const getProductById = async (id) => {
  const conn = await connection();
  const productInfo = await conn.collection('products').findOne(ObjectId(id));

  return productInfo;
};

// req 3
const updateProduct = async (id, name, quantity) => {
  const conn = await connection();
  const { modifiedCount } = await conn.collection('products').updateOne({
    _id: ObjectId(id) }, { $set: { name, quantity }, 
  });

  return modifiedCount;
};

// req 4
const deleteProduct = async (id) => {
  const conn = await connection();
  const { deletedCount } = await conn.collection('products').deleteOne({
    _id: ObjectId(id),
  });
  // console.log(deletedCount);

  return deletedCount;
};

module.exports = {
  addProduct,
  findProductByName,
  getAllProducts,
  getProductById,
  updateProduct,
  deleteProduct,
};
