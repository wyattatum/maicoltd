const productModel = require("../models/productModel");

// CREATE
const createProduct = (req, res) => {
  const { name, price, quantity, user_id } = req.body;

  productModel.createProduct(name, price, quantity, user_id, (err) => {
    if (err) return res.status(500).send("DB error: " + err);
    res.send("Product created successfully");
  });
};

// READ ALL
const getAllProducts = (req, res) => {
  productModel.getAllProducts((err, results) => {
    if (err) return res.status(500).send("DB error");
    res.json(results);
  });
};

// READ ONE
const getProductById = (req, res) => {
  const id = req.params.id;
  productModel.getProductById(id, (err, result) => {
    if (err) return res.status(500).send("DB error");
    res.json(result);
  });
};

// UPDATE
const updateProduct = (req, res) => {
  const id = req.params.id;
  const { name, price, quantity } = req.body;

  productModel.updateProduct(id, name, price, quantity, (err) => {
    if (err) return res.status(500).send("DB error");
    res.send("Product updated successfully");
  });
};
       
// DELETE
const deleteProduct = (req, res) => {
  const id = req.params.id;
  productModel.deleteProduct(id, (err) => {
    if (err) return res.status(500).send("DB error");
    res.send("Product deleted successfully");
  });
};

module.exports = {
  createProduct,
  getAllProducts,
  getProductById,
  updateProduct,
  deleteProduct,
};
