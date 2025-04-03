import 'dotenv/config'

import { Router } from 'express'
import { userRepository } from './userRepository'
import { createValidator } from 'express-joi-validation'
import Joi from 'joi'
import {
  expressjwt,
  Request as JWTRequest,
} from 'express-jwt'
import crypto from "crypto";

export const userController = Router()

const validator = createValidator()

// middleware
userController.use(
  expressjwt({
    secret: process.env.JWT_SECRET!,
    algorithms: ['HS256'],
  }),
)

userController.get('/', async (req: JWTRequest, res) => {
    const role = req.auth?.role
    if (role == 'admin') {
        res.send(await userRepository.find())
    } else {
        res.sendStatus(403)
    }
})

const createUserSchema = Joi.object({
    login: Joi.string().required(),
    password: Joi.string().required(),
    role: Joi.string().optional(),
})
userController.post(
    '/',
    validator.body(createUserSchema),
    async (req, res) => {
        try {
            //céation du salt avec le.env
            const salt = process.env.SALT!;

            // Hacher le mot de passe avec SHA-256 et ajouter le salt
            const hashedPassword = crypto
                .createHmac('sha256', salt)
                .update(req.body.password)
                .digest('hex');

            // Sauvegarder l'utilisateur avec le mot de passe haché et le salt
            const savedUser = await userRepository.save({
                login: req.body.login,
                password: hashedPassword, // Utilise le mot de passe haché ici
                role: req.body.role ?? 'user',
            });

            // Envoie la réponse avec l'utilisateur sauvegardé
            res.send(savedUser);
        } catch (error:any) {
            res.status(400).send({
                error: error.message,
                detail: error.detail,
            });
        }
    }
);

const  getUserSchema = Joi.object({
  id: Joi.number().required(),
})
userController.get(
  '/:id',
  validator.params(getUserSchema),
  async (req: JWTRequest, res) => {
    const id = Number(req.params.id)
    if (req.auth?.role === 'admin' || req.auth?.id === id) {
      res.send(
        await userRepository.findOneBy({
          id,
        }),
      )
    } else {
      res.sendStatus(403)
    }
  },
)
