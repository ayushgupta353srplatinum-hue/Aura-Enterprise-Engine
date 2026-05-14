const express = require("express");

const router = express.Router();

const {
  getProducts,
  getAnalytics,
  createProduct,
  updateProduct,
  deleteProduct,
} = require("../controllers/productController");

const validateProduct = require("../validations/productValidation");

router.get("/inventory", getProducts);

router.get("/analytics", getAnalytics);

router.post(
  "/inventory",
  validateProduct,
  createProduct
);

router.put(
  "/inventory/:id",
  validateProduct,
  updateProduct
);

router.delete(
  "/inventory/:id",
  deleteProduct
);

module.exports = router;