

describe('Heroku table tests', () => {

  beforeEach(() => {
    cy.fixture('example').as('usersData');
  });

  it('asserting table data', () => {
    cy.visit('https://testpages.herokuapp.com/styled/tag/dynamic-table.html');
    cy.get('#dynamictable').should('be.visible');
    cy.get('summary').click();
    cy.get('@usersData').then(data => {
      const userData = JSON.stringify(data)
      cy.get('textarea#jsondata').clear().type(userData, {parseSpecialCharSequences: false} )
      cy.get('#refreshtable').click();

      data.forEach((item, index) => {
        // Assert name, age and gender in the table row
        cy.get(`#dynamictable tr:nth-child(${index + 3}) td:nth-child(1)`).should('contain', item.name);
        cy.get(`#dynamictable tr:nth-child(${index + 3}) td:nth-child(2)`).should('contain', item.age);
        cy.get(`#dynamictable tr:nth-child(${index + 3}) td:nth-child(3)`).should('contain', item.gender);
      });
    })
  })

});