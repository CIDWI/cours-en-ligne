import express from 'express'
import cors from 'cors'
import { AppDataSource } from './dataSource'
import { userController } from './modules/user/userController'
import { authController } from './modules/auth/authController'
import { courseController } from './modules/cours/courseController'
import { chapterController } from './modules/chapter/chapterController'
import { lessonController } from './modules/lesson/lessonController'
import { verifyToken } from './middleware/verifyToken'

const app = express()

// Middleware CORS
app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true
}))

// Middleware JSON
app.use(express.json())

// Route test
app.get('/', (req, res) => {
  res.send('Plop!')
})

// Routes publiques
app.use('/auth', authController)

// Routes protégées par JWT
app.use('/user', verifyToken, userController)
app.use('/course', verifyToken, courseController)
app.use('/chapter', verifyToken, chapterController)
app.use('/lesson', verifyToken, lessonController)

// Lancement du serveur
const port = process.env.PORT
  ? Number(process.env.PORT)
  : 3000

AppDataSource.initialize().then(() => {
  app.listen(port, () => {
    console.log(`Server started at http://localhost:${port}`)
  })
})
