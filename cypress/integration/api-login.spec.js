/// <reference types='Cypress' />

import {endpoints} from 'C:/Users/Camilo Romero/Documents/Personal/Cypress/CypressTestingPlayground/endpoints.js';

describe('test playground user creation', () =>{

    it('should create a new user', () =>{
        cy.request({
           method: 'POST', 
           url: endpoints.user, 
           auth: {
                username: 'automation',
                password: 'automation'},
            body:{
            username:'test145',
            email:'test145@gmail.com',
            first_name: 'Camilo',
            last_name: 'Romero',
            password:'test123'
                }
        }).as('create_user')

        cy.get('@create_user').should((response) => {
            expect(response.status).to.eq(201)
        })
    
    })

})