import { Sequelize } from 'sequelize';
import seq from '../config/database.js';

const Category = seq.define('category', {
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
});

export default Category;
