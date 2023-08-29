
export class LaboExterePAge {

    ouvrirPageLaboExterne() {
        cy.get('.navbar-toggle').click()
        cy.contains(" Réglementaire ").wait(500).realHover()
        cy.contains(" Parametrage ").wait(500).realHover()
        cy.contains(' Intervenants').click()
        cy.get('#IntervenantType').select("Laboratoires externes")
        cy.get('#seachBtn').click()

    }

    assertionPageLaboratoireExterne() {
        cy.get('#resultsList').find('th').should((colonne) => {
            expect(colonne).to.have.length(7)
            expect(colonne).to.contain("Code Sandre")
            expect(colonne).to.contain("Code SIRET")
            expect(colonne).to.contain("Nom")
            expect(colonne).to.contain("Ville")
        })
    }

    ajouterUnLaboratoire(){
        cy.get('#laboExterneLink').click()
        cy.contains('Nouveau laboratoire externe').should('be.visible')

    }

    enterSandre(Sandre) {
        cy.get('#CodeSandre').type(Sandre)
    }
    enterSiret(siret) {
        cy.get('#CodeSiret').type(siret)
    }
    enterNom(nom) {
        cy.get('#Nom').type(nom)
    }
    enterAdressemail(mail) {
        cy.get('#AdresseMail').type(mail)
    }
    enterTel(tel) {
        cy.get('#ITelephone').type(tel)
    }
    enterAdress(adresse) {
        cy.get('#Adresse').type(adresse)
    }
    enterVille(ville) {
        cy.get('#Ville').type(ville)
    }
    enterCP(CP) {
        cy.get('#CodePostal').type(CP)
    }

    enterNomContact(nomContact) {
        
        cy.get('#Contact').clear().type(nomContact)
        }

    enterMailContact (mailContact) {
        cy.get('#Email').clear().type(mailContact)
    }

    enregistrerAjout(){
        cy.get('.btn-primary').click()
    }

    supprimerLabo(nom){
        cy.contains('td', nom).parent().find('[title= "Supprimer"]').click() 
        cy.wait(1500)
        cy.get('.modal-title').should('be.visible').invoke('text').then((titrePopUpSuppression) => {
            expect(titrePopUpSuppression).eq('Suppression du laboratoire externe: "'+nom.toString().slice(2,-3)+'"')
        });

      //  cy.get('.row > p').should('have.text', 'Confirmez vous la suppression du cube : ' + nom.toString().slice(2, -3) + '? ')
      cy.get('.btn-danger').click()
    }

    assertionError(nbrError) {
        cy.get('.field-validation-error').should((error) => {
            expect(error).have.to.length(nbrError)
        })
    } 
    assertionSiretValidation() {
        cy.get('#CodeSiret_validationMessage').should('be.visible').and('have.text',"Le code SIRET saisi n'est pas valide!")

    }

    assertionMailValidation(){
        cy.get('#AdresseMail_validationMessage').should('be.visible').and('have.text',"Veuillez saisir un adresse e-mail valide")
    }
    
    assertionTelValidation(){
        cy.get('#ITelephone_validationMessage').should('be.visible').and('have.text',"Le numéro de téléphone est non valide.")
    }
    
    assertionAjoutLabo(){
        cy.get('.description').should('be.visible')
        
    }
}