/* eslint-disable @typescript-eslint/no-explicit-any */
import jwt from 'jsonwebtoken'
import { HttpRequest } from '../helpers/external_interfaces/http_models'

export function getNameAndRaFromToken(request: HttpRequest) {
  const token = request.headers.authorization.split(' ')[1]

  const decoded = jwt.decode(token) as any
  if (!decoded) {
    throw new Error('Invalid token')
  }

  const user = JSON.parse(decoded.user)
  return user
}
