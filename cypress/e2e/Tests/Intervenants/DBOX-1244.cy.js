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


it('ajouter un préleveur sans champs ' , () => {
    preleveur.ouvrirPagePreleveurs()
    preleveur.ajouterPreleveur()
    preleveur.enregisterAjout()
    cy.wait(200)
    preleveur.assertionChampSiretVide()
    preleveur.assertionChampNomVide()
    preleveur.assertionMailVide()
})

it('ajouter un préleveur avec siret et mail non valide ' , () => {
    preleveur.ouvrirPagePreleveurs()
    preleveur.ajouterPreleveur()
    preleveur.enterNom("Preleveur1")
    preleveur.enterMail("abd")
    preleveur.enterSiret("1245")
    preleveur.enregisterAjout()
    preleveur.assertionInalideMailAndSiret()
})

it('ajouter un préleveur eau potable avec succées ' , () => {                        // mail et siret et nom valide  ==> ajout avec succés
    preleveur.ouvrirPagePreleveurs()
    preleveur.ajouterPreleveur()
    preleveur.enterNom("Préleveur1")
    preleveur.enterMail("preleveur@gmail.com")
    preleveur.enterSiret("44400361000037")
    preleveur.enregisterAjout()
    preleveur.assertionAjoutPréleveur()
})

it('ajouter un préleveur assainissement avec succées', () => {
    preleveur.ouvrirPagePreleveurs()
    preleveur.ajouterPreleveur()
    preleveur.enterNom("Préleveur2")
    preleveur.enterMail("preleveur@gmail.com")
    preleveur.enterSiret("44400361000037")
    preleveur.enterService("Assainissement")
    preleveur.enregisterAjout()
    preleveur.assertionAjoutPréleveur()

})


