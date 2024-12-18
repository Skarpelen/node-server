import { Sequelize } from 'sequelize';
import seq from '../config/database.js';

const User = seq.define('user', {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    primaryKey: true,
    allowNull: false,
    unique: true,
  },
  email: {
    type: Sequelize.STRING,
    allowNull: false,
    unique: true,
    validate: {
      isEmail: true,
    },
  },
  password: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  isActivated: {
    type: Sequelize.BOOLEAN,
    defaultValue: false,
  },
  activationToken: {
    type: Sequelize.STRING,
    allowNull: true,
  },
});

export default User;
