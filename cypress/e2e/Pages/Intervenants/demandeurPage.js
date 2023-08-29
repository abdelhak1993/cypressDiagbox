export class PageDemandeur {

    ouvrirPagePartiePrenant() {
        cy.get('.navbar-toggle').click()
        cy.contains(" Réglementaire ").wait(500).realHover()
        cy.contains(" Parametrage ").wait(500).realHover()
        cy.contains(' Intervenants').click()
        cy.get('#IntervenantType').select("Parties prenantes")
        cy.get('#seachBtn').click()
    }

    assertionPageDemandeur() {
        cy.get('.panel-body').find('th').should((Colonne) => {
            expect(Colonne).to.have.length(6);
            expect(Colonne).to.contain("Code Sandre");
            expect(Colonne).to.contain("Code SIRET");
            expect(Colonne).to.contain("Nom");
            expect(Colonne).to.contain("Adresse");
            expect(Colonne).to.contain("Type");
        });
    }

    filtrerDemandeur() {
        cy.get('#PrenantesType').select("Demandeurs")
        cy.get('#seachBtn').click()
        cy.wait(600)
    }

    assertionFiltreDemandeur() {
        cy.contains('th', "Type").invoke('index').then((index) => {                           // Récupérer l'index de la colonne Type 
            cy.get('.table-striped').find(`td:nth-child(${index + 1})`).each((ligne) => {    // Trouver les lignes de la colonne Type  en utilisant son index 
                    expect(ligne).to.have.text("Demandeurs");
            })
        })
    }

    /* assertionFiltreDemandeur() {
        cy.get('tbody').find('tr').each((tableRow) => {
            cy.wrap(tableRow).find('td').eq(0).should('have.text', "Demandeurs")
        })
    } */

    ajouterDemandeur() {
        cy.get('#demandeurLink').click()
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

    retourListePartiePrenante() {
        cy.get('.system-link').click()
    }

    assertionAjoutDemandeur(nom, sandre, siret) {  //Vérifier l'exsitence d'un demandeur avec le nom sandre et siret 
        cy.get('.panel-body')
            .contains(siret)
            .parent()
            .find('td').should((ligne) => {
                expect(ligne).to.contain(nom);
                expect(ligne).to.contain(sandre);
                expect(ligne).to.contain(siret);
            })
    }

    suppressionDemandeur(siret) {
        // cy.get('.panel-body').contains(nom).parent().find('.fa-trash-o').parent().click()
        cy.contains('tr', siret).find('[title= "Supprimer"]').click()
        cy.get('.btn-danger').click()
        cy.get('#myModalLabel').should('be.visible')
        cy.get('.ajax-form-success > .text-center').should('have.text', "Suppression réussie")
        cy.get('.center-block > .btn').click()
        cy.get('#demandeurLink').should('be.visible')

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