export default describe('login test', () => {
    it ('check for all DOM Elements', () => {
        cy.visit('/auth')
        cy.contains('NGADMIN')
        cy.contains('SUB DIREKTORAT PEMBENTUKAN WILAYAH DAN ALOKASI PEMANFAATAN SDH')
        cy.contains('Username')
        cy.contains('Password')
        cy.contains('Year')
        cy.contains('register')
        cy.contains('register').click()
        cy.contains('PLEASE CONTACT ADMIN TO REGISTER YOUR ACCOUNT')
        
    })

    /* ==== Test Created with Cypress Studio ==== */
    it('login error: year is empty', function() {
        /* ==== Generated with Cypress Studio ==== */
        cy.visit('http://localhost:3001/auth');
        cy.get(':nth-child(1) > .MuiInputBase-root > .MuiInputBase-input').clear();
        cy.get(':nth-child(1) > .MuiInputBase-root > .MuiInputBase-input').type('admin');
        cy.get(':nth-child(2) > .MuiInputBase-root > .MuiInputBase-input').clear();
        cy.get(':nth-child(2) > .MuiInputBase-root > .MuiInputBase-input').type('admin');
        cy.get('.MuiButton-label').click();
        /* ==== End Cypress Studio ==== */
    });

    /* ==== Test Created with Cypress Studio ==== */
    it('error register attempt', function() {
        /* ==== Generated with Cypress Studio ==== */
        cy.visit('/auth');
        cy.get('a').click();
        cy.contains('PLEASE CONTACT ADMIN TO REGISTER YOUR ACCOUNT')
        /* ==== End Cypress Studio ==== */
    });

    it ('login error: invalid username/password', () => {
        cy.visit('/auth')
        cy.get(':nth-child(1) > .MuiInputBase-root > .MuiInputBase-input').clear()
        cy.get(':nth-child(1) > .MuiInputBase-root > .MuiInputBase-input').type('admin')
        cy.get(':nth-child(2) > .MuiInputBase-root > .MuiInputBase-input').clear()
        cy.get(':nth-child(2) > .MuiInputBase-root > .MuiInputBase-input').type('admina')
        cy.get('body').click()
        cy.get('#year-selection').click()
        cy.get('#year-2021').click()
        cy.get('.MuiButton-label').click()
        cy.contains('Invalid Username/Password!')
    })

    /* ==== Test Created with Cypress Studio ==== */
    it('login success', function() {
        /* ==== Generated with Cypress Studio ==== */
        cy.visit('/auth')
        cy.get(':nth-child(1) > .MuiInputBase-root > .MuiInputBase-input').clear()
        cy.get(':nth-child(1) > .MuiInputBase-root > .MuiInputBase-input').type('admin')
        cy.get(':nth-child(2) > .MuiInputBase-root > .MuiInputBase-input').clear()
        cy.get(':nth-child(2) > .MuiInputBase-root > .MuiInputBase-input').type('admin')
        cy.get('body').click()
        cy.get('#year-selection').click()
        cy.get('#year-2021').click()
        cy.get('.MuiButton-label').click()
        cy.url().should('include', '/suratmasuk')
        /* ==== End Cypress Studio ==== */
    });
})