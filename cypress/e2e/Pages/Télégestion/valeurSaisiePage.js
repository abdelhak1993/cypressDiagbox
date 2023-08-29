export class ValeurSaisie {

    ouvrirPageValeurSaisie() {
        cy.get('.navbar-toggle').click()
        cy.contains(" Télégestion ").wait(500).realHover()
        cy.contains("Valeurs saisies").wait(500).click()
        cy.get('#n1_anchor').click()

        let date = new Date()
        date.setDate(date.getDate() - 5)

        let futureDate = date.getDay()
        let futureMonth = date.getMonth()


        cy.get('#dateStartForm').click()

    }


}