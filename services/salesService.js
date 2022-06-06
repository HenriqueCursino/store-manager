const JOI = require('@hapi/joi');
const salesModel = require('../models/salesModel');
const { generateErrorObj } = require('../middlewares/errorMIddleware');

// Validações
const salesSchema = JOI.array().items(JOI.object({
  productId: JOI.string().length(24).messages({
    'string.length': 'Wrong product ID or invalid quantity', 
  }),
  quantity: JOI.number().integer().min(1).messages({
    'number.base': 'Wrong product ID or invalid quantity',
    'number.integer': 'Wrong product ID or invalid quantity',
    'number.min': 'Wrong product ID or invalid quantity',
  }),
}));

const idSchema = JOI.string().length(24).messages({ 'string.length': 'Sale not found' });
const saleIdSchema = JOI.string().length(24).messages({
  'string.length': 'Wrong sale ID format',
});

// req 5 - Cadastrar vendas
const addSale = async (saleInfo) => {
  let { error } = salesSchema.validate(saleInfo);

  if (error) {
    error = generateErrorObj('invalid_data', error.message);
    throw (error);
  }

  const saleId = await salesModel.addSale(saleInfo);
  return saleId;
};

// req 6 - Listar Vendas
const getAllSales = async () => {
  const salesList = await salesModel.getAllSales();

  return { sales: [...salesList] };
};

// req 6 - Listar vendas pelo ID
const getSaleById = async (id) => {
  let { error } = idSchema.validate(id);

  if (error) {
    error = generateErrorObj('not_found', error.message);
    throw (error);
  }

  const saleInfo = await salesModel.getSaleById(id);

  if (!saleInfo) {
    error = generateErrorObj('not_found', 'Sale not found');
    throw (error);
  }

  return saleInfo;
};

// req 7 - Atualizar uma venda
const updateSale = async (id, saleInfo) => {
  let { error } = salesSchema.validate(saleInfo);

  if (error) {
    error = generateErrorObj('invalid_data', error.message);
    throw (error);
  }

  const modifiedCount = await salesModel.updateSale(id, saleInfo);

  return modifiedCount;
};

// Requisito 8 - Deletar uma venda
const deleteSale = async (id) => {
  let { error } = saleIdSchema.validate(id);

  if (error) {
    error = generateErrorObj('invalid_data', error.message);
    throw (error);
  }

  const saleInfo = await salesModel.getSaleById(id);

  if (!saleInfo) {
    error = generateErrorObj('not_found', 'Sale not found');
    throw (error);
  }
    
  const deletedCount = await salesModel.deleteSale(id);
  return { saleInfo, deletedCount };
};

module.exports = {
  addSale,
  getAllSales,
  getSaleById,
  updateSale,
  deleteSale,
};
