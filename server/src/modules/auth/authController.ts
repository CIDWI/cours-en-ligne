import { Router } from 'express'
import { userRepository } from '../user/userRepository'
import { createValidator } from 'express-joi-validation'
import Joi from 'joi'
import jwt from 'jsonwebtoken'
import crypto from "crypto";

export const authController = Router()
const validator = createValidator()

const loginSchema = Joi.object({
  login: Joi.string().required(),
  password: Joi.string().required(),
})

authController.post(
    '/login',
    validator.body(loginSchema),
    async (req, res) => {
        try {
            // Récupérer l'utilisateur depuis la base de données
            const user = await userRepository.findOneBy({
                login: req.body.login,
            });

            // Vérifier si l'utilisateur existe et si le mot de passe correspond
            if (user) {
                // Récupérer le salt stocké dans la base de données
                const storedSalt = process.env.SALT!;

                // Hacher le mot de passe fourni avec le salt stocké
                const hashedPasswordAttempt = crypto
                    .createHmac('sha256', storedSalt)
                    .update(req.body.password)
                    .digest('hex');
                // Comparer le mot de passe haché avec celui stocké dans la base de données
                if (hashedPasswordAttempt === user.password) {
                    // Créer le token JWT si les mots de passe correspondent
                    const token = jwt.sign(
                        {
                            id: user.id,
                            role: user.role,
                        },
                        process.env.JWT_SECRET!,
                        {
                            algorithm: 'HS256',
                        }
                    );

                    res.send({
                        token,
                    });
                } else {
                    res.sendStatus(401); // Mot de passe incorrect
                }
            } else {
                res.sendStatus(401); // Utilisateur non trouvé
            }
        } catch (error:any) {
            res.status(400).send({
                error: error.message,
                detail: error.detail,
            });
        }
    }
);
