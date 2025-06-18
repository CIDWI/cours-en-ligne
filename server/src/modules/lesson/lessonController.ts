import 'dotenv/config'
import { Router, Response } from 'express'
import { createValidator } from 'express-joi-validation'
import Joi from 'joi'
import { expressjwt, Request as JWTRequest } from 'express-jwt'
import { lessonRepository } from './lessonRepository'
import { chapterRepository } from '../chapter/chapterRepository'

export const lessonController = Router()
const validator = createValidator()

// Middleware JWT
lessonController.use(
  expressjwt({
    secret: process.env.JWT_SECRET!,
    algorithms: ['HS256'],
  })
)

// JOI schemas
const getLessonSchema = Joi.object({
  id: Joi.number().required(),
})

const createLessonSchema = Joi.object({
  title: Joi.string().required(),
  link: Joi.string().uri().required(),
  level: Joi.string().required(),
  languages: Joi.string().required(),
  chapterId: Joi.number().required(),
})

const updateLessonSchema = Joi.object({
  title: Joi.string().optional(),
  link: Joi.string().uri().optional(),
  level: Joi.string().optional(),
  languages: Joi.string().optional(),
})

// GET all lessons
lessonController.get('/', async (req: JWTRequest, res: Response): Promise<void> => {
  try {
    const lessons = await lessonRepository.find({ relations: ['chapter'] })
    res.send(lessons)
  } catch {
    res.status(500).send({ error: 'Erreur lors de la récupération des leçons' })
  }
})

// GET one lesson
lessonController.get('/:id', validator.params(getLessonSchema), async (req: JWTRequest, res: Response): Promise<void> => {
  try {
    const id = Number(req.params.id)
    const lesson = await lessonRepository.findOne({ where: { id }, relations: ['chapter'] })
    if (!lesson) {
      res.status(404).send({ error: 'Leçon non trouvée' })
      return
    }
    res.send(lesson)
  } catch {
    res.status(500).send({ error: 'Erreur serveur' })
  }
})

// POST lesson
lessonController.post('/', validator.body(createLessonSchema), async (req: JWTRequest, res: Response): Promise<void> => {
  try {
    if (req.auth?.role !== 'admin') {
      res.status(403).send({ error: 'Accès interdit' })
      return
    }

    const chapter = await chapterRepository.findOneBy({ id: req.body.chapterId })
    if (!chapter) {
      res.status(404).send({ error: 'Chapitre introuvable' })
      return
    }

    const newLesson = lessonRepository.create({
      title: req.body.title,
      link: req.body.link,
      level: req.body.level,
      languages: req.body.languages,
      chapter,
    })

    await lessonRepository.save(newLesson)
    res.send(newLesson)
  } catch {
    res.status(500).send({ error: 'Erreur lors de la création de la leçon' })
  }
})

// PUT lesson
lessonController.put(
  '/:id',
  validator.params(getLessonSchema),
  validator.body(updateLessonSchema),
  async (req: JWTRequest, res: Response): Promise<void> => {
    try {
      if (req.auth?.role !== 'admin') {
        res.status(403).send({ error: 'Accès interdit' })
        return
      }

      const id = Number(req.params.id)
      const lesson = await lessonRepository.findOneBy({ id })

      if (!lesson) {
        res.status(404).send({ error: 'Leçon non trouvée' })
        return
      }

      if (req.body.title) lesson.title = req.body.title
      if (req.body.link) lesson.link = req.body.link
      if (req.body.level) lesson.level = req.body.level
      if (req.body.languages) lesson.languages = req.body.languages

      await lessonRepository.save(lesson)
      res.send(lesson)
    } catch {
      res.status(500).send({ error: 'Erreur lors de la mise à jour de la leçon' })
    }
  }
)

// DELETE lesson
lessonController.delete('/:id', validator.params(getLessonSchema), async (req: JWTRequest, res: Response): Promise<void> => {
  try {
    if (req.auth?.role !== 'admin') {
      res.status(403).send({ error: 'Accès interdit' })
      return
    }

    const id = Number(req.params.id)
    const lesson = await lessonRepository.findOneBy({ id })

    if (!lesson) {
      res.status(404).send({ error: 'Leçon non trouvée' })
      return
    }

    await lessonRepository.remove(lesson)
    res.sendStatus(204)
  } catch {
    res.status(500).send({ error: 'Erreur lors de la suppression de la leçon' })
  }
})
