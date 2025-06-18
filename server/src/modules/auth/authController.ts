import { Request, Response, Router } from 'express';
import { userRepository } from '../user/userRepository';
import Joi from 'joi';
import { createValidator } from 'express-joi-validation';
import jwt from 'jsonwebtoken';
import crypto from 'crypto';
import 'dotenv/config';

export const authController = Router();
const validator = createValidator();

const loginSchema = Joi.object({
  login: Joi.string().required(),
  password: Joi.string().required(),
});

authController.post(
  '/login',
  validator.body(loginSchema),
  async (req: Request, res: Response): Promise<void> => {
    const { login, password } = req.body;

    try {
      const user = await userRepository.findOneBy({ login });
      if (!user) {
        res.status(401).json({ message: 'Incorrect password or login' });
        return;
      }

      const salt = process.env.SALT!;
      const hashedPassword = crypto
        .createHmac('sha256', salt)
        .update(password)
        .digest('hex');

      if (hashedPassword !== user.password) {
        res.status(401).json({ message: 'Incorrect password or login' });
        return;
      }

      const token = jwt.sign(
        { id: user.id, role: user.role },
        process.env.JWT_SECRET!,
        { algorithm: 'HS256', expiresIn: '24h' }
      );

      res.json({
        token,
        user: {
          id: user.id,
          login: user.login,
          role: user.role,
          firstName: user.firstName,
          lastName: user.lastName,
        },
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal server error. Try again later' });
    }
  }
);
