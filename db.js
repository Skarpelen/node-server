import { Sequelize } from 'sequelize';

const seq = new Sequelize('blog', 'root', 'root', {
  dialect: 'mysql',
  host: 'localhost',
  port: '3306',
  define: {
    timestamps: true,
  },
});

export { seq };
