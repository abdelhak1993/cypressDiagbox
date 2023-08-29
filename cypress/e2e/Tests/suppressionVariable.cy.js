///<reference types="cypress" />

it('ajout variable',function() {

    cy.visit("http://192.168.92.33:8080/login/index")
    cy.get('#UserName').type('Calasys')
    cy.get('#Password').type('Di@g!2014')
    cy.get('#Domain',{timeout:6000}).uncheck()
    cy.get('.btn-primary').click()
    cy.get('.navbar-toggle').click()
    cy.contains("Paramétrage").realHover('mouseover')
    cy.contains('Variables').click()
    cy.get('#Nom').type('Yacine{Enter}')

    cy.get('tr > .hidden-xs').should('contain','Yacine')
    





})

