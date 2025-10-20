import { Given, Then } from '@badeball/cypress-cucumber-preprocessor'

Given('I am on the home page', () => {
  cy.visit('/')
})

Then('I should see the title {string}', (title: string) => {
  cy.get('h1').should('be.visible').and('contain.text', title)
})
