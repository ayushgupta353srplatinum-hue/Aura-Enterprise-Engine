const Joi = require("joi");

const productSchema = Joi.object({
  productName: Joi.string().required(),

  sku: Joi.string().required(),

  category: Joi.string().required(),

  price: Joi.number().required(),

  cost: Joi.number().required(),

  stockQuantity: Joi.number().min(0).required(),

  reorderLevel: Joi.number().required(),
});

const validateProduct = (req, res, next) => {

  const { error } = productSchema.validate(req.body);

  if (error) {
    return res.status(400).json({
      message: error.details[0].message,
    });
  }

  // Business Rule
  if (req.body.price < req.body.cost) {
    return res.status(400).json({
      message: "Price cannot be lower than cost",
    });
  }

  next();
};

module.exports = validateProduct;