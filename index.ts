import { config } from 'dotenv'
import path from 'path'

// const stage = process.env.STAGE

// if (stage === 'DEV') config({ path: path.resolve(__dirname, './.env.local') })
config({ path: path.resolve(__dirname, './.env') })

const envs = {
  STAGE: process.env.STAGE,
  GITHUB_REF: process.env.GITHUB_REF_NAME,
  REGION: process.env.REGION,
  STACK_NAME: process.env.STACK_NAME,
  AWS_ACCOUNT_ID: process.env.AWS_ACCOUNT_ID,
  DYNAMO_TABLE_NAME: process.env.DYNAMO_TABLE_NAME,
  DYNAMO_TABLE_NAME_HISTORY: process.env.DYNAMO_TABLE_NAME_HISTORY,
  AWS_ACCESS_KEY_ID: process.env.AWS_ACCESS_KEY_ID,
  AWS_SECRET_ACCESS_KEY_ID: process.env.AWS_SECRET_ACCESS_KEY_ID,
}
console.log(envs)

export default envs