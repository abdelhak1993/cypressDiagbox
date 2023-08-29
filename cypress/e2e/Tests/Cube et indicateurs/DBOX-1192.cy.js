///<reference types="cypress" />

import { CubePage } from "../../Pages/CubeEtIndicateurs/cubePage"

  //const cubePage = new CubePage()
  const cubePage = new CubePage()

  beforeEach(() => {
    cy.visit("http://192.168.92.33:8080/login/index")
    cy.get('#UserName').type('Calasys')
    cy.get('#Password').type('Di@g!2014')
    cy.get('#Domain', { timeout: 6000 }).uncheck()
    cy.get('.btn-primary').click()
})

it('ajouter un cube sans nom', function() {
    cubePage.ouvrirPageCube()
    cubePage.ajoutCube()
    cubePage.enregistrerCube()
    cubePage.assertionNomCubeError()
    cy.log("Bonjour")

})

it('ajouter un cube sans axe', function() {
    cubePage.ouvrirPageCube()
    cubePage.ajoutCube()
    cubePage.entrerNomCube("Cube test auto")
    cubePage.enregistrerCube()
    cubePage.assertionAxeError()

})

it('ajouter un cube avec succés', function() {
    cubePage.ouvrirPageCube()
    cubePage.ajoutCube()
    cubePage.entrerNomCube('Cube test auto')
    cubePage.choisirAxeCube()
    cubePage.enregistrerCube()
    cubePage.assertionReussiteAjoutCube('Cube test auto')

})

it('ajouter un cube avec un nom deja existant', function() {
    cubePage.ouvrirPageCube()
    cubePage.ajoutCube()
    cubePage.entrerNomCube('Cube test auto')
    cubePage.choisirAxeCube()
    cubePage.enregistrerCube()
    cubePage.assertionExistenceNomCube()
})

it('Supprimer un cube deja existant', function() {
    cubePage.ouvrirPageCube()
    cubePage.chercherCube(new RegExp("^" + 'Cube test auto' + "$", "g"))
    cubePage.supprimerCube2(new RegExp("^" + 'Cube test auto' + "$", "g"))
    cubePage.assertionSuppressionCubeReussite()

})







