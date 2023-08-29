import { LaboExterePAge } from "../../Pages/Intervenants/laboExternePage";

const labo = new LaboExterePAge();

beforeEach(() => {
    cy.visit("http://192.168.92.33:8080/login/index")
    cy.get('#UserName').type('Calasys')
    cy.get('#Password').type('Di@g!2014')
    cy.get('#Domain', { timeout: 6000 }).uncheck()
    cy.get('.btn-primary').click()
   
})

it('Affichage liste des laboratoires externe ', function(){

    labo.ouvrirPageLaboExterne()
    labo.assertionPageLaboratoireExterne()
})
