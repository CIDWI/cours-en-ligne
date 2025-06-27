import 'dotenv/config'
import { Router, Response } from 'express'
import { createValidator } from 'express-joi-validation'
import Joi from 'joi'
import { expressjwt, Request as JWTRequest } from 'express-jwt'
import { lessonRepository } from './lessonRepository'
import { chapterRepository } from '../chapter/chapterRepository'
import {courseRepository} from "../cours/courseRepository";

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
//ben
const updateLessonSchema = Joi.object({
    title: Joi.string().optional(),
    link: Joi.string().uri().optional(),
    level: Joi.string().optional(),
    languages: Joi.string().optional(),
    chapterId: Joi.number().optional(),
})

//            GET ALL LESSONS            //ben
lessonController.get('/', async (req: JWTRequest, res: Response): Promise<void> => {
        const lessons = await lessonRepository.find({ relations: ['chapter'] })
        res.send(lessons)
})

//            GET ONE LESSON            //ben
lessonController.get('/:id', validator.params(getLessonSchema), async (req: JWTRequest, res: Response): Promise<void> => {
    try {
        const id = Number(req.params.id)
        const lesson = await lessonRepository.findOne({ where: { id }, relations: ['chapter'] })
        if (lesson) {

            res.send(lesson)
        } else {
            throw { status: 404, message: 'Lesson Not Found' };
        }

    } catch(error:any) {
        res.status(error.status ?? 500).send({error: error.message ?? "Internal Server Error"});
    }
})

//          POST LESSON         //ben
lessonController.post('/', validator.body(createLessonSchema), async (req: JWTRequest, res: Response): Promise<void> => {
    try {
        if (req.auth?.role === 'admin') {
            const chapter = await chapterRepository.findOneBy({ id: req.body.chapterId })
            if (chapter) {

                const newLesson = lessonRepository.create({
                    title: req.body.title,
                    link: req.body.link,
                    level: req.body.level,
                    languages: req.body.languages,
                    chapter,
                })

                await lessonRepository.save(newLesson)
                res.send(newLesson)
            } else {
                throw { status: 404, message: 'Chapter Not Found' };
            }

        }else {
            throw { status: 403, message: 'Forbidden' };
        }


    } catch(error:any) {
        res.status(error.status ?? 500).send({error: error.message ?? "Internal Server Error"});
    }
})

//              PUT LESSON               //ben
lessonController.put('/:id',validator.params(getLessonSchema),validator.body(updateLessonSchema),async (req: JWTRequest, res: Response): Promise<void> => {
        try {
            if (req.auth?.role === 'admin') {
                const id = Number(req.params.id)
                const lesson = await lessonRepository.findOneBy({ id })
                const chapter = await chapterRepository.findOne({ where: { id: req.body.chapterId }, relations: ['lessons'] });

                if (lesson) {

                    if (req.body.title) {lesson.title = req.body.title}
                    if (req.body.link) {lesson.link = req.body.link}
                    if (req.body.level) {lesson.level = req.body.level}
                    if (req.body.languages) {lesson.languages = req.body.languages}
                    if (req.body.chapterId){
                        if (chapter){
                            lesson.chapter = chapter
                        }  else {
                            throw { status: 404, message: 'Chapter Not Found' };
                        }
                    }


                    await lessonRepository.save(lesson)
                    res.send(lesson)
                } else {
                    throw { status: 404, message: 'Lesson Not Found' };
                }



            } else {
                throw { status: 403, message: 'Forbidden' };
            }


        } catch(error:any) {
            res.status(error.status ?? 500).send({error: error.message ?? "Internal Server Error"});
        }
    }
)

//             DELETE LESSON             //ben

lessonController.delete('/:id', validator.params(getLessonSchema), async (req: JWTRequest, res) => {

    try {

        if (req.auth?.role === 'admin') {

            const id = Number(req.params.id);
            const lesson = await lessonRepository.findOne({
                where: {id: id}
            });

            if (lesson) {

                await lessonRepository.delete({ id });

            } else {

                throw {status: 404, message: 'Lesson not found'};
            }

            res.sendStatus(204);

        } else {

            throw { status: 403, message: 'Forbidden' };

        }

    } catch (error: any) {

        res.status(error.status || 500).send({ error: error.message || 'Server error' });

    }
});
