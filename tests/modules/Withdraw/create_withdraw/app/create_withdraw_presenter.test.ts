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
        authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjoie1wicmFcIjpcIjIyLjAwNjgwLTBcIixcIm5hbWVcIjpcIlJvZHJpZ28gRGlhbmEgU2lxdWVpcmFcIixcImVtYWlsXCI6XCIyMi4wMDY4MC0wQG1hdWEuYnJcIixcInJvbGVcIjpcIlNUVURFTlRcIixcInBhc3N3b3JkXCI6XCIkMmEkMDYkVC9jZEhuYnJmWXZmb1dqbC9ESWk3dVpId21Idkx5YmNjbWdDR3VrL2E2WTRnemlhRjBxV2VcIn0iLCJpYXQiOjE3MDg2MzM5OTIsImV4cCI6MTcwODcyMDM5Mn0.GUF0rqeAbVIzsDB_3AXl86vWfqOe8wIY1AirfiRoGmg',
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
        notebookSerialNumber: 'ABC123',
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
