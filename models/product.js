import { Sequelize } from 'sequelize';
import seq from '../config/database.js';
import Category from './category.js';

const Product = seq.define('product', {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    primaryKey: true,
    allowNull: false,
    unique: true,
  },
  name: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  description: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  price: {
    type: Sequelize.FLOAT,
    allowNull: false,
  },
  imageUrl: {
    type: Sequelize.STRING,
    allowNull: false,
  },
});

Category.hasMany(Product, { onDelete: 'CASCADE' });
Product.belongsTo(Category, { onDelete: 'CASCADE' });

export default Product;
