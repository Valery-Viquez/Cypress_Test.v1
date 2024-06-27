context('Test Suite Functionality', () => {
  beforeEach(() => {
      cy.visit('https://zwinger.pm.epages.com/')

})
beforeEach('close the cookie window', () => {
cy.get('.cc-dialog-button-accept').click()
 })
 
it('TC 1: Search functionality', () =>{
 cy.get('.search-form-field').type('Test')
 .click({force: true})
 .type('{enter}')
})

it('TC 2: Search Filters', () => {
  cy.get('.search-form-field').type('Test')
 .click({force: true})
 .type('{enter}')
 cy.get('.product-item-title').should('contain', 'Test')
})

it('TC 3: No items found message', () =>{
  cy.get('.search-form-field').type('153sd4fsd13d2')
 .click({force: true})
 .type('{enter}')
 cy.get('h2').should('contain.text', 'Your search did not produce any results.')
})


it('TC 4: Load Page Duration', () => {
  let start = 0;
  start = performance.now();
  cy.get('.search-form-field').type('Test')
  .click({force: true})
  .type('{enter}')
  cy.log(`duration: ${performance.now() - start} s`)
})


it('TC 5: Limit of characters', () =>{
    cy.get('.search-form-field').type('Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla pharetra nunc at malesuada facilisis. Nullam quis dictum elit. Sed eget elementum tortor. Nulla volutpat est sed ex eleifend varius. In t')
      .should('have.value', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla pharetra nunc at malesuada facilisis. Nullam quis dictum elit. Sed eget elementum tortor. Nulla volutpat est sed ex eleifend varius. In t')
      .and('not.have.value', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla pharetra nunc at malesuada facilisis. Nullam quis dictum elit. Sed eget elementum tortor. Nulla volutpat est sed ex eleifend varius. In the')
})


it('TC 6: Special caracters Validation', () =>{
  cy.get('.search-form-field').type('$#%&^^')
  .click({force: true})
  .type('{enter}')
  cy.get('.header-search').find('.search-form-field').should('contain.text', 'Error, you should use valid characters')
})

it('TC 7: User Experience text', () => {
  cy.get('.search-form-field').type('$#%&^^')
  .click({force: true})
  .type('{enter}')
  cy.get('.header-search').find('.search-form-field').should('contain.text', '$#%&^^')
})

it('TC 8: Hoverstate Validation', () => {
cy.get('.search-form-field').trigger('mouseover').click().should('be.visible')
})

it('TC 9: Add item into the basket successfully', () => {
   cy.get('.search-form-field').type('Test')
 .click({force: true})
 .type('{enter}')
 cy.get('.product-item-image-container').first().click()
 cy.get('.product-availability-info').should('contain', 'In stock')
 cy.get('.product-add-cart-button').click()
 cy.get('.add-to-cart-notice-message').should('exist')
})
})