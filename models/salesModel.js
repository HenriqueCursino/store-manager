const { ObjectId } = require('mongodb');
const connection = require('./connection');

// req 5 - Cadastrar vendas
const addSale = async (saleInfo) => {
  const conn = await connection();

  const { insertedId: saleId } = await conn.collection('sales').insertOne({
    itensSold: saleInfo.map(({ productId, quantity }) => ({ productId, quantity })),
  });

  return saleId;
};

// req 6 - Listar as vendas
const getAllSales = async () => {
  const conn = await connection();

  const salesList = await conn.collection('sales').find().toArray();

  return salesList;
};

// req 6 - Listar as vendas pelo ID
const getSaleById = async (id) => {
  const conn = await connection();
  const saleInfo = await conn.collection('sales').findOne({ _id: ObjectId(id) });

  return saleInfo;
};

// req 7 - Atualizar vendas
const updateSale = async (id, saleInfo) => {
  const conn = await connection();
  const { modifiedCount } = await conn.collection('sales').updateOne({
    _id: ObjectId(id) },
    { $set:
      { itensSold: saleInfo.map(({ productId, quantity }) => ({ productId, quantity })) }, 
  });

  return modifiedCount;
};

// req 8 - Deletar uma venda
const deleteSale = async (id) => {
  const conn = await connection();
  const { deletedCount } = await conn.collection('sales').deleteOne({
    _id: ObjectId(id),
  });

  return deletedCount;
};

module.exports = {
  addSale,
  getAllSales,
  getSaleById,
  updateSale,
  deleteSale,
};
