
export class PagePreleveur {

    ouvrirPagePreleveurs() {
        cy.get('.navbar-toggle').click()
        cy.contains(" Réglementaire ").wait(500).realHover()
        cy.contains(" Parametrage ").wait(500).realHover()
        cy.contains(' Intervenants').click()
        cy.wait(2000)
        cy.get('#IntervenantType').select("Préleveurs")

    }

    assertionPagePréleverus() {
        cy.get('thead tr').find('th').should(colonne => {
            expect(colonne).to.have.length(7)
            expect(colonne.eq(0).text()).to.eq("Code SIRET")
            expect(colonne.eq(1).text()).to.eq("Nom")
            expect(colonne.eq(2).text()).to.eq("Service")
            expect(colonne.eq(4).text()).to.eq("Email")
        })

    }


    filtreServicePreleveur() {
        const service = ["Eau potable", "Assainissement"]     
        cy.wrap(service).each(serviceItem => {
            cy.get('#ServicesSelectList').select(serviceItem)
            cy.get('#seachBtn').click()
            cy.wait(1000)
            cy.get('tbody tr').find('td').then(ligne => {
                cy.wrap(ligne.eq(2).text()).should('eq', serviceItem)
            })
        })
    }

    ajouterPreleveur() {
        cy.get('#preleveursLink').click()
    }

    enterSiret(siret) {
        cy.get('#CodeSiret').clear().type(siret)
    }

    enterNom(nom) {
        cy.get('#Nom').clear().type(nom)
    }
    enterChoixService(service) {
        cy.get('#Service').select(service)
    }
    enterMail(mail) {
        cy.get('#AdresseMail').clear().type(mail)
    }

    enterService(service) {
        cy.get('#Service').select(service)
    }

    enregisterAjout() {
        cy.get('.btn-primary').click()
    }
    assertionChampSiretVide() {
        cy.get('#CodeSiret_validationMessage').then(error => {
            expect(error).to.have.length(1).and.to.have.text("Le code SIRET est requis")
        })
    }
    assertionChampNomVide() {
        cy.get('#Nom_validationMessage').then(error => {
            expect(error).to.have.length(1).and.to.have.text("Le nom est requis")
        })
    }
    assertionMailVide() {
        cy.get('#AdresseMail_validationMessage').should('be.visible').and('contain.text', "L'adresse mail est requis")
    }

    assertionInalideMailAndSiret() {
        cy.get('.field-validation-error').then(error => {
            expect(error).to.have.length(2)
        })
    }

    assertionAjoutPréleveur() {
        cy.contains('Un préleveur a été crée avec sucées.').should('be.visible')
    }


    supprimerPréleveur(nom){
        cy.contains('td', nom).parent().find('[title= "Supprimer"]').click() 
        cy.wait(1500)
        cy.get('.modal-title').should('be.visible').invoke('text').then((titrePopUpSuppression) => {
            expect(titrePopUpSuppression).eq('Suppression du préleveur: "'+nom.toString().slice(2,-3)+'"')
        });

        cy.get('.modal-body > p').eq(0).should('have.text', 'Êtes-vous sûr de vouloir supprimer ce préleveur? La suppression est irréversible.')
        cy.get('.btn-danger').click()
    }

    assertionReussiteSuppression(){
        cy.get('#myModalLabel').should('be.visible')
        cy.get('.ajax-form-success > .text-center').should('have.text',"Suppression réussie")

    }
}