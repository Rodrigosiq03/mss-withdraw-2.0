/* eslint-disable @typescript-eslint/no-unused-vars */

import { describe, it, expect } from 'vitest'
import { handler } from '../../../../../src/modules/Withdraw/finish_withdraw/app/finish_withdraw_presenter'
import envs from '../../../../..'
import jwt from 'jsonwebtoken'
import { WithdrawRepositoryMock } from '../../../../../src/shared/infra/repositories/withdraw_repository_mock'
import { FinishWithdrawController } from '../../../../../src/modules/Withdraw/finish_withdraw/app/finish_withdraw_controller'
import { FinishWithdrawUsecase } from '../../../../../src/modules/Withdraw/finish_withdraw/app/finish_withdraw_usecase'

describe('Finish Withdraw Presenter Tests', () => {
  const user = {
    role: 'EMPLOYEE',
  }
  const secret = envs.JWT_SECRET

  if (secret === undefined) throw Error('JWT_SECRET is not defined')

  const token = jwt.sign({ user: JSON.stringify(user) }, secret)

  it('Should finish withdraw successfully when user is employee or admin', async () => {
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
        notebookSerialNumber: 'GHI789',
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
      body: {},
      pathParameters: null,
      isBase64Encoded: null,
      stageVariables: null,
    }

    const repoMock = new WithdrawRepositoryMock()
    const usecase = new FinishWithdrawUsecase(repoMock)
    const controller = new FinishWithdrawController(usecase)
    const response = await handler(event, {})

    expect(response.statusCode).toBe(200)
    expect(response.body).toEqual(JSON.stringify({ message: "The withdraw finished successfully" }))
  })
})
