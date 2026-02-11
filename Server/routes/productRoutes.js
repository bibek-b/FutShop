import express from 'express';
import { CreateProduct, GetProducts, GetProduct, UpdateProduct, DeleteProduct, GetProductByCategory, GetProductByUserId  } from '../controller/productsController.js';
// import authMiddleware from '../Middleware/authMiddleware.js';

const router = express.Router();

router.post("/create", CreateProduct);
router.get("/", GetProducts);
router.get("/:productId", GetProduct);
router.get("/:userId", GetProductByUserId);
router.get("/category/:category", GetProductByCategory);
router.put("/update/:productId", UpdateProduct);
router.delete("/delete/:productId", DeleteProduct);

export default router;