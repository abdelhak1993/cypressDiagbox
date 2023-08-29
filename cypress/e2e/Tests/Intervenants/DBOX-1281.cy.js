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



it ('Supprimer un préleveur eau potable', () => {
    preleveur.ouvrirPagePreleveurs()
    preleveur.supprimerPréleveur(new RegExp("^" + 'Préleveur1' + "$", "g"))  
    preleveur.assertionReussiteSuppression()  
})


it ('Supprimer un préleveur assainissement', () => {
    preleveur.ouvrirPagePreleveurs()
    preleveur.supprimerPréleveur(new RegExp("^" + 'Préleveur2' + "$", "g"))
    preleveur.assertionReussiteSuppression()

})

