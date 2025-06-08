import 'dotenv/config';
import { Router } from 'express';
import { courseRepository } from './courseRepository';
import { createValidator } from 'express-joi-validation';
import Joi from 'joi';
import {
    expressjwt,
    Request as JWTRequest,
} from 'express-jwt';

export const courseController = Router();
const validator = createValidator();

// Middleware JWT
courseController.use(
    expressjwt({
        secret: process.env.JWT_SECRET!,
        algorithms: ['HS256'],
    }),
);

// Joi Schemas
const createCourseSchema = Joi.object({
    title: Joi.string().required(),
});

const getCourseSchema = Joi.object({
    id: Joi.number().required(),
});

const updateCourseSchema = Joi.object({
    title: Joi.string().optional(),
});

// GET all courses
courseController.get('/', async (req: JWTRequest, res) => {

        res.send(await courseRepository.find({ relations: ['chapters'] }));

});

// GET one course by id
courseController.get('/:id', validator.params(getCourseSchema), async (req: JWTRequest, res) => {
        const id = Number(req.params.id);
        const course = await courseRepository.findOne({
            where: { id },
            relations: ['chapters'],
        });
        if (course) {
            res.send(course);

        }
        else {
            res.status(404).send({ error: 'Course not found' });
        }
    },
);

// CREATE course (admin only)
courseController.post('/', validator.body(createCourseSchema), async (req: JWTRequest, res) => {

    try {

        if (req.auth?.role === 'admin') {
            const course = await courseRepository.save({ title: req.body.title });
            res.send(course);
        }
        else {
            throw {status: 403, message: 'Forbidden'};
        }

    }
    catch (error: any) {
        res.status(error.status).send({error: error.message});
    }
    },
);

// UPDATE course (admin only)
courseController.put('/:id',validator.params(getCourseSchema), validator.body(updateCourseSchema), async (req: JWTRequest, res) => {
    try {
        if (req.auth?.role === 'admin') {
            const id = Number(req.params.id);
            const course = await courseRepository.findOneBy({ id });

            if (course) {
                if (req.body.title) {
                    course.title = req.body.title;
                    await courseRepository.save(course);
                    res.send(course);
                }
                else {
                    throw {status: 400, message: 'missing information to modify'};
                }

            }
            else {
                throw {status: 404, message: 'Course not found'};
            }
        }
        else {
            throw {status: 403, message: 'Forbidden'};
        }
    }
    catch (error: any) {
        res.status(error.status).send({error: error.message});
    }
    },
);

// DELETE course (admin only)
courseController.delete('/:id', validator.params(getCourseSchema), async (req: JWTRequest, res) => {
    try {
        if (req.auth?.role === 'admin') {
            const id = Number(req.params.id);
            const course = await courseRepository.findOne({
                where: { id },
                relations: ['chapters'],
            });
            if (course) {
                if (course.chapters.length === 0) {
                    await courseRepository.delete({ id });
                    res.sendStatus(204);
                }
                else {
                    throw {status: 400, message: 'Cannot delete course with chapters'};
                }

            }
            else {
                throw {status: 400, message: 'Course not found'};
            }


        }
        else {
            throw {status: 403, message: 'Forbidden'};
        }

    }
    catch (error: any) {
        res.status(error.status).send({error: error.message});
    }

    },
);
