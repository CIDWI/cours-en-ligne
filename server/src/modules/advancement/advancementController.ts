import 'dotenv/config';
import {Router} from 'express';
import {createValidator} from 'express-joi-validation';
import Joi from 'joi';
import {expressjwt, Request as JWTRequest} from 'express-jwt';
import {advancementRepository} from './advancementRepository';
import {userRepository} from '../user/userRepository';
import {lessonRepository} from '../lesson/lessonRepository';

export const advancementController = Router();
const validator = createValidator();

// Middleware JWT
advancementController.use(
    expressjwt({
        secret: process.env.JWT_SECRET!,
        algorithms: ['HS256'],
    })
);

// JOI Schemas
const getAdvancementSchema = Joi.object({
    id: Joi.number().required(),
});

const createAdvancementSchema = Joi.object({
    userId: Joi.number().required(),
    lessonId: Joi.number().required(),
    isDone: Joi.boolean().required(),
});

const updateAdvancementSchema = Joi.object({
    isDone: Joi.boolean().required(),
});

//GET all advancements
advancementController.get('/', async (req: JWTRequest, res) => {
    if (req.auth?.role === "admin") {
        const advancements = await advancementRepository.find({
            relations: ['user', 'lesson'],
        });
        res.send(advancements);
    } else {
        const userId = req.auth?.id;
        const advancements = await advancementRepository.find({
            where: {user: {id: userId}},
            relations: ['user', 'lesson'],
        });
        res.send(advancements);
    }

});

//GET advancement by ID
advancementController.get('/:id', validator.params(getAdvancementSchema), async (req: JWTRequest, res) => {
    const id = Number(req.params.id);
    const advancement = await advancementRepository.findOne({
        where: {id},
        relations: ['user', 'lesson'],
    });
    if (req.auth?.role === "admin" || req.auth?.id === advancement?.lesson) {
        if (advancement) {
            res.send(advancement);
        } else {
            res.status(404).send({error: 'Advancement not found'});
        }
    }

});

//POST new advancement (admin only)
advancementController.post('/', validator.body(createAdvancementSchema), async (req: JWTRequest, res) => {
    try {

        const user = await userRepository.findOneBy({id: req.body.userId});
        const lesson = await lessonRepository.findOneBy({id: req.body.lessonId});


        if (!user || !lesson) {
            throw {status: 404, message: 'User or Lesson not found'};
        }

        if (req.auth?.role === 'admin' || user.id === req.auth?.id) {
            const advancement = await advancementRepository.save({
                user,
                lesson,
                isDone: req.body.isDone,
            });
            res.send(advancement);
        } else {
            throw {status: 404, message: 'User or Lesson not found'};
        }
    } catch (error: any) {
        res.status(error.status ?? 500).send({error: error.message ?? 'Internal Server Error'});
    }
});

//PUT update isDone (admin only)
advancementController.put('/:id', validator.params(getAdvancementSchema), validator.body(updateAdvancementSchema), async (req: JWTRequest, res) => {
    try {

        const id = Number(req.params.id);
        const advancement = await advancementRepository.findOne({
            where: {id},
            relations: ['user'],
        })

        if (advancement) {
            if (req.auth?.role === "admin" || advancement.user.id === req.auth?.id) {
                advancement.isDone = req.body.isDone;
                await advancementRepository.save(advancement);
                res.send(advancement);
            } else {
                throw {status: 404, message: 'Advancement not found'};
            }
        } else {
            throw {status: 404, message: 'Advancement not found'};
        }

    } catch (error: any) {
        res.status(error.status ?? 500).send({error: error.message ?? 'Internal Server Error'});
    }
});

//DELETE advancement (admin only)
advancementController.delete('/:id', validator.params(getAdvancementSchema), async (req: JWTRequest, res) => {
    try {
        if (req.auth?.role === 'admin') {
            const id = Number(req.params.id);
            const advancement = await advancementRepository.findOneBy({id});
            if (!advancement) {
                throw {status: 404, message: 'Advancement not found'};
            }

            await advancementRepository.delete({id});
            res.sendStatus(204);
        } else {
            throw {status: 403, message: 'Forbidden'};
        }
    } catch (error: any) {
        res.status(error.status ?? 500).send({error: error.message ?? 'Internal Server Error'});
    }
});
