import express from 'express'
import cors from 'cors'
import {AppDataSource} from './dataSource'
import {userController} from './modules/user/userController'
import {authController} from './modules/auth/authController'
import {courseController} from "./modules/cours/courseController";
import {chapterController} from "./modules/chapter/chapterController";
import {lessonController} from "./modules/lesson/lessonController";
import {exerciseController} from "./modules/exercise/exerciseController";
import {advancementController} from "./modules/advancement/advancementController";



const app = express()


app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true
}))

app.use(express.json())
app.get('/', (req, res) => {
    res.send('Plop!')
})

app.use('/user', userController)
app.use('/auth', authController)
app.use('/course', courseController)
app.use('/chapter', chapterController)
app.use('/lesson', lessonController)
app.use('/exercise', exerciseController)
app.use('/advancement', advancementController)
const port = process.env.PORT
    ? Number(process.env.PORT)
    : 3000
AppDataSource.initialize().then(() => {
    app.listen(port, () => {
        console.log(
            `Server started at http://localhost:${port}`,
        )
    })
})
