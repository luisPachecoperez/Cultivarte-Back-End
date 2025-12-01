import { personasSedesResolvers } from '../personas-sedes-resolvers';
import { controller } from '../personas-sedes-resolvers';
import { PersonasSede } from '../../../domain/entities/personas-sede';

describe('personasSedesResolvers', () => {
  it('debe definir los resolvers de Query y Mutation', () => {
    expect(personasSedesResolvers.Query.getPersonaSede).toBeDefined();
    expect(personasSedesResolvers.Query.getPersonasSedes).toBeDefined();
    expect(personasSedesResolvers.Mutation.createPersonaSede).toBeDefined();
    expect(personasSedesResolvers.Mutation.updatePersonaSede).toBeDefined();
    expect(personasSedesResolvers.Mutation.deletePersonaSede).toBeDefined();
  });

  it('getPersonaSede llama al método del controlador', async () => {
    const mockPersonaSede: PersonasSede = {
      id_personas_sede: 'ps1',
      id_persona: 'p1',
      id_sede: '1',
      id_creado_por: 'user1',
      fecha_creacion: '2023-01-01',
      id_modificado_por: 'user2',
      fecha_modificacion: '2023-01-02',
    };
    const spy = jest.spyOn(controller, 'getById').mockResolvedValue(mockPersonaSede);
    const args = { id_sede: '1' };
    await personasSedesResolvers.Query.getPersonaSede({}, args);
    expect(spy).toHaveBeenCalledWith('1');
    spy.mockRestore();
  });

  it('getPersonasSedes llama al método del controlador', async () => {
    const spy = jest.spyOn(controller, 'getAll').mockResolvedValue([]);
    await personasSedesResolvers.Query.getPersonasSedes();
    expect(spy).toHaveBeenCalled();
    spy.mockRestore();
  });

  it('createPersonaSede llama al método del controlador', async () => {
    const mockPersonaSede: PersonasSede = {
      id_personas_sede: 'ps1',
      id_persona: 'p1',
      id_sede: '1',
      id_creado_por: 'user1',
      fecha_creacion: '2023-01-01',
      id_modificado_por: 'user2',
      fecha_modificacion: '2023-01-02',
    };
    const spy = jest.spyOn(controller, 'create').mockResolvedValue(mockPersonaSede);
    const args = { personasSede: mockPersonaSede };
    await personasSedesResolvers.Mutation.createPersonaSede({}, args);
    expect(spy).toHaveBeenCalledWith(mockPersonaSede);
    spy.mockRestore();
  });

  it('updatePersonaSede llama al método del controlador', async () => {
    const mockPersonaSede: PersonasSede = {
      id_personas_sede: 'ps1',
      id_persona: 'p1',
      id_sede: '1',
      id_creado_por: 'user1',
      fecha_creacion: '2023-01-01',
      id_modificado_por: 'user2',
      fecha_modificacion: '2023-01-02',
    };
    const spy = jest.spyOn(controller, 'update').mockResolvedValue(mockPersonaSede);
    const args = { id_sede: '1', personasSede: mockPersonaSede };
    await personasSedesResolvers.Mutation.updatePersonaSede({}, args);
    expect(spy).toHaveBeenCalledWith('1', mockPersonaSede);
    spy.mockRestore();
  });

  it('deletePersonaSede llama al método del controlador', async () => {
    const mockRespuesta = { exitoso: 'S' as 'S', mensaje: 'Eliminado correctamente' };
    const spy = jest.spyOn(controller, 'delete').mockResolvedValue(mockRespuesta);
    const args = { id_sede: '1' };
    await personasSedesResolvers.Mutation.deletePersonaSede({}, args);
    expect(spy).toHaveBeenCalledWith('1');
    spy.mockRestore();
  });
});
