import bcrypt from 'bcryptjs'
import cookieParser from 'cookie-parser'
import { Router } from 'express'
import jwt from 'jsonwebtoken'
import { LandingConfig } from '../config/config.types'
import { USERS } from '../mockdata'
import { createToken } from './utils'

export function createAuthRouter(config: LandingConfig) {
  const router = Router()

  router.use(cookieParser())

  router.post('/login', async (req, res) => {
    const { username, password } = req.body

    const { secretKey, refreshSecretKey, env } = config

    try {
      const user = USERS.find((u) => u.username === username)

      console.log('Attempting login for user:', username)

      if (!user) {
        console.error('User not found:', username)
        return res.status(401).json({ message: 'Invalid credentials' })
      }
      console.log('User found:', user.username)

      const isPasswordValid = await bcrypt.compare(password, user.password)
      if (!isPasswordValid) {
        console.error('Invalid password for user:', username)
        return res.status(401).json({ message: 'Invalid credentials' })
      }
      console.log('Password valid for user:', username)

      if (!refreshSecretKey || !secretKey) {
        return res.status(500).json({
          message:
            'Server misconfiguration: REFRESH_SECRET_KEY or SECRET_KEY missing',
        })
      }

      const accessToken = jwt.sign(
        { userId: user.id, username: user.username },
        secretKey,
        { expiresIn: '60m' }
      )
      if (!accessToken) {
        console.error('Failed to create access token for user:', username)
        return res
          .status(500)
          .json({ message: 'Failed to create access token' })
      }

      console.log('Access token created for user:', username)

      const refreshToken = jwt.sign(
        { userId: user.id, username: user.username },
        refreshSecretKey,
        { expiresIn: '7d' }
      )
      if (!refreshToken) {
        console.error('Failed to create refresh token for user:', username)
        return res
          .status(500)
          .json({ message: 'Failed to create refresh token' })
      }
      console.log('Refresh token created for user:', username)

      res.cookie('accessToken', accessToken, {
        httpOnly: false,
        secure: env === 'production',
        sameSite: 'strict',
        expires: new Date(Date.now() + 24 * 60 * 60 * 1000), // 1 day
      })

      res.cookie('refreshToken', refreshToken, {
        httpOnly: false,
        secure: env === 'production',
        sameSite: 'strict',
        expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 7 days
      })

      res.json({
        user,
        success: true,
      })
    } catch (error) {
      console.error('Error during login:', error)
      res.status(500).json({ message: 'Internal server error' })
    }
  })

  router.get('/verify', async (req, res) => {
    const { accessToken, refreshToken } = req.cookies
    const { secretKey, refreshSecretKey, env } = config

    if (!accessToken && !refreshToken) {
      return res.json({
        isAuthenticated: false,
        user: null,
      })
    }

    try {
      if (accessToken) {
        const decodedAccessToken = jwt.verify(accessToken, secretKey)

        if (
          typeof decodedAccessToken === 'object' &&
          decodedAccessToken !== null &&
          'userId' in decodedAccessToken &&
          'username' in decodedAccessToken
        ) {
          const user = USERS.find(
            (u) => u.username === decodedAccessToken.username
          )

          const newAccessToken = createToken(
            decodedAccessToken,
            15 * 60,
            secretKey
          )
          const newRefreshToken = createToken(
            decodedAccessToken,
            7 * 24 * 60 * 60 * 1000,
            refreshSecretKey
          )

          res.cookie('accessToken', newAccessToken, {
            httpOnly: false,
            secure: env === 'production',
            maxAge: 15 * 60 * 1000, // 15 минут
          })

          res.cookie('refreshToken', newRefreshToken, {
            httpOnly: false,
            secure: env === 'production',
            maxAge: 7 * 24 * 60 * 60 * 1000, // 7 дней
          })
          return res.json({
            isAuthenticated: true,
            user: user || null,
          })
        } else {
          return res
            .status(401)
            .json({ message: 'Invalid access token payload' })
        }
      }
    } catch (accessTokenError) {
      if (!refreshToken) {
        return res.status(403).json({ message: 'Refresh token missing' })
      }

      try {
        const decodedRefreshToken = jwt.verify(refreshToken, refreshSecretKey)
        if (
          typeof decodedRefreshToken === 'object' &&
          decodedRefreshToken !== null &&
          'userId' in decodedRefreshToken &&
          'username' in decodedRefreshToken
        ) {
          const user = USERS.find(
            (u) => u.username === decodedRefreshToken.username
          )

          const newAccessToken = createToken(
            decodedRefreshToken as jwt.JwtPayload,
            15 * 60,
            secretKey
          )

          const newRefreshToken = createToken(
            decodedRefreshToken as jwt.JwtPayload,
            7 * 24 * 60 * 60 * 1000,
            refreshSecretKey
          )

          res.cookie('accessToken', newAccessToken, {
            httpOnly: false,
            secure: env === 'production',
            maxAge: 15 * 60 * 1000, // 15 минут
          })

          res.cookie('refreshToken', newRefreshToken, {
            httpOnly: false,
            secure: env === 'production',
            maxAge: 7 * 24 * 60 * 60 * 1000, // 7 дней
          })

          return res.json({
            isAuthenticated: true,
            user: user || null,
          })
        }
      } catch (refreshTokenError) {
        return res.json({
          isAuthenticated: false,
          user: null,
        })
      }
    }
  })

  return router
}
