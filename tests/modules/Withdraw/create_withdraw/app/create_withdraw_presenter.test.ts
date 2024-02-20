import { describe, it, expect } from 'vitest'
import { handler } from '../../../../../src/modules/Withdraw/create_withdraw/app/create_withdraw_presenter'

describe('Assert Create Withdraw presenter is correct at all', async () => {
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
        withdrawId: '2',
        notebookSerialNumber: 'ABC124',
        studentRA: '22.00680-0',
        initTime: 1704074148050,
      },
      pathParameters: null,
      isBase64Encoded: null,
      stageVariables: null,
    }

    const response = await handler(event, undefined)

    expect(response['statusCode']).toEqual(201)
    expect(JSON.parse(response['body'])['message']).toEqual(
      'The withdraw was created successfully',
    )
  })
})
