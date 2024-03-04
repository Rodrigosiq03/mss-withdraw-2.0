/* eslint-disable @typescript-eslint/no-explicit-any */
import jwt from 'jsonwebtoken'
import { EntityError } from '../helpers/errors/domain_errors'

import envs from '../../../'

export function getUserFromToken(authorization: string) {
  const token = authorization.split(' ')[1]

  console.log('token', token)

  const decoded = jwt.verify(token, envs.JWT_SECRET) as any
  if (!decoded) {
    throw new EntityError('token')
  }

  if (decoded.role === 'EMPLOYEE' || decoded.role === 'ADMIN') {
    return decoded
  }

  const user = JSON.parse(decoded.user)
  return user
}
