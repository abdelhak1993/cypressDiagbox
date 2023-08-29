import { PagePreleveur } from "../../Pages/Intervenants/preleveurPage";

const preleveur = new PagePreleveur();

beforeEach(() => {
/* cy.visit("http://192.168.92.33:789/login/index")
cy.get('#UserName').type('Calasys')
cy.get('#Password').type('Di@g!2014')
cy.get('#Domain', { timeout: 6000 }).uncheck()
cy.get('.btn-primary').click() */

cy.OpenDiagBox()    //Cette fonction est ajouté dans le fichier commands.js sous support

})

it('Affichage liste préleverus avec filtrage ', () => {
    preleveur.ouvrirPagePreleveurs()
    preleveur.assertionPagePréleverus()
    preleveur.filtreServicePreleveur()
})