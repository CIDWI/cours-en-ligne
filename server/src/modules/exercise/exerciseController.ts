import 'dotenv/config';
import {Router} from 'express';
import {createValidator} from 'express-joi-validation';
import Joi from 'joi';
import {expressjwt, Request as JWTRequest,} from 'express-jwt';
import {exerciseRepository} from "./exerciseRepository";

export const exerciseController = Router();
const validator = createValidator();

// Middleware JWT
exerciseController.use(
    expressjwt({
        secret: process.env.JWT_SECRET!,
        algorithms: ['HS256'],
    }),
);
const getExerciseSchema = Joi.object({
    id: Joi.number().required(),
});

const createExerciseSchema = Joi.object({
    title: Joi.string().required(),
    imageLink: Joi.string().uri().required(),
    content: Joi.string().required(),

});
const updateExerciseSchema = Joi.object({
    title: Joi.string().optional(),
    imageLink: Joi.string().uri().optional(),
    content: Joi.string().optional(),

});
// GET all exercises
exerciseController.get('/', async (req: JWTRequest, res) => {
    const exercises = await exerciseRepository.find()

    res.send(exercises);
});

// GET one exercise by ID
exerciseController.get('/:id', validator.params(getExerciseSchema), async (req: JWTRequest, res) => {
    const id = Number(req.params.id);
    const exercise = await exerciseRepository.findOneBy({id});
    if (exercise) {
        res.send(exercise);
    } else {
        res.status(404).send({error: 'exercise not found'});
    }
});
// POST exercise (admin only)
exerciseController.post('/', validator.body(createExerciseSchema), async (req: JWTRequest, res) => {
    try {
        if (req.auth?.role === 'admin') {
            const exercise = await exerciseRepository.save(req.body);
            res.send(exercise);
        } else {
            throw {status: 403, message: 'Forbidden'};
        }
    } catch (error: any) {
        res.status(error.status ?? 500).send({error: error.message ?? 'Internal Server Error'});
    }

});
//PUT exercise (admin only)
exerciseController.put(
    '/:id',
    validator.params(getExerciseSchema), // à adapter selon ton schéma
    validator.body(updateExerciseSchema),
    async (req: JWTRequest, res) => {
        try {
            if (req.auth?.role === 'admin') {
                const id = Number(req.params.id);
                const exercise = await exerciseRepository.findOneBy({id});

                if (exercise) {
                    if (req.body.title) {
                        exercise.title = req.body.title;
                    }

                    if (req.body.imageLink) {
                        exercise.imageLink = req.body.imageLink;
                    }

                    if (req.body.content) {
                        exercise.content = req.body.content;
                    }

                    await exerciseRepository.save(exercise);
                    res.send(exercise);
                } else {
                    throw {status: 404, message: 'Exercise not found'};
                }

            } else {
                throw {status: 403, message: 'Forbidden'};
            }
        } catch (error: any) {
            res.status(error.status ?? 500).send({error: error.message ?? 'Internal Server Error'});
        }
    }
);

// DELETE exercise (admin only)
exerciseController.delete('/:id', validator.params(getExerciseSchema), async (req: JWTRequest, res) => {
    try {
        if (req.auth?.role === 'admin') {
            const id = Number(req.params.id);
            const exercise = await exerciseRepository.findOneBy({id});
            if (exercise) {
                await exerciseRepository.delete({id});
            } else {
                throw {status: 404, message: 'Lesson not found'};
            }
            res.sendStatus(204);
        } else {
            throw {status: 403, message: 'Forbidden'};
        }
    } catch (error: any) {
        res.status(error.status || 500).send({error: error.message || 'Server error'});
    }
});
