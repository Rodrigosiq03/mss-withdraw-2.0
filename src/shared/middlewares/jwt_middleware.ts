/* eslint-disable @typescript-eslint/no-explicit-any */
import jwt from 'jsonwebtoken'
import { IRequest } from '../helpers/external_interfaces/external_interface'
import { EntityError } from '../helpers/errors/domain_errors'

import envs from '../../../'

export function getUserFromToken(request: IRequest) {
  const auth = request.data.authorization as string
  const token = auth.split(' ')[1]


  const decoded = jwt.verify(token, envs.JWT_SECRET) as any
  if (!decoded) {
    throw new EntityError('token')
  }

  const user = JSON.parse(decoded.user)
  return user
}


// function test() {
//   const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjoie1wicmFcIjpcIjIyLjAwNjgwLTBcIixcIm5hbWVcIjpcIlJvZHJpZ28gRGlhbmEgU2lxdWVpcmFcIixcImVtYWlsXCI6XCIyMi4wMDY4MC0wQG1hdWEuYnJcIixcInJvbGVcIjpcIlNUVURFTlRcIixcInBhc3N3b3JkXCI6XCIkMmEkMDYkVC9jZEhuYnJmWXZmb1dqbC9ESWk3dVpId21Idkx5YmNjbWdDR3VrL2E2WTRnemlhRjBxV2VcIn0iLCJpYXQiOjE3MDg2MzM5OTIsImV4cCI6MTcwODcyMDM5Mn0.GUF0rqeAbVIzsDB_3AXl86vWfqOe8wIY1AirfiRoGmg'
//   const verify = jwt.verify(token, '$2a$08$yV1zRpCEqPT3X9C0F48UbO0kKZK1qhjMgX71pBhDQWQiDfyLi3PlW')

//   console.log(verify)
// }

// test()
