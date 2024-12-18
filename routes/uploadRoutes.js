import express from 'express';
import uploadMiddleware from '../middleware/uploadMiddleware.js';

const router = express.Router();

router.post('/', uploadMiddleware.single('file'), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ message: 'File not uploaded' });
  }
  res.status(200).json({ imageUrl: `/uploads/${req.file.filename}` });
});

export default router;
