import { NormePAge } from "../../Pages/Intervenants/normePage";

const norme = new NormePAge()

beforeEach(() => {
    cy.visit("http://192.168.92.33:8080/login/index")
    cy.get('#UserName').type('Calasys')
    cy.get('#Password').type('Di@g!2014')
    cy.get('#Domain', { timeout: 6000 }).uncheck()
    cy.get('.btn-primary').click()
})

it('ajouter une norme assainissement sans champs ' , () => {
    norme.ouvrirPageNorme()
    norme.ajouterUneNorme()
    norme.enregistrerNorme()
    norme.assertionChampsVide()

})

it('ajouter une norme eau potable sans champs ' , () => {
    norme.ouvrirPageNorme()
    norme.ajouterUneNorme()
    norme.choixservice("Eau potable")
    norme.enregistrerNorme()
    norme.assertionChampsVide()
})

it('ajouter une norme eau potable sans contre analyse avec succées' , () => {
    norme.ouvrirPageNorme()
    norme.ajouterUneNorme()
    norme.choixservice("Eau potable")
    norme.enterNom("NormeEau1")
    norme.enterTypeEau("Traitée")
    norme.choisirParamètres("Indice Biologique Global Normalisé (I.B.G.N.)")
    norme.desactiverContreAnalyse()
    norme.enregistrerNorme()
    norme.assertionAjoutNormeAvecSucces()
})

it('ajouter une norme eau potable avec contre analyse avec succées' , () => {
    norme.ouvrirPageNorme()
    norme.ajouterUneNorme()
    norme.choixservice("Eau potable")
    norme.enterNom("NormeEau2")
    norme.enterTypeEau("Traitée")
    norme.choisirParamètres("Indice Biologique Global Normalisé (I.B.G.N.)")
    norme.activerContreAnalyse()
    norme.ajouterContrerAnalyse("Test algue")
    norme.enregistrerNorme()
    norme.assertionAjoutNormeAvecSucces()
})


it('ajouter une norme assainissement sans contre analyse avec succées' , () => {
    norme.ouvrirPageNorme()
    norme.ajouterUneNorme()
    norme.choixservice("Assainissement")
    norme.enterNom("NormeAssainissement1")
    norme.choisirParamètres("Indice Biologique Global Normalisé (I.B.G.N.)")
    norme.desactiverContreAnalyse()
    norme.enregistrerNorme()
    norme.assertionAjoutNormeAvecSucces()
})

it('ajouter une norme assainissement avec contre analyse avec succées' , () => {
    norme.ouvrirPageNorme()
    norme.ajouterUneNorme()
    norme.choixservice("Assainissement")
    norme.enterNom("NormeAssainissement2")
    norme.choisirParamètres("Indice Biologique Global Normalisé (I.B.G.N.)")
    norme.activerContreAnalyse()
    norme.ajouterContrerAnalyse("Test algue")
    norme.enregistrerNorme()
    norme.assertionAjoutNormeAvecSucces()
})

it('ajouter une norme avec un nom déjà existant' , ()  => {
    norme.ouvrirPageNorme()
    norme.ajouterUneNorme()
    norme.choixservice("Assainissement")
    norme.enterNom("NormeAssainissement2")
    norme.choisirParamètres("Indice Biologique Global Normalisé (I.B.G.N.)")
    norme.desactiverContreAnalyse()
    norme.enregistrerNorme()
    norme.assertionNomDejaExistant()
})
it.only('Supprimer une norme eau ',  () => {
    norme.ouvrirPageNorme()
    norme.filtrerService("Eau potable")
    norme.supprimerNorme(new RegExp("^" + 'NormeEau1' + "$", "g"))
    norme.assertionSuppressionReussie()
    norme.filtrerService("Eau potable")
    norme.supprimerNorme(new RegExp("^" + 'NormeEau2' + "$", "g"))
    norme.assertionSuppressionReussie()
})

it.only('Supprimer une norme assainissement ',  () => {
    norme.ouvrirPageNorme()
    norme.filtrerService("Assainissement")
    norme.supprimerNorme(new RegExp("^" + 'NormeAssainissement1' + "$", "g"))
    norme.assertionSuppressionReussie()
    norme.filtrerService("Assainissement")
    norme.supprimerNorme(new RegExp("^" + 'NormeAssainissement2' + "$", "g"))
    norme.assertionSuppressionReussie()
})
