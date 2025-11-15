const soma = require('./soma');

test('soma 1 + 2 deve ser 3', () => {
  expect(soma(1, 2)).toBe(3);
});
