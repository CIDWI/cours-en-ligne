import 'dotenv/config'
import { Router } from 'express'
import { userRepository } from './userRepository'
import { advancementRepository } from '../advancement/advancementRepository'
import { createValidator } from 'express-joi-validation'
import Joi from 'joi'
import { expressjwt, Request as JWTRequest } from 'express-jwt'
import crypto from 'crypto'

export const userController = Router()
const validator = createValidator()

// Middleware JWT
userController.use(
  expressjwt({
    secret: process.env.JWT_SECRET!,
    algorithms: ['HS256'],
  })
)

// Joi Schemas
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

// GET all users (admin only)
userController.get('/', async (req: JWTRequest, res) => {
  if (req.auth?.role === 'admin') {
    res.send(await userRepository.find())
  } else {
    res.sendStatus(403)
  }
})

// CREATE user (admin only)
userController.post('/', validator.body(createUserSchema), async (req: JWTRequest, res) => {
  try {
    if (req.auth?.role === 'admin') {
      const salt = process.env.SALT!
      const hashedPassword = crypto
        .createHmac('sha256', salt)
        .update(req.body.password)
        .digest('hex')

      const savedUser = await userRepository.save({
        login: req.body.login,
        password: hashedPassword,
        role: req.body.role ?? 'user',
        firstName: req.body.firstName,
        lastName: req.body.lastName,
      })

      res.send(savedUser)
    } else {
      throw { status: 403, message: 'Forbidden' }
    }
  } catch (error: any) {
    res.status(error.status || 500).send({ error: error.message || 'Internal error' })
  }
})

// GET one user by id (self or admin) ✅ rôle renvoyé ici
userController.get('/:id', validator.params(getUserSchema), async (req: JWTRequest, res) => {
  const id = Number(req.params.id)

  if (req.auth?.role === 'admin' || req.auth?.id === id) {
    const user = await userRepository.findOneBy({ id })

    if (user) {
      res.send(user) // 👈 contient bien role, firstName, lastName, etc.
    } else {
      res.status(404).send({ error: 'User not found' })
    }
  } else {
    res.sendStatus(403)
  }
})

// UPDATE user (admin only)
userController.put(
  '/:id',
  validator.params(getUserSchema),
  validator.body(updateUserSchema),
  async (req: JWTRequest, res) => {
    try {
      const id = Number(req.params.id)

      if (req.auth?.role !== 'admin') {
        throw { status: 403, message: 'Forbidden' }
      }

      const userToUpdate = await userRepository.findOneBy({ id })
      if (!userToUpdate) {
        throw { status: 404, message: 'User not found' }
      }

      if (req.body.password) {
        const salt = process.env.SALT!
        userToUpdate.password = crypto
          .createHmac('sha256', salt)
          .update(req.body.password)
          .digest('hex')
      }

      if (req.body.login) userToUpdate.login = req.body.login
      if (req.body.firstName) userToUpdate.firstName = req.body.firstName
      if (req.body.lastName) userToUpdate.lastName = req.body.lastName

      await userRepository.save(userToUpdate)
      res.send(userToUpdate)
    } catch (error: any) {
      res.status(error.status || 500).send({ error: error.message || 'Internal error' })
    }
  }
)

// DELETE user (admin only)
userController.delete('/:id', validator.params(getUserSchema), async (req: JWTRequest, res) => {
  try {
    const id = Number(req.params.id)

    if (req.auth?.role !== 'admin') {
      throw { status: 403, message: 'Forbidden' }
    }

    const user = await userRepository.findOneBy({ id })
    if (!user) {
      throw { status: 404, message: 'User not found' }
    }

    await advancementRepository.delete({ user: { id } })
    await userRepository.delete({ id })

    res.sendStatus(204)
  } catch (error: any) {
    res.status(error.status || 500).send({ error: error.message || 'Internal error' })
  }
})
