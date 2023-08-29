import { PageDemandeur } from "../../Pages/Intervenants/demandeurPage";

const demandeur = new PageDemandeur();

beforeEach(() => {
    cy.visit("http://192.168.92.33:8080/login/index")
    cy.get('#UserName').type('Calasys')
    cy.get('#Password').type('Di@g!2014')
    cy.get('#Domain', { timeout: 6000 }).uncheck()
    cy.get('.btn-primary').click()
   
})


it('ajouter demandeur sans des champs', function() {
    demandeur.ouvrirPagePartiePrenant()
    demandeur.ajouterDemandeur()
    demandeur.enterNom("nom123")
    demandeur.enterAdress("adres123")
    demandeur.enregistrerAjout()
    demandeur.assertionError(6)

})

it('ajouter demandeur avec siret non valide', function() {
    demandeur.ouvrirPagePartiePrenant()
    demandeur.ajouterDemandeur()
    demandeur.enterNom("Dnom123")
    demandeur.enterAdress("Dadres123")
    demandeur.enterCP("69001")
    demandeur.enterVille("Lyon")
    demandeur.enterAdressemail("Dmail123@gmail.com")
    demandeur.enterTel("0766168095")
    demandeur.enterSandre("Dsandre123")
    demandeur.enterSiret("DsiretA123")
    demandeur.enregistrerAjout()
    demandeur.assertionValidationSiret()
    
})

it('ajouter demandeur avec mail non valide', function() {
    demandeur.ouvrirPagePartiePrenant()
    demandeur.ajouterDemandeur()
    demandeur.enterNom("Dnom123")
    demandeur.enterAdress("Dadres123")
    demandeur.enterCP("69001")
    demandeur.enterVille("Lyon")
    demandeur.enterAdressemail("Dmail123gmail.com")
    demandeur.enterTel("0766168095")
    demandeur.enterSandre("Dsandre123")
    demandeur.enterSiret("44400361000037")
    demandeur.enregistrerAjout()
    demandeur.assertionValidationMail()
})

it('ajouter demandeur avec succès', function() {
    demandeur.ouvrirPagePartiePrenant()
    demandeur.ajouterDemandeur()
    demandeur.enterNom("Dnom123")
    demandeur.enterAdress("Dadres123")
    demandeur.enterCP("69001")
    demandeur.enterVille("Lyon")
    demandeur.enterAdressemail("Dmail123@gmail.com")
    demandeur.enterTel("0766168095")
    demandeur.enterSandre("Dsandre123")
    demandeur.enterSiret("44400361000037")
    demandeur.enregistrerAjout()
    demandeur.retourListePartiePrenante()
    demandeur.filtrerDemandeur()
    demandeur.assertionAjoutDemandeur("Dnom123","Dsandre123","44400361000037")
})

it("Suppresion demandeur", function()  {
    demandeur.ouvrirPagePartiePrenant()
    demandeur.filtrerDemandeur()
    demandeur.suppressionDemandeur('44400361000037')
})







