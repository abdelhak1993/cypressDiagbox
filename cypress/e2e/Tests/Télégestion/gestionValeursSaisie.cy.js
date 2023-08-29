import { ValeurSaisie } from "../../Pages/Télégestion/valeurSaisiePage"

const valeur = new ValeurSaisie()

beforeEach(() => {
    cy.visit("http://192.168.92.33:789/login/index")
    cy.get('#UserName').type('Calasys')
    cy.get('#Password').type('Di@g!2014')
    cy.get('#Domain', { timeout: 6000 }).uncheck()
    cy.get('.btn-primary').click()
   
})

it('Afficher une variable sur la dernière année', () => {
valeur.ouvrirPageValeurSaisie()

})