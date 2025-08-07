import { Router } from 'express'
import { LandingConfig } from '../config/config.types'
import { createAuthRouter } from './auth'

export const authRouter = (config: LandingConfig) => {
  const apiRouter = Router()

  apiRouter.use('/auth', createAuthRouter(config))

  return apiRouter
}
