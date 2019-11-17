
const pagePath = '/'
const selectors = {
  searchInput: '[data-test=search-input__query]',
  busInputRadio: '[data-test=search-input__radio-bus]',
  microBusInputRadio: '[data-test=search-input__radio-microBus]',
  queryResults: '[data-test=search-list__query-results]',
}

context('[search-bus]', () => {
  beforeEach(() => {
    cy.visit(pagePath)
  })

  context('performing searchs', () => {
    it('should choose on item to see itinerary by \'bus\'', () => {
      cy.server()
      cy.route('GET', 'php/facades/process.php').as('dataPoa')

      cy.wait('@dataPoa').then(() => {
        cy.get(selectors.searchInput).type('maio');
      })
    })
  })
})
