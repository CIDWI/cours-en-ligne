import 'dotenv/config'

import {Router} from 'express'
import {userRepository} from './userRepository'
import {createValidator} from 'express-joi-validation'
import Joi from 'joi'
import {expressjwt, Request as JWTRequest,} from 'express-jwt'
import crypto from "crypto";
import {advancementRepository} from "../advancement/advancementRepository";

export const userController = Router()

const validator = createValidator()

// middleware
userController.use(
    expressjwt({
        secret: process.env.JWT_SECRET!,
        algorithms: ['HS256'],
    }),
)
const getUserSchema = Joi.object({
    id: Joi.number().required(),
})
const createUserSchema = Joi.object({
    login: Joi.string().required(),
    password: Joi.string().required(),
    role: Joi.string().optional(),
    firstName: Joi.string().required(),
    lastName: Joi.string().required(),
})
const updateUserSchema = Joi.object({
    login: Joi.string().optional(),
    password: Joi.string().optional(),
    firstName: Joi.string().optional(),
    lastName: Joi.string().optional(),
})

userController.get('/', async (req: JWTRequest, res) => {
    const role = req.auth?.role
    if (role == 'admin') {
        res.send(await userRepository.find())
    } else {
        res.sendStatus(403)
    }
})

userController.post(
    '/',
    validator.body(createUserSchema),
    async (req: JWTRequest, res) => {
        try {
            if (req.auth?.role === 'admin') {
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
                    firstName: req.body.firstName,
                    lastName: req.body.lastName,
                });

                // Envoie la réponse avec l'utilisateur sauvegardé
                res.send(savedUser);
            } else {
                throw {status: 403, message: 'Forbidden'};
            }

        } catch (error: any) {
            res.status(error.status).send({error: error.message});
        }
    }
);


userController.get(
    '/:id',
    validator.params(getUserSchema),
    async (req: JWTRequest, res) => {
        const id = Number(req.params.id)
        if (req.auth?.role === 'admin' || req.auth?.id === id) {
            const user = await userRepository.findOneBy({id});
            if (user) {
                res.send(user);
            } else {
                res.status(404).send({error: 'User not found'});
            }
        } else {
            res.sendStatus(403)
        }
    },
);

userController.put(
    '/:id',
    validator.params(getUserSchema), validator.body(updateUserSchema),
    async (req: JWTRequest, res) => {


        try {
            const id = Number(req.params.id)
            if (req.auth?.role === 'admin') {

                const userToUpdate = await userRepository.findOneBy({id})
                if (!userToUpdate) {
                    throw {status: 404, message: 'User not found'};
                }
                if (!req.body) {
                    throw {status: 400, message: 'missing information to modify'};
                } else {
                    if (req.body.password) {
                        const salt = process.env.SALT!
                        userToUpdate.password = crypto
                            .createHmac('sha256', salt)
                            .update(req.body.password)
                            .digest('hex')
                    }
                    if (req.body.login) {
                        userToUpdate.login = req.body.login
                    }
                    if (req.body.firstName) {
                        userToUpdate.firstName = req.body.firstName
                    }
                    if (req.body.lastName) {
                        userToUpdate.lastName = req.body.lastName
                    }
                    const updatedUser = await userRepository.update(req.params.id, {
                        login: userToUpdate.login,
                        password: userToUpdate.password,
                        firstName: userToUpdate.firstName,
                        lastName: userToUpdate.lastName,
                    });
                    res.send(userToUpdate);
                }
            } else {
                throw {status: 403, message: 'Forbidden'};
            }
        } catch (error: any) {
            res.status(error.status).send({error: error.message});
        }
    },
);
userController.delete(
    '/:id',
    validator.params(getUserSchema),
    async (req: JWTRequest, res) => {
        const id = Number(req.params.id)
        try {
            if (req.auth?.role === 'admin') {
                const user = await userRepository.findOneBy({id});
                if (!user) {
                    throw {status: 404, message: 'User not found'};
                }

                // Supprimer les avancements liés à l'utilisateur
                await advancementRepository.delete({user: {id}});

                // Supprimer l'utilisateur
                await userRepository.delete({id});

                res.sendStatus(204); // No Content
            } else {
                throw {status: 403, message: 'Forbidden'};
            }
        } catch (error: any) {
            res.status(error.status).send({error: error.message});
        }
    },
);




