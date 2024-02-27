/* eslint-disable @typescript-eslint/no-unused-vars */

import { describe, it, expect } from 'vitest'
import { handler } from '../../../../../src/modules/Withdraw/update_withdraw_state/app/update_withdraw_state_presenter'
import envs from '../../../../..'
import jwt from 'jsonwebtoken'
import { WithdrawRepositoryMock } from '../../../../../src/shared/infra/repositories/withdraw_repository_mock'
import { UpdateWithdrawController } from '../../../../../src/modules/Withdraw/update_withdraw_state/app/update_withdraw_state_controller'
import { UpdateWithdrawUsecase } from '../../../../../src/modules/Withdraw/update_withdraw_state/app/update_withdraw_state_usecase'

describe('Update Withdraw State Presenter Tests', () => {
  const user = {
    role: 'EMPLOYEE',
  }
  const secret = envs.JWT_SECRET

  if (secret === undefined) throw Error('JWT_SECRET is not defined')

  const token = jwt.sign({ user: JSON.stringify(user) }, secret)

  it('Should update withdraw state successfully when creating', async () => {
    const event = {
      version: '2.0',
      routeKey: '$default',
      rawPath: '/my/path',
      rawQueryString: 'parameter1=value1&parameter1=value2&parameter2=value',
      cookies: ['cookie1', 'cookie2'],
      headers: {
        header1: 'value1',
        header2: 'value1,value2',
        authorization: `Bearer ${token}`,
      },
      queryStringParameters: {
        notebookSerialNumber: 'MNO345',
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
            userArn: 'arn:aws:iam::111122223333:user/example-user',
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
      body: {
        notebookSerialNumber: 'GHI789',
        state: true,
      },
      pathParameters: null,
      isBase64Encoded: null,
      stageVariables: null,
    }

    const repoMock = new WithdrawRepositoryMock()
    const usecase = new UpdateWithdrawUsecase(repoMock)
    const controller = new UpdateWithdrawController(usecase)
    const response = await handler(event, {})

    expect(response?.statusCode).toEqual(200)
    expect(response?.body).toEqual(
      JSON.stringify({ message: 'The withdraw state updated successfully' }),
    )
  })
})
