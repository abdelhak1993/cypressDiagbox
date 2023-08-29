////<reference types="cypress" />
import { VariablePage } from "../../Pages/VariablePage/variablePage.js"

const variablePage = new VariablePage()



beforeEach(() => {
    cy.visit("http://192.168.92.33:8080/login/index")
    cy.get('#UserName').type('Calasys')
    cy.get('#Password').type('Di@g!2014')
    cy.get('#Domain', { timeout: 6000 }).uncheck()
    cy.get('.btn-primary').click()
})

it('ajout variable sans nom ', function () {

    variablePage.ouvrirPageVariable()
    variablePage.ajouterUneVariable()
    variablePage.choisirPosteAcquisition("4_VENTS")
    variablePage.entrerMnemoniqueVariable("Mn1")
    variablePage.EnregistrerAjoutVariable()
    variablePage.AssertionNom()
    cy.wait(3000)
    

})

it('ajout variable sans mnémonique ', function () {

    variablePage.ouvrirPageVariable()
    variablePage.ajouterUneVariable()
    variablePage.choisirPosteAcquisition("4_VENTS")
    variablePage.entrerNomVariable("Nom1")
    variablePage.EnregistrerAjoutVariable()
    variablePage.AssertionMnemonique()
    cy.wait(3000)
})

it('ajout variable sans poste acquisition ', function () {
    variablePage.ouvrirPageVariable()
    variablePage.ajouterUneVariable()
    variablePage.entrerNomVariable("Nom1")
    variablePage.entrerMnemoniqueVariable("Mn1")
    variablePage.EnregistrerAjoutVariable()
    variablePage.AssertionPosteAcquisitionRequis()
    cy.wait(3000)
})

it('ajout variable avec succés', function () {
    variablePage.ouvrirPageVariable()
    variablePage.ajouterUneVariable()
    variablePage.choisirPosteAcquisition("4_VENTS")
    variablePage.entrerNomVariable("Nom6")
    variablePage.entrerMnemoniqueVariable("Mn6")
    variablePage.enterTypeVariable("TC-TéléCommande")
    variablePage.EnregistrerAjoutVariable()
    cy.wait(1500)
    variablePage.clickerContinuer()
})




