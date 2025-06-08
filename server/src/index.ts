import express from 'express'
import { AppDataSource } from './dataSource'
import { userController } from './modules/user/userController'
import { authController } from './modules/auth/authController'
import {courseController} from "./modules/cours/courseController";

const app = express()

app.use(express.json())
app.get('/', (req, res) => {
  res.send('Plop!')
})

app.use('/users', userController)
app.use('/auth', authController)
app.use('/course', courseController)

const port = process.env.PORT
  ? Number(process.env.PORT)
  : 3000
AppDataSource.initialize().then(() => {
  app.listen(port, '0.0.0.0', () => {
    console.log(
      `Server started at http://localhost:${port}`,
    )
  })
})
