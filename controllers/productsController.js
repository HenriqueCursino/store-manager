const productsService = require('../services/productsService');

const productInfo = (id, name, quantity) => ({
  _id: id,
  name,
  quantity,
});

// req 1 - Cadastrar novo produto
const addProduct = async (req, res, next) => {
  try {
    const { name, quantity } = req.body;
    const insertedId = await productsService.addProduct(name, quantity);

    const newProduct = productInfo(insertedId, name, quantity);

    return res.status(201).json(newProduct);
  } catch (error) {
    return next(error);
  }
};

// req 2 - Listar os produtos
const getAllProducts = async (_req, res, _next) => {
  const productsList = await productsService.getAllProducts();

  return res.status(200).json(productsList);
};

const getProductById = async (req, res, next) => {
  try {
    const { id } = req.params;
  
    const productById = await productsService.getProductById(id);

    return res.status(200).json(productById);
  } catch (error) {
    return next(error);
  }
};

// req 3 - Atualizar produto
const updateProduct = async (req, res, next) => {
  try {
    let productUpdated = {};
    const { id } = req.params;
    const { name, quantity } = req.body;

    const modifiedCount = await productsService.updateProduct(id, name, quantity);

    if (modifiedCount === 1) {
      productUpdated = productInfo(id, name, quantity);
    }

    return res.status(200).json(productUpdated);
  } catch (error) {
    return next(error);
  }
};

// req 4 - Deletar produto
const deleteProduct = async (req, res, next) => {
  try {
    let productDeleted = {};
    const { id } = req.params;

    const {
      deletedCount,
      productInfo: { name, quantity }, 
    } = await productsService.deleteProduct(id);

    if (deletedCount === 1) {
      productDeleted = productInfo(id, name, quantity);
      // console.log('AQUI!!');
    }
    // console.log(productDeleted);

      return res.status(200).json(productDeleted);
  } catch (error) {
      next(error);
  }
};

module.exports = {
  addProduct,
  getAllProducts,
  getProductById,
  updateProduct,
  deleteProduct,
};
