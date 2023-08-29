export class PagePayeur {

    ouvrirPagePartiePrenant() {
        cy.get('.navbar-toggle').click()
        cy.contains(" Réglementaire ").wait(500).realHover()
        cy.contains(" Parametrage ").wait(500).realHover()
        cy.contains(' Intervenants').click()
        cy.get('#IntervenantType').select("Parties prenantes")
        cy.get('#seachBtn').click()
    }
    assertionPagePayeur() {
        cy.get('.panel-body').find('th').should((Colonne) => {   //Récupérer toutes les noms des colonnes de la table
            expect(Colonne).to.have.length(6);
            expect(Colonne).to.contain("Code Sandre");
            expect(Colonne).to.contain("Code SIRET");
            expect(Colonne).to.contain("Nom");
            expect(Colonne).to.contain("Adresse");
            expect(Colonne).to.contain("Type");
        });
    }
    filtrerPayeur() {
        cy.get('#PrenantesType').select("Payeur")
        cy.get('#seachBtn').click()
        cy.wait(600)
    }

    assertionFiltrePayeur() {
        cy.contains('th', "Type").invoke('index').then((index) => {   // Récupérer l'index de la colonne Type 
            cy.get('.table-striped').find(`td:nth-child(${index + 1})`).each( ligne => {   // Trouver les lignes de la colonne Type  en utilisant son index 
               expect(ligne).to.have.text("Payeurs");
            })
        })
    }

    assertionFiltrePayeur2() {
        cy.get('tbody').find('tr').each((tableRow) => {
            cy.wrap(tableRow).find('td').eq(0).should('have.text',"Payeurs")
        })
    }

    ajouterPayeur() {
        cy.get('#payeurLink').click()

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
    enregistrerAjout() {
        cy.get('.btn-primary').click()
    }

    assertionError(nbrError) {
        cy.get('.field-validation-error').should((error) => {
            expect(error).have.to.length(nbrError)
        })
    }

    assertionAjoutPayeur(nom, sandre, siret) {
        cy.contains('tr',siret)
            .find('td').should((ligne) => {
                expect(ligne).to.contain(nom);
                expect(ligne).to.contain(sandre);
                expect(ligne).to.contain(siret);
            })
    }


    retourListePartiePrenante() {
        cy.get('.system-link').click()
    }

    suppressionPayeur(siret) {    
        cy.contains('tr',siret).find('[title= "Supprimer"]').click()   // Chercher la ligne qui contient le nom, après cliquer sur supprimer
        cy.get('.btn-danger').click()                                // valider la suppression 
        cy.get('#myModalLabel').should('be.visible')
        cy.get('.ajax-form-success > .text-center').should('have.text',"Suppression réussie")
        cy.get('.center-block > .btn').click()
        cy.get('#payeurLink').should('be.visible') 
    }

    assertionValidationSiret() {
        cy.get('.field-validation-error').should((error) => {
            expect(error).to.contain("Le code SIRET saisi n'est pas valide!")
        })
    }

    assertionValidationMail() {
        cy.get('.field-validation-error').should((error) => {
            expect(error).to.contain("Veuillez saisir un adresse e-mail valide")
        })
    }

}