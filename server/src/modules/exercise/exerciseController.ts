import 'dotenv/config';
import { Router, Request, Response } from 'express';
import { createValidator } from 'express-joi-validation';
import Joi from 'joi';
import {expressjwt, Request as JWTRequest} from 'express-jwt';
import { exerciseRepository } from './exerciseRepository';
import { lessonRepository } from '../lesson/lessonRepository';
import { Exercise } from './exerciseEntity';
import {courseController} from "../cours/courseController";
import {chapterRepository} from "../chapter/chapterRepository";

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
    lessonId: Joi.number().required(),
});

const updateExerciseSchema = Joi.object({
    title: Joi.string().optional(),
    imageLink: Joi.string().uri().optional(),
    content: Joi.string().optional(),
    lessonId: Joi.number().optional(),
});


//            GET ALL EXERCISES            //
exerciseController.get('/', async (req: Request, res: Response) => {
    const exercises = await exerciseRepository.find({ relations: ['lesson'] });
    res.send(exercises);
});

//            GET EXERCISE BY ID          //ben
exerciseController.get('/:id', validator.params(getExerciseSchema), async (req: Request, res: Response)  => {
    const id = Number(req.params.id);
    const exercise = await exerciseRepository.findOne({ where: { id }, relations: ['lesson'] });

    if (exercise) {
        res.send(exercise);
    } else {
        res.status(404).send({ error: 'Exercise Not Found' });
    }


});

//             POST NEW EXERCISE             //ben
exerciseController.post('/', validator.body(createExerciseSchema), async (req: JWTRequest, res) => {
    try {
        if (req.auth?.role === 'admin') {


            const lesson = await lessonRepository.findOneBy({ id: req.body.lessonId });
            if (lesson) {
                const newExercise = new Exercise();
                newExercise.title = req.body.title;
                newExercise.imageLink = req.body.imageLink;
                newExercise.content = req.body.content;
                newExercise.lesson = lesson;

                const savedExercise = await exerciseRepository.save(newExercise);
                res.send(savedExercise);

            } else {
                res.status(404).send({ error: 'Lesson Not Found' });
            }


        } else {
            throw { status: 403, message: 'Forbidden' };
        }

    } catch (error:any) {
        res.status(error.status ?? 500).send({error: error.message ?? "Internal Server Error"});
    }
});

//            PUT EXERCISE           //ben
exerciseController.put('/:id',validator.params(getExerciseSchema),validator.body(updateExerciseSchema),async (req: JWTRequest, res ) => {
        try {
            if (req.auth?.role === 'admin') {
                const id = Number(req.params.id);
                const exercise = await exerciseRepository.findOneBy({ id });
                const lesson = await lessonRepository.findOne({ where: { id: req.body.lessonId }});

                if (exercise) {
                    if (req.body.title) {exercise.title = req.body.title}
                    if (req.body.imageLink) {exercise.imageLink = req.body.imageLink}
                    if (req.body.title) {exercise.content = req.body.content}
                    if (req.body.lessonId) {
                        if (lesson) {
                            exercise.lesson = lesson;
                        }
                        else {
                            throw { status: 404, message: 'Lesson Not Found' };
                        }
                    }

                    await exerciseRepository.save(exercise);
                    res.send(exercise);

                } else {
                    throw { status: 404, message: 'Exercise Not Found' };
                }




            } else {
                throw { status: 403, message: 'Forbidden' };
            }

        } catch (error:any) {
            res.status(error.status ?? 500).send({error: error.message ?? "Internal Server Error"});
        }
    }
);

//         DELETE EXERCISE     //ben
exerciseController.delete('/:id', validator.params(getExerciseSchema), async (req: JWTRequest, res )=> {
    try {
        if (req.auth?.role === 'admin') {
            const id = Number(req.params.id);
            const exercise = await exerciseRepository.findOneBy({ id });

            if (exercise) {
                await exerciseRepository.delete(exercise);
                res.sendStatus(204);
            } else {
                throw { status: 403, message: 'Exercise Not Found' };
            }


        } else {
            throw { status: 403, message: 'Forbidden' };
        }

    } catch (error:any) {
        res.status(error.status ?? 500).send({error: error.message ?? "Internal Server Error"});
    }
});
