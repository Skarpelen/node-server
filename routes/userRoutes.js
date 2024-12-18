import express from 'express';
import userController from '../controllers/userController.js';
import authMiddleware from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/register', (req, res) => userController.register(req, res));
router.get('/activate', (req, res) => userController.activate(req, res));

router.get('/profile', authMiddleware, (req, res) => {
  res.status(200).json({ message: 'User profile', userId: req.user.userId });
});

export default router;
