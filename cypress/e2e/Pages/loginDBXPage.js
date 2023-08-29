export class loginPageDiagbox {
    

    enterUserNAme(userName) {
    cy.get('#UserName').type(userName)
    }
    

    enterPassword(password) {
        cy.get('#Password').type(password)
    }

    uncheckAuthenficationWindows() {
        cy.get('#Domain').uncheck()
    }

    Connexion() {
        cy.get('.btn-primary').click()

    }

    

}