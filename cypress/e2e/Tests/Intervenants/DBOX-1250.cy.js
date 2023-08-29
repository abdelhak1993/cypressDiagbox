import {PagePayeur} from "../../Pages/Intervenants/payeurPage";

const payeur = new PagePayeur();

beforeEach(() => {
    cy.visit("http://192.168.92.33:8080/login/index")
    cy.get('#UserName').type('Calasys')
    cy.get('#Password').type('Di@g!2014')
    cy.get('#Domain', { timeout: 6000 }).uncheck()
    cy.get('.btn-primary').click()
   
})


it('ajouter payeurs sans des champs', function() {
    payeur.ouvrirPagePartiePrenant()
    payeur.ajouterPayeur()
    payeur.enterNom("nom123")
    payeur.enterAdress("adres123")
    payeur.enregistrerAjout()
    payeur.assertionError(6)
})

it('ajouter payeur avec siret non valide', function() {
    payeur.ouvrirPagePartiePrenant()
    payeur.ajouterPayeur()
    payeur.enterNom("DPnom123")
    payeur.enterAdress("Padres123")
    payeur.enterCP("69001")
    payeur.enterVille("Lyon")
    payeur.enterAdressemail("Pmail123@gmail.com")
    payeur.enterTel("0766168095")
    payeur.enterSandre("Psandre123")
    payeur.enterSiret("PsiretA123")
    payeur.enregistrerAjout()
    payeur.assertionValidationSiret() 
})

it('ajouter payeur avec mail non valide', function() {
    payeur.ouvrirPagePartiePrenant()
    payeur.ajouterPayeur()
    payeur.enterNom("Pnom123")
    payeur.enterAdress("Padres123")
    payeur.enterCP("69001")
    payeur.enterVille("Lyon")
    payeur.enterAdressemail("Pmail123gmail.com")
    payeur.enterTel("0766168095")
    payeur.enterSandre("Psandre123")
    payeur.enterSiret("44400361000037")
    payeur.enregistrerAjout()
    payeur.assertionValidationMail()
})


it('ajouter payeur  avec succès', function() {
    payeur.ouvrirPagePartiePrenant()
    payeur.ajouterPayeur()
    payeur.enterNom("Pnom123")
    payeur.enterAdress("Padres123")
    payeur.enterCP("69001")
    payeur.enterVille("Lyon")
    payeur.enterAdressemail("Pmail123@gmail.com")
    payeur.enterTel("0766168095")
    payeur.enterSandre("PSandre123")
    payeur.enterSiret("44400361000037")
    payeur.enregistrerAjout()
    payeur.retourListePartiePrenante()
    payeur.filtrerPayeur()
    payeur.assertionAjoutPayeur("Pnom123","PSandre123","44400361000037")
})

it("Suppresion payeur ", function()  {
    payeur.ouvrirPagePartiePrenant()
    payeur.filtrerPayeur()
    payeur.suppressionPayeur('44400361000037')

})