import express from 'express'
import { codeBlock, extractInputs } from '@limit-lab/code-block-sdk'

const app = express()
const codeBlockApp = codeBlock()

const port = process.env.PORT || "3000"
app.set('port', port)

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

codeBlockApp.inputs([
  {
    name: "name",
    type: "string",
    defaultValue: {
      portValueType: 'string',
      stringValue: 'world',
    },
  },
]).outputs([
  {
    name: "greet",
    type: "string",
  },
])

codeBlockApp.serve((inputs) => {
  const { name } = extractInputs(inputs)
  return {
    greet: {
      portValueType: 'string',
      stringValue: `Hello, ${name}!`,
    },
  }
})

app.use('/', codeBlockApp.router)
