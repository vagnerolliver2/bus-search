const pagePath = '/'
const selectors = {
  navbar: '[data-test=navbar]',
  logoImg: '[data-test=navbar__logo-img]',
  logoTitle: '[data-test=navbar__logo-title]'
}

context('[navbar]', () => {
  beforeEach(() => {
    cy.visit(pagePath)
  })

  it('performing navbar', () => {
    cy.get(selectors.logoImg)

    cy.get(selectors.logoTitle).should('have.text', 'POA Ônibus - Encontre aqui')
  })

  it('takes a screenshot', function () {
    cy.get(selectors.navbar).screenshot('navbar')
  })
})
