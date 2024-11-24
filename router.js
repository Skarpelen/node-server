import express from 'express';
import { CategoryController, ProductController } from './controller.js';

const router = express.Router();

const categoryController = new CategoryController();
const productController = new ProductController();

router.get('/categories', (req, res) => categoryController.getCategories(req, res));
router.get('/categories/:id', (req, res) => categoryController.getCategory(req, res));
router.post('/categories', (req, res) => categoryController.createCategory(req, res));
router.delete('/categories/:id', (req, res) => categoryController.deleteCategory(req, res));

router.get('/products', (req, res) => productController.getProducts(req, res));
router.get('/products/:id', (req, res) => productController.getProduct(req, res));
router.post('/products', (req, res) => productController.createProduct(req, res));
router.delete('/products/:id', (req, res) => productController.deleteProduct(req, res));

export default router;
