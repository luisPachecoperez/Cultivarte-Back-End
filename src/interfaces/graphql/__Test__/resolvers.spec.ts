import * as resolversModule from '../resolvers';

describe('GraphQL resolvers', () => {
  it('debe exportar resolvers como un objeto', () => {
    expect(resolversModule.resolvers).toBeDefined();
    expect(typeof resolversModule.resolvers).toBe('object');
  });

  it('debe incluir los resolvers principales', () => {
    const keys = Object.keys(resolversModule.resolvers);
    expect(keys.length).toBeGreaterThan(0);
    // Puedes agregar validaciones específicas si conoces los nombres de los resolvers
    // Por ejemplo:
    // expect(keys).toContain('Query');
    // expect(keys).toContain('Mutation');
  });
});