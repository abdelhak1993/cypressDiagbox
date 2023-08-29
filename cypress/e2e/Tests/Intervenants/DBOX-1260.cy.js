import { LaboExterePAge } from "../../Pages/Intervenants/laboExternePage";

const labo = new LaboExterePAge();

beforeEach(() => {
    cy.visit("http://192.168.92.33:8080/login/index")
    cy.get('#UserName').type('Calasys')
    cy.get('#Password').type('Di@g!2014')
    cy.get('#Domain', { timeout: 6000 }).uncheck()
    cy.get('.btn-primary').click()
   
})

it('ajouter laboratoire  sans des champs', function() {
    labo.ouvrirPageLaboExterne()
    labo.ajouterUnLaboratoire()
    labo.enterAdress("10 rue Jules")
    labo.enterCP("69001")
    labo.enregistrerAjout()
    labo.assertionError(8)
})

it('ajouter laboratoire avec siret non valide', function() {
    labo.ouvrirPageLaboExterne()
    labo.ajouterUnLaboratoire()
    labo.enterNom("Dnom123")
    labo.enterCP("69001")
    labo.enterVille("Lyon")
    labo.enterAdressemail("Dmail123@gmail.com")
    labo.enterTel("0766168095")
    labo.enterSandre("Dsandre123")
    labo.enterSiret("DsiretA123")
    labo.enregistrerAjout()
    labo.assertionSiretValidation()
    
})
it('ajouter laboratoire avec email et numero de telephone  non valide', function() {
    labo.ouvrirPageLaboExterne()
    labo.ajouterUnLaboratoire()
    labo.enterNom("Dnom123")
    labo.enterCP("69001")
    labo.enterVille("Lyon")
    labo.enterAdressemail("Dmail123@gmail")
    labo.enterTel("076616809")
    labo.enterSandre("Dsandre123")
    labo.enterSiret("44400361000037")
    labo.enregistrerAjout()
    labo.assertionMailValidation()
    labo.assertionTelValidation()
    
})

it.only('ajouter laboratoire avec succès', function() {
    labo.ouvrirPageLaboExterne()
    labo.ajouterUnLaboratoire()
    labo.enterNom("Lab123")
    labo.enterCP("69001")
    labo.enterVille("Lyon")
    labo.enterAdressemail("Lab123@gmail.com")
    labo.enterAdress("10 rue Georges , Lyon")
    labo.enterTel("0766168095")
    labo.enterSandre("LabSandre123")
    labo.enterSiret("44400361000037")
    labo.enterNomContact("ContactLabo")
    labo.enterMailContact("labo@gmail.com")
    labo.enregistrerAjout()
    labo.assertionAjoutLabo()
    
})
