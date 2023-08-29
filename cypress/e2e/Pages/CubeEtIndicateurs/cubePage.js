
export class CubePage {


    ouvrirPageCube() {
        cy.get('.navbar-toggle').click()
        cy.contains("Cube").realHover()
        cy.contains(' Paramétrage cube').click()
    }

    ajoutCube() {
        cy.get('#addImportProductButton > a').click()
    }


    entrerNomCube(nom) {
        cy.get('#Nom').wait(500).type(nom)
    }

    choisirAxeCube() {
        cy.get('#ListeAxe_0__Checked').then(checkbox => {
            cy.wrap(checkbox).check().should("be.checked")
        })
    }

    chercherCube(nom) {
        cy.contains('td', nom).should('be.visible').and('have.text', nom.toString().slice(2, -3))
    }


    supprimerCube1(nom) {
        cy.contains('tr', nom).should('be.visible').and('have.text', nom.toString().slice(2, -3))
            .invoke('text')
            .then((texte) => {
                cy.xpath('//a[@href="/Cube/Cubes/Delete/' + texte.trim() + '"]').click()

            });


        cy.get('.modal-title').should('be.visible').invoke('text').then((titrePopUpSuppression) => {
            expect(titrePopUpSuppression).eq('Suppression')
        });

        cy.get('.row > p').should('have.text', 'Confirmez vous la suppression du cube : ' + nom.toString().slice(2, -3) + '? ')
        cy.get('.btn-primary').click()
    }

    supprimerCube2(nom){
        cy.contains('td', nom).parent().find('[title= "Supprimer"]').click() 
        cy.wait(1500)
        cy.get('.modal-title').should('be.visible').invoke('text').then((titrePopUpSuppression) => {
            expect(titrePopUpSuppression).eq('Suppression')
        });

        cy.get('.row > p').should('have.text', 'Confirmez vous la suppression du cube : ' + nom.toString().slice(2, -3) + '? ')
        cy.get('.btn-primary').click()
    }

    enregistrerCube() {
        cy.get('#btnValidate').click()
    }

    assertionNomCubeError() {
        cy.get('#Nom-error').should('be.visible').and('have.text', 'Le champ Nom est requis.')
    }

    assertionAxeError() {
        cy.get('.ajax-form-success > .text-center').should('be.visible').and('contain', 'attribué aucun axe au cube, veuillez en attribuer un')
        cy.get('.btn').click()
    }

    assertionReussiteAjoutCube(nom) {
        cy.get('.modal-header > p').should("be.visible")
        cy.get('.ajax-form-success > :nth-child(2)').should('have.text', "Succès de l'ajout du cube : " + nom)
        cy.get('.btn').click()
    }

    assertionExistenceNomCube() {
        cy.get('.ajax-form-success > .text-center').should('be.visible').and('have.text', 'Le nom que vous avez renseigné est déjà utilisé')
        cy.get('.btn').click()
    }

    assertionSuppressionCubeReussite() {
        cy.get('#myModalLabel').should('be.visible').and('have.text', 'Suppression réussie')
        cy.get('.btn').click()

    }



}