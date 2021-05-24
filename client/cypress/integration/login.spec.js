describe('login test', () => {
    it ('check for all DOM Elements', () => {
        cy.visit('http://localhost:3001/auth')
        cy.contains('NGADMIN')
        cy.contains('SUB DIREKTORAT PEMBENTUKAN WILAYAH DAN ALOKASI PEMANFAATAN SDH')
        cy.contains('Username')
        cy.contains('Password')
        cy.contains('Year')
        cy.contains('register')
        cy.contains('register').click()
        cy.contains('PLEASE CONTACT ADMIN TO REGISTER YOUR ACCOUNT')
        
    })
    it('sucess case', () => {
        cy.url().should('include', '/auth')
        cy.get('input[name="Username"]').type('admin')
        cy.get('input[name=Password]').type('admin')
        cy.get('input[name=Year]')
        // cy.contains('button')
    })
})