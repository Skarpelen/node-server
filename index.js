import express from 'express';
import { v4 as uuidv4 } from 'uuid';

const app = express();
const PORT = 8000;

app.use(express.json());

let products = [
  {
    id: 1,
    name: 'Smartphone',
    description: 'A high-end smartphone with excellent camera quality.',
    price: 599.99,
    imageUrl: 'https://example.com/img/smartphone.jpg',
  },
  {
    id: 2,
    name: 'Laptop',
    description: 'Lightweight and powerful laptop for work and play.',
    price: 999.99,
    imageUrl: 'https://example.com/img/laptop.jpg',
  },
  {
    id: 3,
    name: 'Headphones',
    description: 'Wireless headphones with noise cancellation.',
    price: 199.99,
    imageUrl: 'https://example.com/img/headphones.jpg',
  },
];

app.get('/', (req, res) => {
  res.send('<h1>Welcome to the Products API!</h1><p>Use <code>/products</code> to view the products.</p>');
});

// Получить список всех товаров
app.get('/products', (req, res) => {
  res.status(200).json(products);
});

// Получить информацию о конкретном товаре по ID
app.get('/products/:id', (req, res) => {
  const product = products.find((product) => product.id == req.params.id);
  if (product) {
    res.status(200).json(product);
  } else {
    res.status(404).json({ message: 'Product not found' });
  }
});

// Добавить новый товар
app.post('/products', (req, res) => {
  const { name, description, price, imageUrl } = req.body;
  const newProduct = {
    id: uuidv4(),
    name,
    description,
    price,
    imageUrl,
  };
  products.push(newProduct);
  res.status(201).json(newProduct);
});

// Обновить информацию о товаре
app.put('/products/:id', (req, res) => {
  const { name, description, price, imageUrl } = req.body;
  const product = products.find((product) => product.id == req.params.id);
  if (product) {
    product.name = name || product.name;
    product.description = description || product.description;
    product.price = price || product.price;
    product.imageUrl = imageUrl || product.imageUrl;
    res.status(200).json(product);
  } else {
    res.status(404).json({ message: 'Product not found' });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
