// Update the import path if the file is named 'typeDefs.ts'
import * as typeDefsModule from '../typeDef';

describe('typeDefs GraphQL', () => {
  it('debe exportar typeDefs como un objeto gql', () => {
    expect(typeDefsModule.typeDefs).toBeDefined();
    expect(typeDefsModule.typeDefs).toHaveProperty('definitions');
  });

  it('debe incluir los fragmentos principales', () => {
    const typeDefsString = typeDefsModule.typeDefs.loc && typeDefsModule.typeDefs.loc.source.body;
  expect(typeDefsString).toContain('ParametroDetalle');
  expect(typeDefsString).toContain('ParametroGeneral');
  expect(typeDefsString).toContain('ParametriaEventos');
  expect(typeDefsString).toContain('CalendarioInput');
  expect(typeDefsString).toContain('Actividad');
  expect(typeDefsString).toContain('Sesion');
  expect(typeDefsString).toContain('Asistencia');
  expect(typeDefsString).toContain('Persona');
  expect(typeDefsString).toContain('Poblacion');
  expect(typeDefsString).toContain('Sede');
  expect(typeDefsString).toContain('PersonaSede');
  expect(typeDefsString).toContain('PersonaGrupoInteres');
  expect(typeDefsString).toContain('PersonaPrograma');
  });
});