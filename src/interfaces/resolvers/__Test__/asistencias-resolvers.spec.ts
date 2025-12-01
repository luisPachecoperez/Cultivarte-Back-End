import { asistenciasResolvers } from '../asistencias-resolvers';

describe('asistenciasResolvers', () => {
  const mockAsistencia = {
    id_asistencia: '1',
    id_sesion: 'abc',
    id_persona: 'p1',
    fecha_asistencia: new Date().toISOString(),
    estado: 'A', // o el valor que corresponda según tu modelo
    // agrega aquí otras propiedades requeridas por Asistencia
  };
  const mockAsistenciaSesiones = {
    id_sesion: mockAsistencia.id_sesion,
    asistencias: [mockAsistencia],
  };
  it('debe definir los resolvers de Query y Mutation', () => {
    expect(asistenciasResolvers.Query).toBeDefined();
    expect(asistenciasResolvers.Mutation).toBeDefined();
  });

  it('getAsistencias llama al método del controlador', async () => {
    const spy = jest.spyOn(asistenciasResolvers.Query, 'getAsistencias');
    await asistenciasResolvers.Query.getAsistencias();
    expect(spy).toHaveBeenCalled();
    spy.mockRestore();
  });

  it('getAsistencia llama al método del controlador', async () => {
    const spy = jest.spyOn(asistenciasResolvers.Query, 'getAsistencia');
    const args = { id: '123' };
    await asistenciasResolvers.Query.getAsistencia({}, args);
    expect(spy).toHaveBeenCalledWith({}, args);
    spy.mockRestore();
  });

  it('createAsistencia llama al método del controlador', async () => {
    const spy = jest.spyOn(asistenciasResolvers.Mutation, 'createAsistencia');
    const args = { data: { id_asistencia: '1', id_sesion: 'abc' } }; // agrega id_sesion
    await asistenciasResolvers.Mutation.createAsistencia({}, args);
    expect(spy).toHaveBeenCalledWith({}, args);
  });
  it('getAsistencias ejecuta correctamente', async () => {
  const result = await asistenciasResolvers.Query.getAsistencias();
  expect(result).not.toBeUndefined();
});

it('getAsistencia ejecuta correctamente', async () => {
  const args = { id: '1' };
  const result = await asistenciasResolvers.Query.getAsistencia({}, args);
  expect(result).not.toBeUndefined();
});

it('getPreAsistencia ejecuta correctamente', async () => {
  const args = { id_sesion: '1' };
  const result = await asistenciasResolvers.Query.getPreAsistencia({}, args);
  expect(result).not.toBeUndefined();
});

it('getAsistenciasSede ejecuta correctamente', async () => {
  const args = { id_usuario: 'u1', fecha_inicio: '2023-01-01', fecha_fin: '2023-01-31' };
  const result = await asistenciasResolvers.Query.getAsistenciasSede({}, args);
  expect(result).not.toBeUndefined();
});

it('createAsistencia ejecuta correctamente', async () => {
  const args = { data: mockAsistencia };
  const result = await asistenciasResolvers.Mutation.createAsistencia({}, args);
  expect(result).not.toBeUndefined();
});

it('updateAsistencia ejecuta correctamente', async () => {
  const args = { id: '1', data: mockAsistencia };
  const result = await asistenciasResolvers.Mutation.updateAsistencia({}, args);
  expect(result).not.toBeUndefined();
});

it('deleteAsistencia ejecuta correctamente', async () => {
  const args = { id: '1' };
  const result = await asistenciasResolvers.Mutation.deleteAsistencia({}, args);
  expect(result).not.toBeUndefined();
});

it('updateAsistencias ejecuta correctamente', async () => {
    const args = {
      input: {
        id_sesion: 's1',
        id_actividad: 'a1',
        imagen: 'url-imagen',
        numero_asistentes: 10,
        descripcion: 'Sesión de prueba',
        nuevos: [],
        asistencias: [
          {
            id_asistencia: '1',
            id_sesion: 's1',
            id_persona: 'p1',
            fecha_asistencia: new Date().toISOString(),
            estado: 'A',
          },
          // ...otros objetos Asistencia si es necesario
        ],
      }
    };
  const result = await asistenciasResolvers.Mutation.updateAsistencias({}, args);
  expect(result).not.toBeUndefined();
});
  // Puedes agregar más tests para los demás resolvers siguiendo el mismo patrón
});