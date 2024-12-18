import Category from '../models/category.js';
import Product from '../models/product.js';

class ProductController {
  async getProducts(req, res) {
    try {
      const products = await Product.findAll({ include: Category });
      res.status(200).json(products);
    } catch (error) {
      res.status(500).json({ message: 'Failed to retrieve products', error });
    }
  }

  async getProduct(req, res) {
    try {
      const product = await Product.findOne({
        where: { id: req.params.id },
        include: Category,
      });
      if (product) {
        res.status(200).json(product);
      } else {
        res.status(404).json({ message: 'Product not found' });
      }
    } catch (error) {
      res.status(500).json({ message: 'Failed to retrieve product', error });
    }
  }

  async createProduct(req, res) {
    try {
      const { name, description, price, imageUrl, categoryId } = req.body;
      const product = await Product.create({
        name,
        description,
        price,
        imageUrl,
        categoryId,
      });
      res.status(201).json(product);
    } catch (error) {
      res.status(500).json({ message: 'Failed to create product', error });
    }
  }

  async deleteProduct(req, res) {
    try {
      const result = await Product.destroy({ where: { id: req.params.id } });
      if (result) {
        res.status(200).json({ message: 'Product deleted' });
      } else {
        res.status(404).json({ message: 'Product not found' });
      }
    } catch (error) {
      res.status(500).json({ message: 'Failed to delete product', error });
    }
  }
}

export default new ProductController();
