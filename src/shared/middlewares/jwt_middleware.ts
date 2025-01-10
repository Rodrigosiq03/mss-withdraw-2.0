/* eslint-disable @typescript-eslint/no-explicit-any */
import jwt from 'jsonwebtoken'
import { EntityError } from '../helpers/errors/domain_errors'

export function getUserFromToken(authorization: string) {
  const token = authorization.split(' ')[1]

  console.log('token', token)

  const decoded = jwt.decode(token) as any
  if (!decoded) {
    throw new EntityError('token')
  }

  return decoded.email
}
