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


courseController.get('/', async (req: JWTRequest, res) => {
        const courses = await courseRepository.find()
    res.send(courses)
})

//          GET ALL COURSES WITH DETAIL        //

courseController.get('/detail', async (req: JWTRequest, res) => {

    const courses = await courseRepository.find({
        relations: {
            chapters: {
                lessons: {
                    exercise: true,
                },
            },
        },
        order: {
            id: 'ASC',
            chapters: {
                id: 'ASC',
                lessons: {
                    id: 'ASC',
                },
            },
        },
    })
    res.send(courses)

})


//          GET COURSE BY ID          //

courseController.get('/:id', validator.params(getCourseSchema), async (req: JWTRequest, res) => {

    const id = Number(req.params.id)
    const course = await courseRepository.findOne({

        where: { id },
        relations: ['chapters']

    })

    if (course) {

        res.send(course)

    } else {

        res.status(404).send({ error: 'Course Not Found' })

    }
})

//          CREATE COURSE         //

courseController.post('/', validator.body(createCourseSchema), async (req: JWTRequest, res) => {

    try {

        if (req.auth?.role === 'admin') {

            const course = await courseRepository.save({ title: req.body.title })
            res.send(course)

        } else {

            throw { status: 403, message: 'Forbidden' }

        }

    } catch (error: any) {

        res.status(error.status || 500).send({ error: error.message || 'Internal Server Error' })

    }

})

//          UPDATE COURSE          //ben

courseController.put('/:id', validator.params(getCourseSchema), validator.body(updateCourseSchema), async (req: JWTRequest, res) => {

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

                    throw { status: 400, message: 'Missing Information To Modify' };

                }

            }

            else {

                throw { status: 404, message: 'Course Not Found' };

            }
        }

        else {

            throw { status: 403, message: 'Forbidden' };

        }
    }

    catch (error: any) {

        res.status(error.status || 500).send({ error: error.message || 'Internal Server Error' })

    }
})


//          DELETE COURSE BY ID         //ben


courseController.delete('/:id', validator.params(getCourseSchema), async (req: JWTRequest, res) => {

        try {

            if (req.auth?.role === 'admin') {

                const id = Number(req.params.id);
                const course = await courseRepository.findOne({

                    where: { id },
                    relations: ['chapters']

                });

                if (course) {

                    if (course.chapters.length === 0) {

                        await courseRepository.delete({ id });
                        res.sendStatus(204);

                    }

                    else {

                        throw { status: 400, message: 'Cannot Delete Course With Chapters' };

                    }

                }

                else {

                    throw { status: 400, message: 'Course Not Found' };

                }


            }

            else {

                throw { status: 403, message: 'Forbidden' };

            }

        }
        catch (error: any) {

            res.status(error.status || 500).send({ error: error.message || 'Internal Server Error' })

        }

    },
);
