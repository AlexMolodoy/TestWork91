import jwt from 'jsonwebtoken'

export function createToken(
  decodedToken: jwt.JwtPayload,
  expiresIn: number,
  secretKey: jwt.Secret
) {
  const newToken = jwt.sign(
    {
      userId: decodedToken.userId,
      username: decodedToken.username,
    },
    secretKey,
    { expiresIn }
  )

  return newToken
}
