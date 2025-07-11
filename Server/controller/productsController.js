import ProductsModel from "../model/ProductsModel.js";

//Create product
export const CreateProduct = async (req, res) => {
  const { title, rating, price, category } = req.body;

  if (!title || !rating || !price || !category) {
    return res.status(400).json({ error: "All fields are required!" });
  }
  try {
    const isProductExist = await ProductsModel.findOne({title});

    if (isProductExist)
      return res.status(409).json({ error: "Product already exists!" });

    await ProductsModel.create({ title, rating, price, category });

    res.status(201).json({ message: "Product created successfully!" });
  } catch (error) {
    return res.status(500).json(error);
  }
};
//Get products
export const GetProducts = async (req, res) => {
  try {
    const products = await ProductsModel.find();
    if (products.length === 0) {
      return res.status(404).json({ error: "Products not found!" });
    }
    return res.status(200).json(products);
  } catch (error) {
    return res.status(500).json(error);
  }
};
//Get product
export const GetProduct = async (req, res) => {
  const { productId } = req.params;
  if (!productId)
    return res.status(400).json({ error: "Product id is required!" });
  try {
    const product = await ProductsModel.findById(productId);
    if (product.length === 0) return res.status(400).json({ error: "Product not found!" });

    return res.status(200).json(product);
  } catch (error) {
    return res.status(500).json(error);
  }
};
//Update product
export const UpdateProduct = async (req, res) => {
  const { productId } = req.params;
  const { title, rating, price, category } = req.body;

  if (!productId) {
    return res.status(400).json({ error: "Product id is required!" });
  }

  if (!title || !rating || !price || !category) {
    return res.status(400).json({ error: "All fields are required!" });
  }

  try {
    const product = await ProductsModel.findById(productId);

    if (product.length === 0) return res.status(400).json({ error: "Product not found!" });

    const updatedProduct = await ProductsModel.findByIdAndUpdate(
      productId,
      { title, rating, price, category },
      { new: true }
    );
    return res
      .status(200)
      .json({
        message: "Product updated successfully!",
        product: updatedProduct,
      });
  } catch (error) {
    return res.status(500).json(error);
  }
};

//Delete product
export const DeleteProduct = async (req, res) => {
  const { productId } = req.params;

  if (!productId) {
    return res.status(400).json({ error: "Product id is required!" });
  }

  try {
    const product = await ProductsModel.findById(productId);

    if (!product) return res.status(400).json({ error: "Product not found!" });

    await ProductsModel.findByIdAndDelete(productId);

    return res.status(200).json({message: "Product deleted successfully!"});
    
  } catch (error) {
    return res.status(500).json(error);
  }
};
