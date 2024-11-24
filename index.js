import express from 'express';
import router from './router.js';
import { seq } from './db.js';
import { Category, Product } from './models.js';

const app = express();
const PORT = 8000;

app.use(express.json());
app.use(router);

app.get('/', (req, res) => {
  res.send('<h1>Welcome to the Products and Categories API!</h1>');
});

async function seedDatabase() {
  const electronics = await Category.create({ name: 'Electronics' });
  const furniture = await Category.create({ name: 'Furniture' });

  await Product.create({
    name: 'Smartphone',
    description: 'A high-end smartphone with excellent camera quality.',
    price: 599.99,
    imageUrl: 'https://example.com/img/smartphone.jpg',
    categoryId: electronics.id,
  });

  await Product.create({
    name: 'Laptop',
    description: 'Lightweight and powerful laptop for work and play.',
    price: 999.99,
    imageUrl: 'https://example.com/img/laptop.jpg',
    categoryId: electronics.id,
  });

  await Product.create({
    name: 'Sofa',
    description: 'A comfortable sofa for your living room.',
    price: 299.99,
    imageUrl: 'https://example.com/img/sofa.jpg',
    categoryId: furniture.id,
  });

  console.log('Database has been seeded with initial data.');
}

(async () => {
  try {
    await seq.sync({ force: true });
    console.log('Database synced successfully');

    await seedDatabase();

    app.listen(PORT, () => {
      console.log(`Server is running on http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error('Error syncing database:', error);
  }
})();
