describe('Test whiskey purchase page initial state', () => {
  it('goes to purchase page ', () => {
    cy.visit('/');
    cy.get('[data-cy="first-name-input"]')
      .should('exist')
      .and('be.visible');
    cy.get('[data-cy="last-name-input"]')
      .should('exist')
      .and('be.visible');
    cy.get('[data-cy="email-input"]')
      .should('exist')
      .and('be.visible');
    cy.get('[data-cy="phone-input"]')
      .should('exist')
      .and('be.visible');
    cy.get('[data-cy="whiskey-input"]')
      .should('exist')
      .and('be.visible');
    cy.get('[data-cy="quantity-input"]')
      .should('exist')
      .and('be.visible');
    cy.get('[data-cy="address-input"]')
      .should('exist')
      .and('be.visible');
    cy.get('[data-cy="ageVerified-input"]')
      .should('exist')
      .and('be.visible')
      .find('input[type="checkbox"]')
      .invoke('prop', 'checked')
      .then((isChecked) => {
        expect(isChecked).to.eq(false);
      });
    cy.get('[data-cy="city-input"]')
      .should('not.exist');
  });
});

describe('Test whiskey purchase page verify age', () => {
  it('goes to purchase page', () => {
    cy.visit('/');
    cy.get('[data-cy="first-name-input"]')
      .should('exist')
      .and('be.visible');
    cy.get('[data-cy="last-name-input"]')
      .should('exist')
      .and('be.visible');
    cy.get('[data-cy="ageVerified-input"]')
      .should('exist')
      .and('be.visible')
      .find('input[type="checkbox"]')
      .invoke('prop', 'checked')
      .then((isChecked) => {
        expect(isChecked).to.eq(false);
      });
    cy.get('[data-cy="ageVerified-input"]')
      .find('input[type="checkbox"]')
      .check()
      .invoke('prop', 'checked')
      .then((isChecked) => {
        expect(isChecked).to.eq(true);
      });
    cy.get('[data-cy="date-input"]')
      .should('exist')
      .and('be.visible');
    cy.get('[data-cy="city-input"]')
      .should('exist')
      .and('be.visible');
    cy.get('[data-cy="file-input"]')
      .should('exist')
      .and('be.visible');
  });
});

describe('Test whiskey purchase page submit success', () => {
  it('goes to purchase page', () => {
    cy.visit('/');
    cy.get('[data-cy="first-name-input"]')
      .should('exist')
      .and('be.visible')
      .find('input[type="text"]')
      .type('Krum');
    cy.get('[data-cy="last-name-input"]')
      .should('exist')
      .and('be.visible')
      .find('input[type="text"]')
      .type('Dachev');
    cy.get('[data-cy="email-input"]')
      .should('exist')
      .and('be.visible')
      .find('input[type="text"]')
      .type('kdachev@codixis.com');
    cy.get('[data-cy="phone-input"]')
      .should('exist')
      .and('be.visible')
      .find('input[type="text"]')
      .type('0887654321');
    cy.get('[data-cy="whiskey-input"]')
      .should('exist')
      .and('be.visible')
      .click();
    cy.contains('Jameson')
      .click();
    cy.get('[data-cy="quantity-input"]')
      .should('exist')
      .and('be.visible')
      .find('input[type="number"]')
      .type('7');
    cy.get('[data-cy="address-input"]')
      .should('exist')
      .and('be.visible')
      .find('textarea[name="address"]')
      .type('street');
    cy.get('[data-cy="ageVerified-input"]')
      .find('input[type="checkbox"]')
      .check()
      .invoke('prop', 'checked')
      .then((isChecked) => {
        expect(isChecked).to.eq(true);
      });
    cy.get('[data-cy="date-input"]')
      .should('exist')
      .and('be.visible')
      .find('input[placeholder="MM/DD/YYYY"]')
      .type('12/12/2023');
    cy.get('[data-cy="city-input"]')
      .should('exist')
      .and('be.visible')
      .click();
    cy.contains('Plovdiv')
      .click();
    cy.get('[data-cy="file-input"]')
      .should('exist')
      .and('be.visible')
      .find('input[type="file"]')
      .selectFile('cypress/fixtures/sample.pdf', { force: true });
    cy.get('[data-cy="submit-button"]')
      .click();
    cy.get('[data-cy="file-attached"]')
      .should('exist')
      .and('be.visible')
    cy.get('[data-cy="mui-snackbar"]')
      .should('exist')
      .and('be.visible');
  });
});

