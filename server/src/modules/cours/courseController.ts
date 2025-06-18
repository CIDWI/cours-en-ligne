import 'dotenv/config'
import { Router } from 'express'
import { courseRepository } from './courseRepository'
import { createValidator } from 'express-joi-validation'
import Joi from 'joi'
import {
  expressjwt,
  Request as JWTRequest,
} from 'express-jwt'

export const courseController = Router()
const validator = createValidator()

// Middleware JWT
courseController.use(
  expressjwt({
    secret: process.env.JWT_SECRET!,
    algorithms: ['HS256'],
  })
)

// Joi Schemas
const createCourseSchema = Joi.object({
  title: Joi.string().required(),
})

const getCourseSchema = Joi.object({
  id: Joi.number().required(),
})

const updateCourseSchema = Joi.object({
  title: Joi.string().optional(),
})

// GET all courses (with chapters only)
courseController.get('/', async (req: JWTRequest, res) => {
  const courses = await courseRepository.find({
    relations: ['chapters'],
  })
  res.send(courses)
})

// GET full course tree (with chapters > lessons > exercise)
courseController.get('/with-lessons/:userId', async (req: JWTRequest, res) => {
  try {
    const courses = await courseRepository.find({
      relations: {
        chapters: {
          lessons: {
            exercise: true,
          },
        },
      },
      order: {
        title: 'ASC',
        chapters: {
          title: 'ASC',
          lessons: {
            title: 'ASC',
          },
        },
      },
    })
    res.json(courses)
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: 'Erreur lors du chargement des cours' })
  }
})

// GET one course by id
courseController.get('/:id', validator.params(getCourseSchema), async (req: JWTRequest, res) => {
  const id = Number(req.params.id)
  const course = await courseRepository.findOne({
    where: { id },
    relations: ['chapters'],
  })
  if (course) {
    res.send(course)
  } else {
    res.status(404).send({ error: 'Course not found' })
  }
})

// CREATE course (admin only)
courseController.post('/', validator.body(createCourseSchema), async (req: JWTRequest, res) => {
  try {
    if (req.auth?.role === 'admin') {
      const course = await courseRepository.save({ title: req.body.title })
      res.send(course)
    } else {
      throw { status: 403, message: 'Forbidden' }
    }
  } catch (error: any) {
    res.status(error.status || 500).send({ error: error.message || 'Internal error' })
  }
})

// UPDATE course (admin only)
courseController.put(
  '/:id',
  validator.params(getCourseSchema),
  validator.body(updateCourseSchema),
  async (req: JWTRequest, res) => {
    try {
      if (req.auth?.role === 'admin') {
        const id = Number(req.params.id)
        const course = await courseRepository.findOneBy({ id })

        if (!course) throw { status: 404, message: 'Course not found' }

        if (!req.body.title) throw { status: 400, message: 'Missing title to modify' }

        course.title = req.body.title
        await courseRepository.save(course)
        res.send(course)
      } else {
        throw { status: 403, message: 'Forbidden' }
      }
    } catch (error: any) {
      res.status(error.status || 500).send({ error: error.message || 'Internal error' })
    }
  }
)

// DELETE course (admin only, only if no chapters)
courseController.delete('/:id', validator.params(getCourseSchema), async (req: JWTRequest, res) => {
  try {
    if (req.auth?.role === 'admin') {
      const id = Number(req.params.id)
      const course = await courseRepository.findOne({
        where: { id },
        relations: ['chapters'],
      })

      if (!course) throw { status: 404, message: 'Course not found' }

      if (course.chapters.length > 0) {
        throw { status: 400, message: 'Cannot delete course with chapters' }
      }

      await courseRepository.delete({ id })
      res.sendStatus(204)
    } else {
      throw { status: 403, message: 'Forbidden' }
    }
  } catch (error: any) {
    res.status(error.status || 500).send({ error: error.message || 'Internal error' })
  }
})
