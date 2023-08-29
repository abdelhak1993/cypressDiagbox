import { PageDemandeur } from "../../Pages/Intervenants/demandeurPage";
import { PagePayeur } from "../../Pages/Intervenants/payeurPage";

const demandeur = new PageDemandeur();
const payeur = new PagePayeur();

beforeEach(() => {
    cy.visit("http://192.168.92.33:8080/login/index")
    cy.get('#UserName').type('Calasys')
    cy.get('#Password').type('Di@g!2014')
    cy.get('#Domain', { timeout: 6000 }).uncheck()
    cy.get('.btn-primary').click()
    payeur.ouvrirPagePartiePrenant()
   
})

it('Affichage liste demandeurs et payeurs avec filtrage payeur', () => {

    payeur.assertionPagePayeur()
    payeur.filtrerPayeur()
    payeur.assertionFiltrePayeur2()
    
})

it('Affichage liste demandeurs et payeurs avec filtrage demandeur ', function(){

    demandeur.assertionPageDemandeur()
    demandeur.filtrerDemandeur()
    demandeur.assertionFiltreDemandeur()  
})