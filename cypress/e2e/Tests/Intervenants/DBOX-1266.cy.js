import { NormePAge } from "../../Pages/Intervenants/normePage";

const norme = new NormePAge()

beforeEach(() => {
    cy.visit("http://192.168.92.33:8080/login/index")
    cy.get('#UserName').type('Calasys')
    cy.get('#Password').type('Di@g!2014')
    cy.get('#Domain', { timeout: 6000 }).uncheck()
    cy.get('.btn-primary').click()
    norme.ouvrirPageNorme()
})

it('Affichage liste des normes par défaut', () => {
    norme.assertionPageNormeEauPotable()
})

it('Affichage liste des normes assainissement ', () => {
    norme.filtrerService("Assainissement")
    norme.assertionPageNormeAssainissement()
})
