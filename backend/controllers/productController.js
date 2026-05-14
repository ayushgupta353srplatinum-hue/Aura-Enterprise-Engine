const Product = require("../models/Product");
const createProduct = async (req, res) => {
  try {

    const product = await Product.create(req.body);

    res.status(201).json({
      message: "Product Created Successfully",
      product,
    });

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });

  }
};
const updateProduct = async (req, res) => {
  try {

    const updatedProduct = await Product.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
      }
    );

    res.status(200).json({
      message: "Product Updated Successfully",
      updatedProduct,
    });

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });

  }
};
const getAnalytics = async (req, res) => {
  try {

    // Total Inventory Value + Total SKUs + Out Of Stock
    const summary = await Product.aggregate([
      {
        $group: {
          _id: null,

          totalInventoryValue: {
            $sum: {
              $multiply: ["$price", "$stockQuantity"],
            },
          },

          totalSKUs: {
            $sum: 1,
          },

          outOfStockItems: {
            $sum: {
              $cond: [{ $eq: ["$stockQuantity", 0] }, 1, 0],
            },
          },
        },
      },
    ]);

    // Category Wise Valuation
    const categoryDistribution = await Product.aggregate([
      {
        $group: {
          _id: "$category",

          totalValue: {
            $sum: {
              $multiply: ["$price", "$stockQuantity"],
            },
          },
        },
      },

      {
        $project: {
          _id: 0,
          category: "$_id",
          totalValue: 1,
        },
      },
    ]);

    // Lowest Stock Products
    const lowStockProducts = await Product.find()
      .sort({ stockQuantity: 1 })
      .limit(10)
      .select("productName stockQuantity category");

    res.status(200).json({
      summary: summary[0],

      categoryDistribution,

      lowStockProducts,
    });

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });

  }
};
const deleteProduct = async (req, res) => {
  try {

    await Product.findByIdAndDelete(req.params.id);

    res.status(200).json({
      message: "Product Deleted Successfully",
    });

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });

  }
};
const getProducts = async (req, res) => {
  try {
    let {
      page = 1,
      limit = 50,
      search = "",
      category = "",
      sort = "",
    } = req.query;

    page = Number(page);
    limit = Number(limit);

    const query = {};

    // Search
    if (search) {
      query.$text = {
        $search: search,
      };
    }

    // Category Filter
    if (category) {
      query.category = category;
    }

    // Sorting
    let sortOption = {};

    if (sort) {
      if (sort.startsWith("-")) {
        sortOption[sort.substring(1)] = -1;
      } else {
        sortOption[sort] = 1;
      }
    }

    const totalRecords = await Product.countDocuments(query);

    const products = await Product.find(query)
      .sort(sortOption)
      .skip((page - 1) * limit)
      .limit(limit);

    const totalPages = Math.ceil(totalRecords / limit);

    res.status(200).json({
      totalRecords,
      totalPages,
      currentPage: page,
      hasNextPage: page < totalPages,
      data: products,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = {
  getProducts,
  getAnalytics,
  createProduct,
  updateProduct,
  deleteProduct
};