/* eslint-disable @typescript-eslint/no-unused-vars */
import * as cdk from 'aws-cdk-lib'
import * as dotenv from 'dotenv'
import { TemplateStack } from './iac/template_stack'
import { adjustLayerDirectory } from './adjust_layer_directory'
import envs from '..'

console.log('Starting the CDK')

console.log('Adjusting the layer directory')
adjustLayerDirectory()
console.log('Finished adjusting the layer directory')

const app = new cdk.App()

dotenv.config()

const requiredEnvs: (keyof typeof envs)[] = [
  'REGION',
  'AWS_ACCOUNT_ID',
  'STACK_NAME',
  'AWS_ACCESS_KEY_ID',
  'AWS_SECRET_ACCESS_KEY_ID',
]

requiredEnvs.forEach((envVar) => {
  if (!envs[envVar]) {
    throw new Error(`Missing required environment variable: ${envVar}`)
  }
})

const awsRegion = envs.REGION
const awsAccount = envs.AWS_ACCOUNT_ID
const stackName = envs.STACK_NAME

const tags = {
  'project': 'NotemauaMssWithdraw',
  'stage': 'DEV',
  'stack': 'BACK',
  'owner': 'DevDynasty',
}

new TemplateStack(app, stackName, {
  env: {
    region: awsRegion,
    account: awsAccount
  },
  tags: tags
})

app.synth()
