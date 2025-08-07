import bodyParser from 'body-parser'
import cors from 'cors'
import express from 'express'

import { NextFunction, Request, Response } from 'express'
import { getConfig, readConfig } from './config/config.actions'
import { authRouter } from './routes/routes'

export const initApp = async () => {
  await readConfig()

  const config = getConfig()

  const app = express()

  app.use(bodyParser.json())
  app.use(
    cors({
      origin: config.corsOrigin,
      credentials: true,
    })
  )
  app.use('/api', authRouter(config))

  app.use((err: any, req: Request, res: Response, next: NextFunction) => {
    console.error(err.stack)
    res.status(500).json({ message: 'Something went wrong!' })
  })

  const PORT = config.port || 5000
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
  })
}

initApp()
