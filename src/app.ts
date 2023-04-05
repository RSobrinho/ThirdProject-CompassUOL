import express from 'express'
import swaggerUi from 'swagger-ui-express'
import swaggerDocs from './swagger.json'
import mongoose from 'mongoose'
import BaseRouter from './routes/baseRouter'
import CarRouter from './routes/carRouter'
import ReserveRouter from './routes/reserveRouter'
import UserRouter from './routes/reserveRouter'
import { errorResponse } from './errors/handler'
import { config } from 'dotenv'
import { join } from 'path'

class App {
  public express: express.Application
  public constructor () {
    config()

    this.express = express()
    this.settings()
    this.middlewares()
    this.database()
    this.routes()
    this.errorMiddlewares()
  }

  private settings () {
    // this.express.set('view engine', 'pug')
    // this.express.set('views', join(__dirname, 'views'))
  }

  private middlewares () {
    this.express.use(express.json())
    this.express.use(express.static(join(__dirname, 'public')))
    this.express.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs))
  }

  private errorMiddlewares () {
    // this.express.use(errorLogging)
    this.express.use(errorResponse)
  }

  private database () {
    mongoose.set('strictQuery', false)
    mongoose
      .connect(process.env.DATABASE_URL as string)
      .then(() => console.log('DB connection established'))
  }

  private routes () {
    this.express.use('/', BaseRouter)
    this.express.use('/api/v1/cars', CarRouter)
    this.express.use('/api/v1/reserves', ReserveRouter)
    this.express.use('/api/v1/users', UserRouter)
  }
}

export default new App().express
