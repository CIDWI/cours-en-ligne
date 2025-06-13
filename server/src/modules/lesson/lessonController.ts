import 'dotenv/config';
import {Router} from 'express';
import {lessonRepository} from './lessonRepository';
import {chapterRepository} from '../chapter/chapterRepository';
import {createValidator} from 'express-joi-validation';
import Joi from 'joi';
import {expressjwt, Request as JWTRequest,} from 'express-jwt';
import {exerciseRepository} from "../exercise/exerciseRepository";

export const lessonController = Router();
const validator = createValidator();

// Middleware JWT
lessonController.use(
    expressjwt({
        secret: process.env.JWT_SECRET!,
        algorithms: ['HS256'],
    }),
);

// Joi Schemas
const getLessonSchema = Joi.object({
    id: Joi.number().required(),
});

const createLessonSchema = Joi.object({
    title: Joi.string().required(),
    link: Joi.string().uri().required(),
    level: Joi.string().required(),
    languages: Joi.string().required(),
    chapterId: Joi.number().optional(),
    exerciseId: Joi.number().required(),
});

const updateLessonSchema = Joi.object({
    title: Joi.string().optional(),
    link: Joi.string().uri().optional(),
    level: Joi.string().optional(),
    languages: Joi.string().optional(),
    chapterId: Joi.number().optional(),
    exerciseId: Joi.number().optional(),
});

// GET all lessons
lessonController.get('/', async (req: JWTRequest, res) => {
    const lessons = await lessonRepository.find({relations: ['chapter', 'exercise']});
    res.send(lessons);
});

// GET one lesson by ID
lessonController.get('/:id', validator.params(getLessonSchema), async (req: JWTRequest, res) => {
    const id = Number(req.params.id);
    const lesson = await lessonRepository.findOne({
        where: {id},
        relations: ['chapter', 'exercise'],
    });
    if (lesson) {
        res.send(lesson);
    } else {
        res.status(404).send({error: 'Lesson not found'});
    }
});

// CREATE lesson (admin only)
lessonController.post('/', validator.body(createLessonSchema), async (req: JWTRequest, res) => {
    try {
        if (req.auth?.role === 'admin') {
            const chapter = await chapterRepository.findOneBy({id: req.body.chapterId});
            const exercise = await exerciseRepository.findOneBy({id: req.body.exerciseId});
            if (!exercise) {
                throw {status: 404, message: 'exercise not Found'};
            }
            let lesson;
            if (req.body.chapterId) {
                if (chapter) {
                    lesson = await lessonRepository.save({
                        title: req.body.title,
                        link: req.body.link,
                        level: req.body.level,
                        languages: req.body.languages,
                        chapter: chapter,
                        exercise: exercise,
                    });
                } else {
                    throw {status: 400, message: 'No chapter found'};
                }
            } else {
                lesson = await lessonRepository.save({
                    title: req.body.title,
                    link: req.body.link,
                    level: req.body.level,
                    languages: req.body.languages,
                    exercise: exercise,
                });
            }
            res.send(lesson);
        } else {
            throw {status: 403, message: 'Forbidden'};
        }
    } catch (error: any) {
        res.status(error.status ?? 500).send({error: error.message ?? "Internal Server Error"});
    }
});

// UPDATE lesson (admin only)
lessonController.put('/:id', validator.params(getLessonSchema), validator.body(updateLessonSchema), async (req: JWTRequest, res) => {
        try {
            if (req.auth?.role === 'admin') {
                const id = Number(req.params.id);
                const lesson = await lessonRepository.findOneBy({id});
                const chapter = await chapterRepository.findOneBy({id: req.body.chapterId});
                const exercise = await exerciseRepository.findOneBy({id: req.body.exerciseId});

                if (lesson) {
                    if (req.body.chapterId) {
                        if (!chapter) {
                            throw {status: 404, message: 'Chapter not found'};
                        } else {
                            lesson.chapter = chapter;
                        }
                    }
                    if (req.body.exerciseId) {
                        if (!exercise) {
                            throw {status: 404, message: 'Exercise not found'};
                        } else {
                            lesson.exercise = exercise;
                        }
                    }
                    if (req.body.title) {
                        lesson.title = req.body.title;
                    }
                    if (req.body.link) {
                        lesson.link = req.body.link;
                    }
                    if (req.body.level) {
                        lesson.level = req.body.level;
                    }
                    if (req.body.languages) {
                        lesson.languages = req.body.languages;
                    }

                    await lessonRepository.save(lesson);
                    res.send(lesson);

                } else {
                    throw {status: 404, message: 'Lesson not found'};
                }
            } else {
                throw {status: 403, message: 'Forbidden'};
            }
        } catch (error: any) {
            res.status(error.status ?? 500).send({error: error.message ?? 'Internal Server Error'});
        }
    }
);

// DELETE lesson (admin only)
lessonController.delete('/:id', validator.params(getLessonSchema), async (req: JWTRequest, res) => {
    try {
        if (req.auth?.role === 'admin') {
            const id = Number(req.params.id);
            const lesson = await lessonRepository.findOne({
                where: {id: id},
                relations: ['exercise'],
            });

            if (lesson) {
                await lessonRepository.delete({id});
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
