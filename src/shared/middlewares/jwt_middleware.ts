/* eslint-disable @typescript-eslint/no-explicit-any */
import jwt from 'jsonwebtoken'
import { EntityError } from '../helpers/errors/domain_errors'

// export function getUserFromToken(authorization: string) {
//   const token = authorization.split(' ')[1]

//   console.log('token', token)

//   const decoded = jwt.decode(token) as any
//   if (!decoded) {
//     throw new EntityError('token')
//   }

//   return decoded.email
// }


export function getUserFromToken(authorization: string) {
  if (!authorization) {
    throw new EntityError('Authorization header is missing');
  }

  const token = authorization.split(' ')[1];
  if (!token) {
    throw new EntityError('Bearer token is missing');
  }

  console.log('Token:', token);

  const decoded = jwt.decode(token) as any;
  if (!decoded || !decoded.user) {
    throw new EntityError('Invalid token: user not found');
  }

  return decoded.user; // Retorna o objeto `user` completo
}

