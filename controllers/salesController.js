const salesService = require('../services/salesService');

const generateNewSaleInfo = (id, salesArray) => ({
    _id: id,
    itensSold: salesArray,
});

// req 5 - Cadastrar vendas
const addSale = async (req, res, next) => {
  try {
    const saleInfo = req.body;
    // console.log(saleInfo);

    const saleId = await salesService.addSale(saleInfo);
    // console.log(saleId);

    const response = generateNewSaleInfo(saleId, saleInfo);
    // console.log(response);

    return res.status(200).json(response);
  } catch (error) {
    next(error);
  }
};

// req 6 - Listas as vendas
const getAllSales = async (req, res) => {
  const salesList = await salesService.getAllSales();

  return res.status(200).json(salesList);
};

// req 6 - Listar vendas pelo ID
const getSaleById = async (req, res, next) => {
  try {
    const { id } = req.params;

    const saleById = await salesService.getSaleById(id);

    return res.status(200).json(saleById);
  } catch (error) {
    return next(error);
  }
};

// req 7 - Atualizar uma venda
const updateSale = async (req, res, next) => {
  try {
    let saleUpdated = {};
    const { id } = req.params;
    const saleInfo = req.body;

    const modifiedCount = await salesService.updateSale(id, saleInfo);

    if (modifiedCount === 1) {
      saleUpdated = generateNewSaleInfo(id, saleInfo);
    }

    return res.status(200).json(saleUpdated);
  } catch (error) {
    return next(error);
  }
};

// req 8 - Deletar uma venda
const deleteSale = async (req, res, next) => {
  try {
    const { id } = req.params;

    const {
      deletedCount,
      saleInfo,
    } = await salesService.deleteSale(id);

    if (deletedCount === 1) {
      return res.status(200).json(saleInfo);
    }
  } catch (error) {
    next(error);
  }
};

module.exports = {
  addSale,
  getAllSales,
  getSaleById,
  updateSale,
  deleteSale,
};
