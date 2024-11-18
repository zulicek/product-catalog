describe('Product Catalog', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000')
  })

  it('displays the product catalog', () => {
    cy.get('[data-testid="product-grid"]').should('be.visible')
  })

  it('allows filtering by category', () => {
    cy.get('[data-testid="category-filter"]').select('smartphones')
    cy.get('[data-testid="product-card"]').should('have.length.gt', 0)
    cy.get('[data-testid="product-card"]').first().get('[data-testid="product-name"]').should('contain', 'iPhone')
  })

  it('allows sorting products', () => {
    cy.get('[data-testid="sort-select"]').select('price-asc')
    cy.get('[data-testid="product-price"]').then($prices => {
      const prices = $prices.map((i, el) => parseFloat(el.innerText.replace('$', ''))).get()
      const sortedPrices = [...prices].sort((a, b) => a - b)
      expect(prices).to.deep.equal(sortedPrices)
    })
  })

  it('allows searching for products', () => {
    const searchTerm = 'Laptop'
    cy.get('[data-testid="search-input"]').type(searchTerm)
    cy.get('[data-testid="product-card"]').each(($card) => {
      cy.wrap($card).get('[data-testid="product-name"]').should('contain', searchTerm, { matchCase: false })
    })
  })

  it('opens product details modal', () => {
    cy.get('[data-testid="product-card-modal-trigger"]').first().click()
    cy.get('[data-testid="product-modal"]').should('be.visible')
    cy.get('[data-testid="modal-close-button"]').click()
    cy.get('[data-testid="product-modal"]').should('not.exist')
  })

  it('adds product to cart', () => {
    cy.get('[data-testid="product-card-modal-trigger"]').first().click()
    cy.get('[data-testid="add-to-cart-button"]').click()
    cy.get('[data-testid="cart-count"]').should('contain', '1')
  })

  it('handles pagination', () => {
    cy.get('[data-testid="pagination"]').should('be.visible')
    cy.get('[data-testid="page-2"]').click()
  })
})