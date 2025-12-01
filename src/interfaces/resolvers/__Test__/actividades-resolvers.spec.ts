import { actividadesResolvers, controller } from '../actividades-resolvers';

const mockActividad = {
  id_programa: 'p1',
  id_tipo_actividad: 't1',
  id_responsable: 'r1',
  id_aliado: 'a1',
  id_sede: 's1',
  id_frecuencia: 'f1',
  institucional: 'S' as 'S',
  nombre_actividad: 'Taller de prueba',
  descripcion: 'Descripción de prueba',
  fecha_actividad: new Date().toISOString(),
  hora_inicio: '08:00:00',
  hora_fin: '10:00:00',
  plazo_asistencia: new Date(),
  estado: 'A' as 'A',
  sesiones: [] as any[],
};

describe('actividadesResolvers', () => {
  it('updateActividad retorna error si ocurre excepción no Error en datasource', async () => {
    jest.spyOn(controller, 'updateActividad').mockImplementation(() => {
      throw 'string error';
    });
    const args = { id_actividad: '1', data: mockActividad };
    const result = await actividadesResolvers.Mutation.updateActividad({}, args);
    expect(result).toEqual(expect.objectContaining({ exitoso: 'N', mensaje: expect.stringContaining('string error') }));
  });

  it('createActividadAndSesiones retorna error si ocurre excepción no Error', async () => {
    jest.spyOn(controller, 'createActividadAndSesiones').mockImplementation(() => {
      throw { custom: 'fail' };
    });
    const args = { data: mockActividad };
    const result = await actividadesResolvers.Mutation.createActividadAndSesiones({}, args);
    expect(result).toEqual(expect.objectContaining({ exitoso: 'N', mensaje: expect.stringContaining('custom') }));
  });

  it('getActividadSedes retorna error si ocurre excepción no Error', async () => {
    jest.spyOn(controller, 'getActividadSedes').mockImplementation(() => {
      throw 123;
    });
    const args = { id_usuario: 'u1', fecha_inicio: '2023-01-01', fecha_fin: '2023-01-31' };
    const result = await actividadesResolvers.Query.getActividadSedes({}, args);
    expect(result).toEqual(expect.objectContaining({ exitoso: 'N', mensaje: expect.stringContaining('123') }));
  });

  it('getActividadSedes retorna null si el controlador retorna null', async () => {
    jest.spyOn(controller, 'getActividadSedes').mockResolvedValue(null);
    const args = { id_usuario: 'u1', fecha_inicio: '2023-01-01', fecha_fin: '2023-01-31' };
    const result = await actividadesResolvers.Query.getActividadSedes({}, args);
    expect(result).toBeNull();
  });
  it('updateActividad retorna error si ocurre excepción en datasource', async () => {
    jest.spyOn(controller, 'updateActividad').mockImplementation(() => {
      throw new Error('DB error');
    });
    const args = { id_actividad: '1', data: mockActividad };
    const result = await actividadesResolvers.Mutation.updateActividad({}, args);
    expect(result).toEqual(expect.objectContaining({ exitoso: 'N' }));
  });
  it('getActividadSedes retorna undefined si el controlador retorna undefined', async () => {
    jest.spyOn(controller, 'getActividadSedes').mockResolvedValue(undefined);
    const args = { id_usuario: 'u1', fecha_inicio: '2023-01-01', fecha_fin: '2023-01-31' };
    const result = await actividadesResolvers.Query.getActividadSedes({}, args);
    expect(result).toBeUndefined();
  });
  it('createActividadAndSesiones retorna error si ocurre excepción', async () => {
    jest.spyOn(controller, 'createActividadAndSesiones').mockImplementation(() => {
      throw new Error('DB error');
    });
    const args = { data: mockActividad };
    const result = await actividadesResolvers.Mutation.createActividadAndSesiones({}, args);
    expect(result).toEqual(expect.objectContaining({ exitoso: 'N' }));
  });

  it('getActividadSedes retorna error si ocurre excepción', async () => {
    jest.spyOn(controller, 'getActividadSedes').mockImplementation(() => {
      throw new Error('DB error');
    });
    const args = { id_usuario: 'u1', fecha_inicio: '2023-01-01', fecha_fin: '2023-01-31' };
    const result = await actividadesResolvers.Query.getActividadSedes({}, args);
    expect(result).toEqual(expect.objectContaining({ exitoso: 'N' }));
  });
  it('getActividades ejecuta correctamente', async () => {
    const args = { limit: 10, offset: 0 };
    const result = await actividadesResolvers.Query.getActividades({}, args);
    expect(result).not.toBeUndefined();
  });

  it('getActividad ejecuta correctamente', async () => {
    const args = { id: '1' };
    const result = await actividadesResolvers.Query.getActividad({}, args);
    expect(result).not.toBeUndefined();
  });

  it('getPreCreateActividad ejecuta correctamente', async () => {
    jest.spyOn(actividadesResolvers.Query, 'getPreCreateActividad').mockResolvedValue({ exitoso: "S", mensaje: "Operación exitosa" });
    const args = { id_usuario: 'u1' };
    const result = await actividadesResolvers.Query.getPreCreateActividad({}, args);
    expect(result).not.toBeUndefined();
  });

  it('getPreEditActividad ejecuta correctamente', async () => {
    const args = { id_actividad: '1', id_usuario: 'u1' };
    const result = await actividadesResolvers.Query.getPreEditActividad({}, args);
    expect(result).not.toBeUndefined();
  });
  it('debe definir los resolvers de Query y Mutation', () => {
    expect(actividadesResolvers.Query.getActividades).toBeDefined();
    expect(actividadesResolvers.Query.getActividad).toBeDefined();
    expect(actividadesResolvers.Query.getPreCreateActividad).toBeDefined();
    expect(actividadesResolvers.Query.getPreEditActividad).toBeDefined();
    expect(actividadesResolvers.Query.getActividadSedes).toBeDefined();
    expect(actividadesResolvers.Mutation.createActividadAndSesiones).toBeDefined();
    expect(actividadesResolvers.Mutation.createActividad).toBeDefined();
    expect(actividadesResolvers.Mutation.updateActividad).toBeDefined();
    expect(actividadesResolvers.Mutation.deleteActividad).toBeDefined();
  });

  it('getActividadSedes retorna resultado si exitoso !== N', async () => {
    const mockResult = [{
      id_actividad: '1',
      id_programa: 'p1',
      id_tipo_actividad: 't1',
      id_responsable: 'r1',
      id_aliado: 'a1',
      id_sede: 's1',
      id_frecuencia: 'f1',
      institucional: 'S' as 'S',
      nombre_actividad: 'Taller',
      descripcion: 'Descripción',
      fecha_actividad: new Date().toISOString(),
      hora_inicio: '08:00:00',
      hora_fin: '10:00:00',
      plazo_asistencia: new Date(),
      estado: 'A' as 'A',
      id_creado_por: 'user1',
      fecha_creacion: new Date().toISOString(),
      id_modificado_por: 'user2',
      fecha_modificacion: new Date().toISOString(),
    }];
    jest.spyOn(actividadesResolvers.Query, 'getActividadSedes').mockResolvedValue(mockResult);
    const args = { id_usuario: 'u1', fecha_inicio: '2023-01-01', fecha_fin: '2023-01-31' };
    const result = await actividadesResolvers.Query.getActividadSedes({}, args);
    expect(result).toBe(mockResult);
  });

  it('getActividadSedes retorna error si exitoso === N', async () => {
    jest.restoreAllMocks();
    jest.spyOn(controller, 'getActividadSedes').mockResolvedValue({ exitoso: "N", mensaje: "error" });
    const args = { id_usuario: 'u1', fecha_inicio: '2023-01-01', fecha_fin: '2023-01-31' };
    const result = await actividadesResolvers.Query.getActividadSedes({}, args);
    expect(result).toEqual({ exitoso: 'N', mensaje: 'error' });
  });

  it('getActividadSedes ejecuta correctamente', async () => {
    jest.restoreAllMocks();
    jest.spyOn(controller, 'getActividadSedes').mockResolvedValue([
      {
        id_actividad: '1',
        id_programa: 'p1',
        id_tipo_actividad: 't1',
        id_responsable: 'r1',
        id_aliado: 'a1',
        id_sede: 's1',
        id_frecuencia: 'f1',
        institucional: 'S',
        nombre_actividad: 'Taller de prueba',
        descripcion: 'Descripción de prueba',
        fecha_actividad: new Date().toISOString(),
        hora_inicio: '08:00:00',
        hora_fin: '10:00:00',
        plazo_asistencia: new Date(),
        estado: 'A',
      }
    ]);
    const args = { id_usuario: 'u1', fecha_inicio: '2023-01-01', fecha_fin: '2023-01-31' };
    const result = await actividadesResolvers.Query.getActividadSedes({}, args);
    expect(result).not.toBeUndefined();
  });

it('getActividadSedes retorna error si exitoso === N', async () => {
  jest.restoreAllMocks();
  jest.spyOn(controller, 'getActividadSedes').mockResolvedValue({ exitoso: "N", mensaje: "error" });
  const args = { id_usuario: 'u1', fecha_inicio: '2023-01-01', fecha_fin: '2023-01-31' };
  const result = await actividadesResolvers.Query.getActividadSedes({}, args);
  expect(result).toEqual({ exitoso: "N", mensaje: "error" });
});

it('getActividadSedes retorna error si el resultado es exitoso N', async () => {
  jest.spyOn(controller, 'getActividadSedes').mockResolvedValue({ exitoso: 'N', mensaje: 'Error de consulta' });
  const args = { id_usuario: 'u1', fecha_inicio: '2023-01-01', fecha_fin: '2023-01-31' };
  const result = await actividadesResolvers.Query.getActividadSedes({}, args);
  expect(result).toEqual({ exitoso: 'N', mensaje: 'Error de consulta' });
});

it('createActividadAndSesiones ejecuta correctamente', async () => {
  const args = { data: mockActividad };
  const result = await actividadesResolvers.Mutation.createActividadAndSesiones({}, args);
  expect(result).not.toBeUndefined();
});

it('createActividad ejecuta correctamente', async () => {
  const args = { data: mockActividad };
  const result = await actividadesResolvers.Mutation.createActividad({}, args);
  expect(result).not.toBeUndefined();
});

it('updateActividad ejecuta correctamente', async () => {
  const args = { id_actividad: '1', data: mockActividad };
  const result = await actividadesResolvers.Mutation.updateActividad({}, args);
  expect(result).not.toBeUndefined();
});

it('deleteActividad ejecuta correctamente', async () => {
  const args = { id_actividad: '1' };
  const result = await actividadesResolvers.Mutation.deleteActividad({}, args);
  expect(result).not.toBeUndefined();
});
});
