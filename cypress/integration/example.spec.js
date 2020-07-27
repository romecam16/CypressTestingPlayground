/// <reference types="Cypress" />

describe('Test Playground account creation',()=> {
    it('create a valid account', () =>{
        cy.visit('http://localhost:8000/')
        cy.get('[href="http://localhost:8000/my-account/edit-account/"]').click()
        cy.get('#username').type('Camilo')
        cy.get('#reg_email').type('test@gmail.com')
        cy.get('#password').type('test123')
        cy.get('.woocommerce-Button').click()
    })
})

describe('Test Playground Login',()=> {
    it('login with a valid account', () =>{
        cy.visit('http://localhost:8000/')
        cy.get('[href="http://localhost:8000/my-account/edit-account/"]').click()
        cy.get('#username').type('Camilo')
        cy.get('#reg_email').type('test@gmail.com')
        cy.get('#password').type('test123')
        cy.get(':nth-child(3) > .woocommerce-button').click()
    })

    it('login with an invalid account', () =>{
        cy.visit('http://localhost:8000/')
        cy.get('[href="http://localhost:8000/my-account/edit-account/"]').click()
        cy.get('#username').type('negative')
        cy.get('#reg_email').type('negativetest@gmail.com')
        cy.get('#password').type('test123')
        cy.get(':nth-child(3) > .woocommerce-button').click()
    })
})
