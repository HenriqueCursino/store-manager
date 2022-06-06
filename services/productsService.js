const JOI = require('@hapi/joi');
const productsModel = require('../models/productsModel');
const { generateErrorObj } = require('../middlewares/errorMIddleware');

const productSchema = JOI.object({
  name: JOI.string().min(5),
  quantity: JOI.number().integer().min(1),
});
const idSchema = JOI.string().length(24).messages({ 'string.length': 'Wrong id format' });

// req 1
const addProduct = async (name, quantity) => {
  let { error } = productSchema.validate({ name, quantity });

  if (error) {
    error = {
      type: 'invalid_data',
      message: error.message,
    };
    throw error;
  }

  const productExists = await productsModel.findProductByName(name);

  const ALREADY_EXISTS_ERROR = {
    type: 'invalid_data',
    message: 'Product already exists',
  };

  if (productExists) throw (ALREADY_EXISTS_ERROR);

  const insertedId = await productsModel.addProduct(name, quantity);

  return insertedId;
};

// req 2
const getAllProducts = async () => {
  const productsList = await productsModel.getAllProducts();

  return { products: [...productsList] };
};

const getProductById = async (id) => {
  let { error } = idSchema.validate(id);

  if (error) {
    error = {
      type: 'invalid_data',
      message: error.message,
    };
    
    throw error;
  }

  const productInfo = await productsModel.getProductById(id);

  const ID_NOT_FOUND = {
    type: 'id_not_found',
    message: 'Wrong id format',
  };

  if (!productInfo) throw (ID_NOT_FOUND);

  return productInfo;
};

// req 3
const updateProduct = async (id, name, quantity) => {
  let { error } = productSchema.validate({ name, quantity });

  if (error) {
      error = generateErrorObj('invalid_data', error.message);
      throw (error);
  }

  const modifiedCount = await productsModel.updateProduct(id, name, quantity);

  return modifiedCount;
};

// req 4
const deleteProduct = async (id) => {
  const productInfo = await getProductById(id);

  const deletedCount = await productsModel.deleteProduct(id);
  // console.log(productInfo);
  // console.log(deletedCount);

  return { productInfo, deletedCount };
};

module.exports = {
  addProduct,
  getAllProducts,
  getProductById,
  updateProduct,
  deleteProduct,
};
