import 'dotenv/config';
import {Router} from 'express';
import {chapterRepository} from './chapterRepository';
import {createValidator} from 'express-joi-validation';
import Joi from 'joi';
import {expressjwt, Request as JWTRequest,} from 'express-jwt';
import {courseRepository} from "../cours/courseRepository";


export const chapterController = Router();
const validator = createValidator();

// Middleware JWT
chapterController.use(
    expressjwt({
        secret: process.env.JWT_SECRET!,
        algorithms: ['HS256'],
    }),
);

// Joi Schemas
const createChapterSchema = Joi.object({
    title: Joi.string().required(),
    courseId: Joi.number().optional(),
});

const getChapterSchema = Joi.object({
    id: Joi.number().required(),
});

const updateChapterSchema = Joi.object({
    title: Joi.string().optional(),
    courseId: Joi.number().optional(),
});

// GET all courses
chapterController.get('/', async (req: JWTRequest, res) => {

    res.send(await chapterRepository.find({relations: ['lessons']}));

});

// GET one course by id
chapterController.get('/:id', validator.params(getChapterSchema), async (req: JWTRequest, res) => {
        const id = Number(req.params.id);
        const chapter = await chapterRepository.findOne({
            where: {id},
            relations: ['lessons'],
        });
        if (chapter) {
            res.send(chapter);

        } else {
            res.status(404).send({error: 'Chapter not found'});
        }
    },
);

// CREATE course (admin only)
chapterController.post('/', validator.body(createChapterSchema), async (req: JWTRequest, res) => {

        try {

            if (req.auth?.role === 'admin') {
                const course = await courseRepository.findOne({where: {id: req.body.courseId}, relations: ['chapters']});
                let chapter;
                if (req.body.courseId) {
                    if (course) {
                        chapter = await chapterRepository.save({
                            title: req.body.title,
                            course: course
                        });
                    } else {
                        throw {status: 400, message: 'Course not found'};
                    }
                } else {
                    chapter = await chapterRepository.save({
                        title: req.body.title,
                    });
                }


                res.send(chapter);
            } else {
                throw {status: 403, message: 'Forbidden'};
            }

        } catch (error: any) {
            res.status(error.status ?? 500).send({error: error.message ?? "Internal Server Error"});
        }
    },
);

// UPDATE course (admin only)
chapterController.put('/:id', validator.params(getChapterSchema), validator.body(updateChapterSchema), async (req: JWTRequest, res) => {
        try {
            if (req.auth?.role === 'admin') {
                const id = Number(req.params.id);
                const chapter = await chapterRepository.findOneBy({id});
                const course = await courseRepository.findOne({where: {id: req.body.courseId}, relations: ['chapters']});

                if (chapter) {
                    if (req.body.title) {
                        if (req.body.courseId) {
                            if (!course) {
                                throw {status: 404, message: 'Course not found'};
                            } else {
                                chapter.course = course
                            }
                        }
                        chapter.title = req.body.title;

                        await chapterRepository.save(chapter);
                        res.send(chapter);
                    } else {
                        throw {status: 400, message: 'Missing information to modify'};
                    }

                } else {
                    throw {status: 404, message: 'Chapter not found'};
                }
            } else {
                throw {status: 403, message: 'Forbidden'};
            }
        } catch (error: any) {
            res.status(error.status ?? 500).send({error: error.message ?? "Internal Server Error"});
        }
    },
);

// DELETE course (admin only)
chapterController.delete('/:id', validator.params(getChapterSchema), async (req: JWTRequest, res) => {
        try {
            if (req.auth?.role === 'admin') {
                const id = Number(req.params.id);
                const chapter = await chapterRepository.findOne({
                    where: {id},
                    relations: ['lessons'],
                });
                if (chapter) {
                    if (chapter.lessons.length === 0) {
                        await chapterRepository.delete({id});
                        res.sendStatus(204);
                    } else {
                        throw {status: 400, message: 'Cannot delete chapter with lessons'};
                    }

                } else {
                    throw {status: 400, message: 'Chapter not found'};
                }


            } else {
                throw {status: 403, message: 'Forbidden'};
            }

        } catch (error: any) {
            res.status(error.status ?? 500).send({error: error.message ?? "Internal Server Error"});
        }

    },
);
