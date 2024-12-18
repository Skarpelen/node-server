import User from '../models/user.js';
import { sendActivationEmail } from '../services/mailService.js';
import { randomBytes } from 'crypto';

class UserController {
  async register(req, res) {
    try {
      const { email, password } = req.body;

      var user = await User.create({ email, password });

      var token = randomBytes(32).toString('hex');
      user.activationToken = token;
      await user.save();

      await sendActivationEmail(email, token);

      res.status(201).json({ message: 'User created. Please check your email to activate the account.' });
    } catch (error) {
      res.status(500).json({ message: 'Registration failed', error });
    }
  }

  async activate(req, res) {
    try {
      var { token } = req.query;
      if (!token) {
        return res.status(400).json({ message: 'No token provided' });
      }

      var user = await User.findOne({ where: { activationToken: token } });
      if (!user) {
        return res.status(400).json({ message: 'Invalid token' });
      }

      user.isActivated = true;
      user.activationToken = null;
      await user.save();

      res.status(200).json({ message: 'Account activated successfully' });
    } catch (error) {
      res.status(500).json({ message: 'Activation failed', error });
    }
  }
}

export default new UserController();
