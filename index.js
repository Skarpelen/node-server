import express from 'express';
import seq from './config/database.js';
import categoryRoutes from './routes/categoryRoutes.js';
import productRoutes from './routes/productRoutes.js';
import uploadRoutes from './routes/uploadRoutes.js';
import path from 'path';

const app = express();
const PORT = 8000;

app.use(express.json());
app.use('/uploads', express.static(path.join(process.cwd(), 'public', 'uploads')));

app.use('/categories', categoryRoutes);
app.use('/products', productRoutes);
app.use('/upload', uploadRoutes);

app.get('/', (req, res) => {
  res.send('<h1>Welcome to the Products and Categories API!</h1>');
});

(async () => {
  try {
    await seq.sync({ force: true });
    console.log('Database synced successfully');
    app.listen(PORT, () => {
      console.log(`Server is running on http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error('Error syncing database:', error);
  }
})();
