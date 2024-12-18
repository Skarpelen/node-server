import Category from '../models/category.js';
import Product from '../models/product.js';

class CategoryController {
  async getCategories(req, res) {
    try {
      const categories = await Category.findAll({ include: Product });
      res.status(200).json(categories);
    } catch (error) {
      res.status(500).json({ message: 'Failed to retrieve categories', error });
    }
  }

  async getCategory(req, res) {
    try {
      const category = await Category.findOne({
        where: { id: req.params.id },
        include: Product,
      });
      if (category) {
        res.status(200).json(category);
      } else {
        res.status(404).json({ message: 'Category not found' });
      }
    } catch (error) {
      res.status(500).json({ message: 'Failed to retrieve category', error });
    }
  }

  async createCategory(req, res) {
    try {
      const { name } = req.body;
      const category = await Category.create({ name });
      res.status(201).json(category);
    } catch (error) {
      res.status(500).json({ message: 'Failed to create category', error });
    }
  }

  async deleteCategory(req, res) {
    try {
      const result = await Category.destroy({ where: { id: req.params.id } });
      if (result) {
        res.status(200).json({ message: 'Category deleted' });
      } else {
        res.status(404).json({ message: 'Category not found' });
      }
    } catch (error) {
      res.status(500).json({ message: 'Failed to delete category', error });
    }
  }
}

export default new CategoryController();
