/// <reference types="Cypress" />

describe('Test Playground account creation',()=> {
    it('create a valid account', () =>{
        cy.visit('/')
        cy.get('a').contains("Account details").click()
        cy.get('#username').type('Camilo')
        cy.get('#reg_email').type('test@gmail.com')
        cy.get('#password').type('test123')
        cy.get('[name = login]').click()
    })
})

describe('Test Playground Login',()=> {
    it('login with a valid account', () =>{
        cy.visit('/')
        cy.get('a').contains("Account details").click()
        cy.get('#username').type('Camilo')
        cy.get('#reg_email').type('test@gmail.com')
        cy.get('#password').type('test123')
        cy.get('[name = login]').click()
    })

    it('login with an invalid account', () =>{
        cy.visit('/')
        cy.get('a').contains("Account details").click()
        cy.get('#username').type('negative')
        cy.get('#reg_email').type('negativetest@gmail.com')
        cy.get('#password').type('test123')
        cy.get('[name = login]').click()
    })
})
