export class NormePAge {

    ouvrirPageNorme() {
        cy.get('.navbar-toggle').click()
        cy.contains(" Réglementaire ").wait(500).realHover()
        cy.contains(" Parametrage ").wait(500).realHover()
        cy.contains(' Norme').click()
    }

    assertionPageNormeEauPotable() {
        // Sélectionner l'élément contenant la liste des normes d'eau potable et vérifier les colonnes
        cy.get('#NormesList').find('th').should(colonne => {
            // Vérifier qu'il y a 4 colonnes
            expect(colonne).to.have.length(4);

            // Vérifier que le texte dans la première colonne est "Nom"
            expect((colonne).eq(0).text()).to.eq("Nom");
            // Vérifier que le texte dans la deuxième colonne est "Type d'eau"
            expect((colonne).eq(1).text()).to.eq("Type d'eau");
            expect((colonne).eq(2).text()).to.eq("Couleur");
        });
        cy.get('#Nom').should('be.visible');
        cy.get('#Service').should('be.visible');
    }

    filtrerService(service){
        // Sélectionner l'élément avec l'ID "Service" et choisir "Assainissement" dans la liste déroulante
        cy.get('#Service').select(service);
        cy.get('.pull-right > .btn').click();
        cy.wait(200);
    }


    assertionPageNormeAssainissement() {
        // Sélectionner l'élément avec l'ID "NormesList" et vérifier les colonnes de la table
        cy.get('#NormesList').find('th').should(colonne => {
            // Vérifier qu'il y a exactement 4 colonnes dans la table
            expect(colonne).to.have.length(4);

            // Vérifier le texte de chaque colonne spécifique
            // Première colonne (index 0) : "Nom" etc ..
            expect((colonne).eq(0).text()).to.eq("Nom");
            expect((colonne).eq(1).text()).to.eq("Ouvrages");
            expect((colonne).eq(2).text()).to.eq("Couleur");
        });
        cy.get('#Nom').should('be.visible');
        cy.get('#Service').should('be.visible');
    }


    ajouterUneNorme() {                                                    // Cliquer pour ajouter une norme
        cy.contains('Ajouter une norme').click()
    }

    enregistrerNorme() {                                                   //Enregistrer une norme
        cy.get('#submit-form').click()
    }

    assertionChampsVide() {                                                 // Assertion pour vérifier les messages d'erreur lorsque des champs sont vides lors de l'enregistrement

        cy.get('#serviceList').invoke('text').then((service) => {
        // Vérifier le type de service sélectionné
            if (service == "Eau potable") {
                cy.get('#errorNom').should('be.visible')
                cy.get('#errorParam').should('be.visible')
                cy.get('#error').should('be.visible')
            } else {
                cy.get('#errorNom').should('be.visible')
                cy.get('#errorParam').should('be.visible')
            }
        })
    }

    choixservice(service) {                                                 // choisir un service (eau potable ou assainissement)
        cy.get('#serviceList').select(service)
    }

    enterNom(Nom) {                                                          // entrer un nom pour la norme 
        cy.get(':nth-child(2) > #Nom').clear().type(Nom)
    }

    enterTypeEau(type) {                                                      // choisir un type d'eau 
        cy.get('#TypeEauList').select(type)
    }

    choisirParamètres(param1) {                                              
            // Sélectionner l'élément contenant la liste déroulante des paramètres et cliquer dessus
        cy.get('.modal-body > .container-fluid > .parametre > .col-md-12 > .k-widget > .k-multiselect-wrap').click()

            // Sélectionner l'élément avec l'ID "RefParamSelected_listbox" et cliquer sur l'option contenant le texte "param1"
        cy.get('#RefParamSelected_listbox').contains(param1).click()
    }

    ajouterContrerAnalyse(param1) {        
       // ajouter une contre-analyse avec un paramètre spécifique                                   
        cy.get(' td [type = "button"]').eq(0).click()

        // Sélectionner l'élément contenant la liste déroulante des paramètres et cliquer dessus
        cy.get('fieldset.clearfix > .container-fluid > .parametre > .col-md-12 > .k-widget > .k-multiselect-wrap').click()
        cy.get('#RefParamTemporaryContreAnalyseAvailable_listbox').contains(param1).click()
        //Enregistrer 
        cy.get('.container-fluid > .modal-footer > .btn-primary').click()
    }

    activerContreAnalyse() {                                                   // cocher la case pour activer le contre analyse
        cy.get('#ContreAnalyse').check()
    }

    desactiverContreAnalyse() {                                                // décocher la case pour activer le contre analyse
        cy.get('#ContreAnalyse').uncheck()
    }

    assertionAjoutNormeAvecSucces() {                                           // Vérifier l'ajout de norme avec succés ( message de réussite)
        cy.get('#myModalLabel').should('be.visible').should('have.text', "Nouvelle norme")
        cy.get('.ajax-form-success > .text-center').should('have.text', "Enregistrement réussi")
        cy.get('.center-block > .btn').click()
    }

    assertionNomDejaExistant() {                                                // vérifier l'apparition de message de nom existant 
        cy.get('#errorNom').should('be.visible')
            .should('have.text', "Nom déjà utilisé.")
    }

    supprimerNorme(nom){
        cy.contains('td', nom).parent().find('[title= "Supprimer le profil de visibilité"]').click()
        cy.get('.modal-title').should('be.visible').invoke('text').then((titrePopUpSuppression) => {
            expect(titrePopUpSuppression).eq("Supprimer une norme d'analyse")
        });
        cy.get('.alert').contains('Vous êtes sur le point de supprimer la norme ' + nom.toString().slice(2, -3) + ' du système.')
        cy.get('.modal-footer > .btn-primary').click()
    }

    assertionSuppressionReussie(){
        cy.contains("Norme supprimée avec succès").should('be.visible')
        cy.contains('Continuer').click()
    }

}