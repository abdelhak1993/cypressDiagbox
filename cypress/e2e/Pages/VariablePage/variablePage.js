
export class VariablePage {


    ouvrirPageVariable() {
        cy.get('.navbar-toggle').click()
        cy.contains("Paramétrage").realHover()
        cy.contains('Variables').click()
    }

    ajouterUneVariable() {
        cy.get('#btnAjoutGroupe').click()
    }

    choisirPosteAcquisition(posteAcquisiton) {
        cy.get('#IdSite').select(posteAcquisiton)
    }

    entrerNomVariable(nomVariable) {
        cy.get('.col-md-8 > #Nom').type(nomVariable)
    }

    entrerMnemoniqueVariable(mnemonique) {
        cy.get('.col-md-8 > #Mnemonique').type(mnemonique)
    }

    entrerPasdArchivage(pas) {
        cy.xpath('//a[@href="#tab-2"]').click()
        cy.get('#periode_acquisition').type(pas)

    }

    enterTypeVariable(type) {
        cy.get('#IdType').select(type)
    }


    EnregistrerAjoutVariable() {
        cy.get('#js-submit').click()

    }

    AssertionPosteAcquisitionRequis() {
        cy.xpath('//*[@id="tab-1"]/fieldset/div[1]/div/span').should('be.visible')
        cy.xpath('//*[@id="tab-1"]/fieldset/div[1]/div/span').should("have.text", "Poste d'acquisition requis")
    }

    AssertionNom() {
        cy.xpath('//*[@id="tab-1"]/fieldset/div[2]/div/span').should('be.visible')
        cy.xpath('//*[@id="tab-1"]/fieldset/div[2]/div/span').should("have.text", "Nom requis")
    }

    AssertionMnemonique() {
        cy.xpath('//*[@id="tab-1"]/fieldset/div[3]/div/span').should('be.visible')
        cy.xpath('//*[@id="tab-1"]/fieldset/div[3]/div/span').should("have.text", "Mnémonique requis")
    }
    
    clickerContinuer() {
        cy.get('.center-block > .btn').click()
    }

    modifierVariable(nom){
             cy.contains('td', nom.trim()).should('be.visible').prevAll('th').next('td').invoke('text')
                .then((texte) => {
                    cy.get('#edit-var-'+texte+' > .fa').click()

                });                        
    
    }

}