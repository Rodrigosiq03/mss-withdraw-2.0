import { describe, it, expect } from 'vitest'
import { getAllWithdrawsPresenter } from '../../../../src/modules/get_all_withdraw/app/get_all_withdraw_presenter'
import { STATE } from '../../../../src/shared/domain/enums/state_enum'
import envs from '../../../..'
import jwt from 'jsonwebtoken'

describe('Assert Get All Withdraws presenter is correct at all', () => {
  const user = {
    role: 'EMPLOYEE',
  }
  const secret = envs.JWT_SECRET

  if (secret === undefined) throw Error('JWT_SECRET is not defined')

  const token = jwt.sign({ user: JSON.stringify(user) }, secret)
  
  it('Should activate presenter correctly', async () => {
    const event = {
      version: '2.0',
      routeKey: '$default',
      rawPath: '/my/path',
      rawQueryString: 'parameter1=value1&parameter1=value2&parameter2=value',
      cookies: ['cookie1', 'cookie2'],
      headers: {
        header1: 'value1',
        header2: 'value1,value2',
        Authorization: `Bearer ${token}`,
      },
      queryStringParameters: {
        parameter1: 'value1',
      },
      requestContext: {
        accountId: '123456789012',
        apiId: '<urlid>',
        authentication: null,
        authorizer: {
          iam: {
            accessKey: 'AKIA...',
            accountId: '111122223333',
            callerId: 'AIDA...',
            cognitoIdentity: null,
            principalOrgId: null,
            userArn: 'arn:aws:iam::111122223333:user_id/example-user_id',
            userId: 'AIDA...',
          },
        },
        domainName: '<url-id>.lambda-url.us-west-2.on.aws',
        domainPrefix: '<url-id>',
        external_interfaces: {
          method: 'POST',
          path: '/my/path',
          protocol: 'HTTP/1.1',
          sourceIp: '123.123.123.123',
          userAgent: 'agent',
        },
        requestId: 'id',
        routeKey: '$default',
        stage: '$default',
        time: '12/Mar/2020:19:03:58 +0000',
        timeEpoch: 1583348638390,
      },
      body: 'Hello from client!',
      pathParameters: null,
      isBase64Encoded: null,
      stageVariables: null,
    }

    const expectedBody = {
      message: 'All withdraws have been retrieved successfully',
      withdraws: [
        {
          notebookSerialNumber: 'ABC123',
          state: STATE.INACTIVE,
        },
        {
          notebookSerialNumber: 'DEF456',
          state: STATE.INACTIVE,
        },
        {
          initTime: 1704074148000,
          name: 'Matue',
          notebookSerialNumber: 'GHI789',
          studentRA: '23.00555-7',
          state: STATE.PENDING,
        },
        {
          name: 'Thiago Veigh',
          notebookSerialNumber: 'JKL012',
          studentRA: '23.00656-6',
          initTime: 1704074148000,
          state: STATE.PENDING,
        },
      ],
    }

    const response = await getAllWithdrawsPresenter(event)

    expect(response['statusCode']).toEqual(200)
    expect(JSON.parse(response['body'])).toEqual(expectedBody)
  })
})
