// tests/auth.test.js

// Importa as funções do módulo auth
const { generateToken, verifyToken } = require('../utils/auth');

describe('Testes do módulo de autenticação JWT', () => {
  
  // Testa se o token gerado é uma string (JWT)
  test('Deve gerar um token JWT válido', () => {
    const payload = { userId: 42, role: 'admin' };
    const token = generateToken(payload);
    
    // O token deve ser uma string
    expect(typeof token).toBe('string');
    
    // O token deve conter três partes separadas por pontos (padrão JWT)
    expect(token.split('.').length).toBe(3);
  });
  
  // Testa se o token gerado pode ser verificado e decodificado corretamente
  test('Deve verificar e decodificar o token corretamente', () => {
    const payload = { userId: 42, role: 'admin' };
    const token = generateToken(payload);
    
    // Decodifica o token
    const decoded = verifyToken(token);
    
    // Deve retornar um objeto não nulo
    expect(decoded).not.toBeNull();
    
    // O payload decodificado deve conter as mesmas propriedades
    expect(decoded.userId).toBe(payload.userId);
    expect(decoded.role).toBe(payload.role);
  });
  
  // Testa o comportamento quando o token é inválido ou corrompido
  test('Deve retornar null para token inválido', () => {
    const invalidToken = 'token.invalido.falso';
    
    // A verificação deve falhar e retornar null
    const result = verifyToken(invalidToken);
    expect(result).toBeNull();
  });

});
