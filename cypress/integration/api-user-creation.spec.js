/// <reference types='Cypress' />

import {endpoints} from '../support/endpoints.js';
import {users} from '../support/users.js'

describe('test playground user creation', () =>{
    it('should create a new user', function() {
        cy.request({
           method: 'POST', 
           url: endpoints.user, 
           auth: {
                username: Cypress.env('WP_USERNAME'),
                password: Cypress.env('WP_PASSWORD')
           },
           body:users.user    
        }).should((response) => {
            expect(response.status).to.eq(201)
            expect(response.body).to.have.property('username', users.user.username)
            expect(response.body).to.have.property('name', users.user.first_name + ' ' + users.user.last_name)
            this.id = response.body.id
        })          
    })

    it('should not create an existing user', function() {
        cy.request({
           method: 'POST', 
           url: endpoints.user, 
           auth: {
                username: Cypress.env('WP_USERNAME'),
                password: Cypress.env('WP_PASSWORD')
           },
           body:users.user,
           failOnStatusCode: false
        }).should((response) => {
            expect(response.status).to.eq(500)
            expect(response.body).to.have.property('code', 'existing_user_login')
            expect(response.body).to.have.property('message', 'Sorry, that username already exists!')
        })          
    })

    it('should not create a user with no username', function() {
        cy.request({
           method: 'POST', 
           url: endpoints.user, 
           auth: {
                username: Cypress.env('WP_USERNAME'),
                password: Cypress.env('WP_PASSWORD')
           },
           body:users.user_with_no_username,
           failOnStatusCode: false
        }).should((response) => {
            expect(response.status).to.eq(400)
            expect(response.body).to.have.property('code', 'rest_missing_callback_param')
            expect(response.body).to.have.property('message', 'Missing parameter(s): username')
        })          
    })

    it('should not create a user with no password', function() {
        cy.request({
           method: 'POST', 
           url: endpoints.user, 
           auth: {
                username: Cypress.env('WP_USERNAME'),
                password: Cypress.env('WP_PASSWORD')
           },
           body:users.user_with_no_password,
           failOnStatusCode: false
        }).should((response) => {
            expect(response.status).to.eq(400)
            expect(response.body).to.have.property('code', 'rest_missing_callback_param')
            expect(response.body).to.have.property('message', 'Missing parameter(s): password')
        })          
    })

    it('should not create a user with no email', function() {
        cy.request({
           method: 'POST', 
           url: endpoints.user, 
           auth: {
                username: Cypress.env('WP_USERNAME'),
                password: Cypress.env('WP_PASSWORD')
           },
           body:users.user_with_no_email,
           failOnStatusCode: false
        }).should((response) => {
            expect(response.status).to.eq(400)
            expect(response.body).to.have.property('code', 'rest_missing_callback_param')
            expect(response.body).to.have.property('message', 'Missing parameter(s): email')
        })          
    })

    it('should not create a user with no authentication credentials', function() {
        cy.request({
           method: 'POST', 
           url: endpoints.user, 
           body:users.user,    
           failOnStatusCode: false
        }).should((response) => {
            expect(response.status).to.eq(401)
            expect(response.body).to.have.property('message', 'Sorry, you are not allowed to create new users.')
            expect(response.body).to.have.property('code', 'rest_cannot_create_user')
        })          
    })

    it('should delete an existing user', function(){
        cy.request({     
            method: 'DELETE', 
            url: `${endpoints.user}${this.id}?reassign=false&force=true`, 
            auth: {
                username: Cypress.env('WP_USERNAME'),
                password: Cypress.env('WP_PASSWORD')
            }
        }).should((response) => {
            expect(response.status).to.eq(200)
            expect(response.body).to.have.property('deleted', true)
            expect(response.body.previous).to.have.property('id', this.id)
        })
    })
})