import { Category, Product } from './models.js';

class CategoryController {
  async getCategories(req, res) {
    const categories = await Category.findAll({ include: Product });
    res.status(200).json(categories);
  }

  async getCategory(req, res) {
    const category = await Category.findOne({
      where: { id: req.params.id },
      include: Product,
    });
    if (category) {
      res.status(200).json(category);
    } else {
      res.status(404).json({ message: 'Category not found' });
    }
  }

  async createCategory(req, res) {
    const { name } = req.body;
    const category = await Category.create({ name });
    res.status(201).json(category);
  }

  async deleteCategory(req, res) {
    const result = await Category.destroy({ where: { id: req.params.id } });
    if (result) {
      res.status(200).json({ message: 'Category deleted' });
    } else {
      res.status(404).json({ message: 'Category not found' });
    }
  }
}

class ProductController {
  async getProducts(req, res) {
    const products = await Product.findAll({ include: Category });
    res.status(200).json(products);
  }

  async getProduct(req, res) {
    const product = await Product.findOne({ where: { id: req.params.id }, include: Category });
    if (product) {
      res.status(200).json(product);
    } else {
      res.status(404).json({ message: 'Product not found' });
    }
  }

  async createProduct(req, res) {
    const { name, description, price, imageUrl, categoryId } = req.body;
    const product = await Product.create({
      name,
      description,
      price,
      imageUrl,
      categoryId,
    });
    res.status(201).json(product);
  }

  async deleteProduct(req, res) {
    const result = await Product.destroy({ where: { id: req.params.id } });
    if (result) {
      res.status(200).json({ message: 'Product deleted' });
    } else {
      res.status(404).json({ message: 'Product not found' });
    }
  }
}

export { CategoryController, ProductController };
