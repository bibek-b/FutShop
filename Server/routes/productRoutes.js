import express from 'express';
import { CreateProduct, GetProducts, GetProduct, UpdateProduct, DeleteProduct  } from '../controller/productsController.js';
import authMiddleware from '../Middleware/authMiddleware.js';

const router = express.Router();

router.post("/create", authMiddleware, CreateProduct);
router.get("/", GetProducts);
router.get("/:productId", GetProduct);
router.put("/:productId", UpdateProduct);
router.delete("/:productId", DeleteProduct);

export default router;