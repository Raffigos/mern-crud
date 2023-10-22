import Product from "../models/productModel.js";

const serverErrorHandler = (err, res) => {
  console.log(err);
  res.status(500).json({ err: "Not found!" });
};

const getProducts = async (req, res) => {
  try {
    const products = await Product.find({});

    if (products.length === 0) {
      return res.status(404).json({ message: "No products found!" });
    }
    res.status(200).json(products);
  } catch (err) {
    serverErrorHandler(err, res);
  }
};

const getProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findById(id);

    if (!product) {
      return res.status(404).json({ message: "Product does not exist!" });
    }
    res.status(200).json(product);
  } catch (err) {
    serverErrorHandler(err, res);
  }
};

const createProduct = async (req, res) => {
  try {
    const newProduct = await Product.create(req.body);
    res
      .status(201)
      .json({ message: "Product created successfully!", product: newProduct });
  } catch (err) {
    serverErrorHandler(err, res);
  }
};

const updateProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findByIdAndUpdate(id, req.body, {
      new: true
    });

    if (!product) {
      res
        .status(404)
        .json({ message: `Unable to update the product with ID ${id}...` });
    }
    res.status(200).json({
      message: "Product updated successfully!",
      product: product
    });
  } catch (err) {
    serverErrorHandler(err, res);
  }
};

const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findByIdAndDelete(id);
    if (!product) {
      res
        .status(404)
        .json({ err: `Unable to delete the product with ID ${id}...` });
    }
    res.status(200).json({ message: "Product deleted successfully", product });
  } catch (err) {
    serverErrorHandler(err, res);
  }
};

export { getProducts, getProduct, createProduct, updateProduct, deleteProduct };
