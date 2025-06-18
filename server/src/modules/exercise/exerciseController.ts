import 'dotenv/config';
import { Router, Request, Response } from 'express';
import { createValidator } from 'express-joi-validation';
import Joi from 'joi';
import { expressjwt } from 'express-jwt';
import { exerciseRepository } from './exerciseRepository';
import { lessonRepository } from '../lesson/lessonRepository';
import { Exercise } from './exerciseEntity';

export const exerciseController = Router();
const validator = createValidator();

// Middleware JWT
exerciseController.use(
  expressjwt({
    secret: process.env.JWT_SECRET!,
    algorithms: ['HS256'],
  })
);

// Joi schemas
const getExerciseSchema = Joi.object({
  id: Joi.number().required(),
});

const createExerciseSchema = Joi.object({
  title: Joi.string().required(),
  imageLink: Joi.string().uri().required(),
  content: Joi.string().required(),
  lessonId: Joi.number().required(), // Leçon requise maintenant
});

const updateExerciseSchema = Joi.object({
  title: Joi.string().optional(),
  imageLink: Joi.string().uri().optional(),
  content: Joi.string().optional(),
});


// GET all exercises
exerciseController.get('/', async (req: Request, res: Response): Promise<void> => {
  const exercises = await exerciseRepository.find({ relations: ['lesson'] });
  res.send(exercises);
});

// GET exercise by ID
exerciseController.get('/:id', validator.params(getExerciseSchema), async (req: Request, res: Response): Promise<void> => {
  const id = Number(req.params.id);
  const exercise = await exerciseRepository.findOne({ where: { id }, relations: ['lesson'] });

  if (!exercise) {
    res.status(404).send({ error: 'Exercice non trouvé' });
    return;
  }

  res.send(exercise);
});

// POST new exercise (admin only)
exerciseController.post('/', validator.body(createExerciseSchema), async (req: Request, res: Response): Promise<void> => {
  try {
    const { title, imageLink, content, lessonId } = req.body;

    const lesson = await lessonRepository.findOneBy({ id: lessonId });
    if (!lesson) {
      res.status(400).send({ error: 'Leçon introuvable' });
      return;
    }

    const newExercise = new Exercise();
    newExercise.title = title;
    newExercise.imageLink = imageLink;
    newExercise.content = content;
    newExercise.lesson = lesson;

    const savedExercise = await exerciseRepository.save(newExercise);
    res.status(201).send(savedExercise);
  } catch (err) {
    console.error(err);
    res.status(500).send({ error: "Erreur interne lors de la création de l’exercice" });
  }
});

// PUT update exercise (admin only)
exerciseController.put('/:id',
  validator.params(getExerciseSchema),
  validator.body(updateExerciseSchema),
  async (req: Request, res: Response): Promise<void> => {
    try {
      const id = Number(req.params.id);
      const exercise = await exerciseRepository.findOneBy({ id });

      if (!exercise) {
        res.status(404).send({ error: 'Exercice non trouvé' });
        return;
      }

      const { title, imageLink, content } = req.body;

      if (title) exercise.title = title;
      if (imageLink) exercise.imageLink = imageLink;
      if (content) exercise.content = content;

      const updatedExercise = await exerciseRepository.save(exercise);
      res.send(updatedExercise);
    } catch (err) {
      console.error(err);
      res.status(500).send({ error: 'Erreur interne lors de la mise à jour de l’exercice' });
    }
  }
);

// DELETE exercise (admin only)
exerciseController.delete('/:id', validator.params(getExerciseSchema), async (req: Request, res: Response): Promise<void> => {
  try {
    const id = Number(req.params.id);
    const exercise = await exerciseRepository.findOneBy({ id });

    if (!exercise) {
      res.status(404).send({ error: 'Exercice non trouvé' });
      return;
    }

    await exerciseRepository.remove(exercise);
    res.sendStatus(204);
  } catch (err) {
    console.error(err);
    res.status(500).send({ error: 'Erreur interne lors de la suppression' });
  }
});