describe('Test whiskey purchase page submit empty fields', () => {
  it('goes to purchase page', () => {
    cy.visit('/');
    cy.get('[data-cy="first-name-input"]')
      .should('exist')
      .and('be.visible')
    cy.get('[data-cy="last-name-input"]')
      .should('exist')
      .and('be.visible')
    cy.get('[data-cy="email-input"]')
      .should('exist')
      .and('be.visible')
    cy.get('[data-cy="phone-input"]')
      .should('exist')
      .and('be.visible')
    cy.get('[data-cy="whiskey-input"]')
      .should('exist')
      .and('be.visible')
    cy.get('[data-cy="quantity-input"]')
      .should('exist')
      .and('be.visible')
    cy.get('[data-cy="address-input"]')
      .should('exist')
      .and('be.visible')
    cy.get('[data-cy="ageVerified-input"]')
      .find('input[type="checkbox"]')
      .invoke('prop', 'checked')
      .then((isChecked) => {
        expect(isChecked).to.eq(false);
      });
    cy.get('[data-cy="date-input"]')
      .should('not.exist')
    cy.get('[data-cy="city-input"]')
      .should('not.exist')
    cy.get('[data-cy="file-input"]')
      .should('not.exist')
    cy.get('[data-cy="submit-button"]')
      .click();
    cy.get('[data-cy="mui-snackbar"]')
      .should('not.exist')
    cy.get('[data-cy="first-name-input"]')
      .find('p')
      .should('have.text', 'First Name is a required field');
    cy.get('[data-cy="last-name-input"]')
      .find('p')
      .should('have.text', 'Last Name is a required field');
    cy.get('[data-cy="email-input"]')
      .find('p')
      .should('have.text', 'Email is a required field');
    cy.get('[data-cy="phone-input"]')
      .find('p')
      .should('have.text', 'Phone is a required field');
    cy.get('[data-cy="select-input-helper-text"]')
      .should('have.text', 'Whiskey is a required field');
    cy.get('[data-cy="quantity-input"]')
      .find('p')
      .should('have.text', 'Quantity is a required field');
    cy.get('[data-cy="address-input"]')
      .find('p')
      .should('have.text', 'Address is a required field');
  });
});

describe('Test whiskey purchase page submit invalid fields', () => {
  it('goes to purchase page', () => {
    cy.visit('/');
    cy.get('[data-cy="email-input"]')
      .should('exist')
      .and('be.visible')
      .find('input[type="text"]')
      .type('cow');
    cy.get('[data-cy="phone-input"]')
      .should('exist')
      .and('be.visible')
      .find('input[type="text"]')
      .type('88jh');
    cy.get('[data-cy="quantity-input"]')
      .should('exist')
      .and('be.visible')
      .find('input[type="number"]')
      .type('1');
    cy.get('[data-cy="ageVerified-input"]')
      .find('input[type="checkbox"]')
      .check()
      .invoke('prop', 'checked')
      .then((isChecked) => {
        expect(isChecked).to.eq(true);
      });
    cy.get('[data-cy="date-input"]')
      .should('exist')
      .and('be.visible')
      .find('input[placeholder="MM/DD/YYYY"]')
      .type('12/12/2022');
    cy.get('[data-cy="submit-button"]')
      .click();
    cy.get('[data-cy="mui-snackbar"]')
      .should('not.exist')
    cy.get('[data-cy="email-input"]')
      .find('p')
      .should('have.text', 'Entered value does not match email format');
    cy.get('[data-cy="phone-input"]')
      .find('p')
      .should('have.text', 'Entered value does not match phone format');
    cy.get('[data-cy="quantity-input"]')
      .find('p')
      .should('have.text', 'Quantity cannot be less than 3');
    cy.get('[data-cy="date-input"]')
      .find('p')
      .should('have.text', 'Please select a date after today');
  });
});

describe('Test whiskey purchase page remove file and city inputs after adding them', () => {
  it('goes to purchase page', () => {
    cy.visit('/');
    cy.get('[data-cy="ageVerified-input"]')
      .find('input[type="checkbox"]')
      .check()
      .invoke('prop', 'checked')
      .then((isChecked) => {
        expect(isChecked).to.eq(true);
      });
    cy.get('[data-cy="city-input"]')
      .should('exist')
      .and('be.visible')
      .click();
    cy.contains('Plovdiv')
      .click();
    cy.get('[data-cy="file-input"]')
      .should('exist')
      .and('be.visible')
      .find('input[type="file"]')
      .selectFile('cypress/fixtures/sample.pdf', { force: true });
    cy.get('[data-cy="file-attached"]')
      .should('exist')
      .and('be.visible')
    cy.get('[data-cy="city-input"]')
      .find('button[title="Clear"]')
      .click()
    cy.get('[data-cy="city-input"]')
      .find('input[type="text"]')
      .should('have.value', '')
    cy.get('[data-cy="delete-file"]')
      .click();
    cy.get('[data-cy="file-attached"]')
      .should('not.exist');
  });
});


export { };
