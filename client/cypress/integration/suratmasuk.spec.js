import logintest from './login.spec.js'

describe('surat masuk test', () => {
    beforeEach(() => {
        logintest
    })
    it ('cek all HTML elements', () => {
        cy.contains('SURAT MASUK')
        cy.contains('2021')
    })
    it ('cek all HTML elements from navbar', () => {
        cy.contains('SURAT KELUAR')
    })
})