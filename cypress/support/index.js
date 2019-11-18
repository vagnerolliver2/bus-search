require('cypress-plugin-retries')
import './commands'


Cypress.on('uncaught:exception', err => {
  const { stack } = err
  const hasUnknownSyntaxError = stack.includes('SyntaxError: Invalid or unexpected token')
  const hasPushError = stack.includes('TypeError: Cannot read property \'push\' of undefined')

  if (hasUnknownSyntaxError) return false
  if (hasPushError) return false

  return true
})

