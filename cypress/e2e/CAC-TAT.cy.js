describe('Central de Atendimento ao Cliente TAT', () => {
  
  beforeEach(() => {
    cy.visit('./src/index.html');
  });


  it('verifica o titulo da aplicação', () => {
    cy.title().should('include', 'Central de Atendimento ao Cliente TAT');
  });

  it('preenche os campos obrigatorio e envia o formulario', () => {
    cy.get('#firstName').as('firstName').type('Thays');
    cy.get('#lastName').as('lastName').type('Melo');
    cy.get('#email').as('email').type('thays@email.com');
    cy.get('#open-text-area').as('comment').type('Um comentário para tornar o teste mais bonito', {delay: 0});
    cy.get('.button[type="submit"]').as('send').click();
    cy.get('.success').as('successMessage').should('be.visible');
    cy.get('@successMessage').should('contain', 'Mensagem enviada com sucesso.')

  });

  it('exibe mensagem de erro ao submeter o formulário com um email com formatação inválida', () => {
    cy.get('#firstName').as('firstName').type('Thays');
    cy.get('#lastName').as('lastName').type('Melo');
    cy.get('#email').as('email').type('emailerrado');
    cy.get('#open-text-area').as('comment').type('Um comentário para tornar o teste mais bonito', {delay: 0});
    cy.get('.button').as('send').click();
    cy.get('.error').as('errorMessage').should('be.visible');
    cy.get('@errorMessage').should('contain', 'Valide os campos obrigatórios!')
  });

  it('validacao  do campo de telefone para nao aceitar letras a-z', () => {
    cy.get('#phone').as('phone').type('oi')
    cy.get('@phone').should('be.empty');
  });

  it('exibe mensagem de erro quando o telefone se torna obrigatório mas não é preenchido antes do envio do formulário', () => {
    cy.get('#firstName').as('firstName').type('Thays');
    cy.get('#lastName').as('lastName').type('Melo');
    cy.get('#email').as('email').type('emailerrado');
    cy.get('#open-text-area').as('comment').type('Um comentário para tornar o teste mais bonito', {delay: 0});
    cy.get('#phone').as('phone').type('oi')
    cy.get('@phone').should('be.empty');
    cy.get('#phone-checkbox').click();
    cy.get('.button').as('send').click();
    cy.get('.error').as('errorMessage').should('be.visible');
    cy.get('@errorMessage').should('contain', 'Valide os campos obrigatórios!')
  });

  it('preenche e limpa os campos nome, sobrenome, email e telefone', () => {
    cy.get('#firstName').as('firstName').type('Thays');
    cy.get('@firstName').should('have.value', 'Thays');
    cy.get('@firstName').clear().should('have.value', '');

    cy.get('#lastName').as('lastName').type('Melo');
    cy.get('@lastName').should('have.value', 'Melo');
    cy.get('@lastName').clear().should('have.value', '');

    cy.get('#email').as('email').type('thays@email.com');
    cy.get('@email').should('have.value', 'thays@email.com');
    cy.get('@email').clear().should('have.value', '');

    cy.get('#phone').as('phone').type('87656785')
    cy.get('@phone').should('have.value', '87656785');
    cy.get('@phone').clear().should('have.value', '');
  });

  it('exibe mensagem de erro ao submeter o formulário sem preencher os campos obrigatórios', () => {
    cy.get('.button').as('send').click();
    cy.get('.error').as('errorMessage').should('be.visible');
    cy.get('@errorMessage').should('contain', 'Valide os campos obrigatórios!')
  });

  it('envia o formuário com sucesso usando um comando customizado', () => {
    cy.fillMandatoryFields('#firstName', 'Thays');
    cy.fillMandatoryFields('#lastName', 'Melo');
    cy.fillMandatoryFields('#email', 'thays@email.com');
    cy.fillMandatoryFields('#open-text-area', 'Um comentário para tornar o teste mais bonito');
    cy.submitResultMessage('.button', '.success', 'Mensagem enviada com sucesso.');
  })

  it('verifica se a politica de privacidade e um link', () => {
    cy.contains('Privacidade').should('have.attr', 'href', 'privacy.html').and('not.be.empty');
  })


})
