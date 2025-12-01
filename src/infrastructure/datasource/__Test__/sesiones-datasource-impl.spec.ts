  it('getById retorna error si ocurre excepción no Error', async () => {
    (pgPool.query as jest.Mock).mockRejectedValue({ custom: 'fail' });
    const dataSource = new SesionesDataSourceImpl();
    const result = await dataSource.getById('1');
    if ('exitoso' in result) {
      expect(result.exitoso).toBe('N');
      expect(result.mensaje).toMatch(/custom/);
    } else {
      throw new Error('Expected error response, but got Sesion');
    }
  });

  it('getSesionesSede retorna error si ocurre excepción no Error', async () => {
    (pgPool.query as jest.Mock).mockRejectedValue({ custom: 'fail' });
    const dataSource = new SesionesDataSourceImpl();
    const result = await dataSource.getSesionesSede('u1', '2023-01-01', '2023-01-31');
    if ('exitoso' in result) {
      expect(result.exitoso).toBe('N');
      expect(result.mensaje).toMatch(/custom/);
    } else {
      throw new Error('Expected error response, but got Sesion');
    }
  });

  it('createSesion retorna error si ocurre excepción no Error', async () => {
    (pgPool.query as jest.Mock).mockRejectedValue({ custom: 'fail' });
    const dataSource = new SesionesDataSourceImpl();
    const sesion = { id_actividad: 'a1', fecha_actividad: '2023-01-01', hora_inicio: '10:00', hora_fin: '12:00', imagen: '', nro_asistentes: 1, descripcion: '', id_creado_por: 'u1', fecha_creacion: '2023-01-01', id_modificado_por: 'u1', fecha_modificacion: '2023-01-01' };
    const result = await dataSource.createSesion(sesion as any);
    expect(result.exitoso).toBe('N');
    expect(result.mensaje).toMatch(/custom/);
  });

  it('updateById retorna error si ocurre excepción no Error', async () => {
    (pgPool.query as jest.Mock).mockRejectedValue({ custom: 'fail' });
    const dataSource = new SesionesDataSourceImpl();
    const sesion = { id_actividad: 'a1', fecha_actividad: '2023-01-01', hora_inicio: '10:00', hora_fin: '12:00', imagen: '', nro_asistentes: 1, descripcion: '', id_modificado_por: 'u1', fecha_modificacion: '2023-01-01' };
    const result = await dataSource.updateById('1', sesion as any);
    expect(result.exitoso).toBe('N');
    expect(result.mensaje).toMatch(/custom/);
  });

  it('deleteById retorna error si ocurre excepción no Error', async () => {
    (pgPool.query as jest.Mock).mockRejectedValue({ custom: 'fail' });
    const dataSource = new SesionesDataSourceImpl();
    const result = await dataSource.deleteById('1');
    expect(result.exitoso).toBe('N');
    expect(result.mensaje).toMatch(/custom/);
  });
  it('getAll retorna error si ocurre excepción no Error (cubre línea 52)', async () => {
    (pgPool.query as jest.Mock).mockRejectedValue({ custom: 'fail' });
    const dataSource = new SesionesDataSourceImpl();
    const result = await dataSource.getAll(10, 0);
    if ('exitoso' in result) {
      expect(result.exitoso).toBe('N');
      expect(result.mensaje).toMatch(/custom/);
    } else {
      throw new Error('Expected error response, but got Sesion[]');
    }
  });
import { SesionesDataSourceImpl } from '../sesiones-datasource-impl';
import { pgPool } from '../../db/pool';

jest.mock('../../db/pg-pool', () => ({
  pgPool: {
    query: jest.fn(),
    connect: jest.fn(),
  },
}));

describe('SesionesDataSourceImpl', () => {
  let dataSource: SesionesDataSourceImpl;

  beforeEach(() => {
    dataSource = new SesionesDataSourceImpl();
    jest.clearAllMocks();
  });

  it('getAll retorna lista correctamente', async () => {
    (pgPool.query as jest.Mock).mockResolvedValue({ rows: [{ id_sesion: '1' }] });
    const result = await dataSource.getAll(10, 0);
    expect(Array.isArray(result)).toBe(true);
    expect(result[0]).toHaveProperty('id_sesion', '1');
  });

  it('getAll retorna error si ocurre excepción', async () => {
    (pgPool.query as jest.Mock).mockRejectedValue(new Error('DB error'));
    const result = await dataSource.getAll(10, 0);
    expect('exitoso' in result).toBe(true);
    if ('exitoso' in result) {
      expect(result.exitoso).toBe('N');
      expect(result.mensaje).toMatch(/Error al obtener sesiones: DB error/);
    } else {
      throw new Error('Expected error response, but got Sesion');
    }
  });

  it('getById retorna sesión correctamente', async () => {
    (pgPool.query as jest.Mock).mockResolvedValue({ rows: [{ id_sesion: '1' }] });
    const result = await dataSource.getById('1');
    expect(result).toHaveProperty('id_sesion', '1');
  });

  it('getById retorna error si no hay sesión', async () => {
    (pgPool.query as jest.Mock).mockResolvedValue({ rows: [] });
    const result = await dataSource.getById('1');
    if ('exitoso' in result) {
      expect(result.exitoso).toBe('N');
      expect(result.mensaje).toMatch(/Sesión no encontrada/);
    } else {
      throw new Error('Expected error response, but got Sesion[]');
    }
  });

  it('getById retorna error si ocurre excepción', async () => {
    (pgPool.query as jest.Mock).mockRejectedValue(new Error('DB error'));
    const result = await dataSource.getById('1');
     if ('exitoso' in result) {
      expect(result.exitoso).toBe('N');
      expect(result.mensaje).toMatch(/Error al obtener sesiones: DB error/);
    } else {
      throw new Error('Expected error response, but got Sesion');
    }
  });

  it('getSesionesSede retorna lista correctamente', async () => {
    (pgPool.query as jest.Mock).mockResolvedValue({ rows: [{ id_sesion: '1' }] });
    const result = await dataSource.getSesionesSede('u1', '2023-01-01', '2023-01-31');
    expect(Array.isArray(result)).toBe(true);
    expect(result[0]).toHaveProperty('id_sesion', '1');
  });

  it('getSesionesSede retorna error si ocurre excepción', async () => {
    (pgPool.query as jest.Mock).mockRejectedValue(new Error('DB error'));
    const result = await dataSource.getSesionesSede('u1', '2023-01-01', '2023-01-31');
    expect('exitoso' in result).toBe(true);
      if ('exitoso' in result) {
      expect(result.exitoso).toBe('N');
      expect(result.mensaje).toMatch(/Error al obtener sesiones: DB error/);
    } else {
      throw new Error('Expected error response, but got Sesion');
    }
  });

  it('createSesion retorna éxito correctamente', async () => {
    (pgPool.query as jest.Mock).mockResolvedValue({});
    const sesion = { id_actividad: 'a1', fecha_actividad: '2023-01-01', hora_inicio: '10:00', hora_fin: '12:00', imagen: '', nro_asistentes: 1, descripcion: '', id_creado_por: 'u1', fecha_creacion: '2023-01-01', id_modificado_por: 'u1', fecha_modificacion: '2023-01-01' };
    const result = await dataSource.createSesion(sesion as any);
    expect(result.exitoso).toBe('S');
    expect(result.mensaje).toMatch(/creada correctamente/);
  });

  it('createSesion retorna error si ocurre excepción', async () => {
    (pgPool.query as jest.Mock).mockRejectedValue(new Error('DB error'));
    const sesion = { id_actividad: 'a1', fecha_actividad: '2023-01-01', hora_inicio: '10:00', hora_fin: '12:00', imagen: '', nro_asistentes: 1, descripcion: '', id_creado_por: 'u1', fecha_creacion: '2023-01-01', id_modificado_por: 'u1', fecha_modificacion: '2023-01-01' };
    const result = await dataSource.createSesion(sesion as any);
    expect(result.exitoso).toBe('N');
    expect(result.mensaje).toMatch(/Error al crear sesiones: DB error/);
  });

  it('updateById retorna éxito correctamente', async () => {
    (pgPool.query as jest.Mock).mockResolvedValue({});
    const sesion = { id_actividad: 'a1', fecha_actividad: '2023-01-01', hora_inicio: '10:00', hora_fin: '12:00', imagen: '', nro_asistentes: 1, descripcion: '', id_modificado_por: 'u1', fecha_modificacion: '2023-01-01' };
    const result = await dataSource.updateById('1', sesion as any);
    expect(result.exitoso).toBe('S');
    expect(result.mensaje).toMatch(/actualizada correctamente/);
  });

  it('updateById retorna error si ocurre excepción', async () => {
    (pgPool.query as jest.Mock).mockRejectedValue(new Error('DB error'));
    const sesion = { id_actividad: 'a1', fecha_actividad: '2023-01-01', hora_inicio: '10:00', hora_fin: '12:00', imagen: '', nro_asistentes: 1, descripcion: '', id_modificado_por: 'u1', fecha_modificacion: '2023-01-01' };
    const result = await dataSource.updateById('1', sesion as any);
    expect(result.exitoso).toBe('N');
    expect(result.mensaje).toMatch(/Error al actualizar sesiones: DB error/);
  });

  it('deleteById retorna éxito correctamente', async () => {
    (pgPool.query as jest.Mock).mockResolvedValue({});
    const result = await dataSource.deleteById('1');
    expect(result.exitoso).toBe('S');
    expect(result.mensaje).toMatch(/eliminada correctamente/);
  });

  it('deleteById retorna error si ocurre excepción', async () => {
    (pgPool.query as jest.Mock).mockRejectedValue(new Error('DB error'));
    const result = await dataSource.deleteById('1');
    expect(result.exitoso).toBe('N');
    expect(result.mensaje).toMatch(/Error al eliminar sesiones: DB error/);
  });

  it('updateSesiones actualiza correctamente (todas las ramas)', async () => {
    const mockClient = {
      query: jest.fn(),
      release: jest.fn(),
    };
    (pgPool.connect as jest.Mock).mockResolvedValue(mockClient);

    mockClient.query.mockResolvedValue({});

    const editarSesiones = {
      sesiones: {
        nuevos: [
          { id_actividad: 'a1', fecha_actividad: '2023-01-01', hora_inicio: '10:00', hora_fin: '12:00', imagen: '', nro_asistentes: 1, descripcion: '', id_creado_por: 'u1' },
        ],
        modificados: [
          { id_sesion: '1', id_actividad: 'a1', fecha_actividad: '2023-01-01', hora_inicio: '10:00', hora_fin: '12:00', imagen: '', nro_asistentes: 1, descripcion: '', id_modificado_por: 'u1' },
        ],
        eliminados: [
          { id_sesion: '2' },
        ],
      },
    };
    const result = await dataSource.updateSesiones(editarSesiones as any);
    expect(result.exitoso).toBe('S');
    expect(result.mensaje).toMatch(/actualizadas correctamente/);
    expect(mockClient.query).toHaveBeenCalledWith('BEGIN');
    expect(mockClient.query).toHaveBeenCalledWith('COMMIT');
    expect(mockClient.release).toHaveBeenCalled();
  });

  it('updateSesiones retorna error y hace rollback si ocurre excepción', async () => {
    const mockClient = {
      query: jest.fn(),
      release: jest.fn(),
    };
    (pgPool.connect as jest.Mock).mockResolvedValue(mockClient);

    mockClient.query.mockImplementationOnce(() => Promise.resolve())
      .mockImplementationOnce(() => { throw new Error('DB error'); });

    const editarSesiones = {
      sesiones: {
        nuevos: [
          { id_actividad: 'a1', fecha_actividad: '2023-01-01', hora_inicio: '10:00', hora_fin: '12:00', imagen: '', nro_asistentes: 1, descripcion: '', id_creado_por: 'u1' },
        ],
        modificados: [],
        eliminados: [],
      },
    };
    const result = await dataSource.updateSesiones(editarSesiones as any);
    expect(result.exitoso).toBe('N');
    expect(result.mensaje).toMatch(/Error al actualizar sesiones:/);
    expect(mockClient.query).toHaveBeenCalledWith('ROLLBACK');
    expect(mockClient.release).toHaveBeenCalled();
  });

  it('updateSesiones no hace nada si todos los arrays están vacíos', async () => {
  const mockClient = { query: jest.fn(), release: jest.fn() };
  (pgPool.connect as jest.Mock).mockResolvedValue(mockClient);
  mockClient.query.mockResolvedValue({});
  const editarSesiones = { sesiones: { nuevos: [], modificados: [], eliminados: [] } };
  const result = await dataSource.updateSesiones(editarSesiones as any);
  expect(result.exitoso).toBe('S');
  expect(result.mensaje).toMatch(/actualizadas correctamente/);
  expect(mockClient.query).toHaveBeenCalledWith('BEGIN');
  expect(mockClient.query).toHaveBeenCalledWith('COMMIT');
  expect(mockClient.release).toHaveBeenCalled();
});

it('updateSesiones maneja error en release', async () => {
  const mockClient = { query: jest.fn(), release: jest.fn(() => { throw new Error('Release error'); }) };
  (pgPool.connect as jest.Mock).mockResolvedValue(mockClient);
  mockClient.query.mockResolvedValue({});
  const editarSesiones = { sesiones: { nuevos: [], modificados: [], eliminados: [] } };
  // No debe lanzar error, solo loguear
  await expect(dataSource.updateSesiones(editarSesiones as any)).resolves.toBeTruthy();
});

it('updateSesiones maneja campos opcionales undefined', async () => {
  const mockClient = { query: jest.fn(), release: jest.fn() };
  (pgPool.connect as jest.Mock).mockResolvedValue(mockClient);
  mockClient.query.mockResolvedValue({});
  const editarSesiones = {
    sesiones: {
      nuevos: [
        { id_actividad: 'a1', fecha_actividad: '2023-01-01', hora_inicio: '10:00', hora_fin: '12:00' }
      ],
      modificados: [],
      eliminados: [],
    },
  };
  const result = await dataSource.updateSesiones(editarSesiones as any);
  expect(result.exitoso).toBe('S');
  expect(result.mensaje).toMatch(/actualizadas correctamente/);
});

it('updateSesiones retorna error si editarSesiones no tiene sesiones', async () => {
  const mockClient = { query: jest.fn(), release: jest.fn() };
  (pgPool.connect as jest.Mock).mockResolvedValue(mockClient);
  mockClient.query.mockResolvedValue({});
  // Simula objeto sin sesiones
    const result = await dataSource.updateSesiones({ sesiones: {} } as any);
    expect(result.exitoso).toBe('N');
    expect(result.mensaje).toMatch(/Cannot read properties of undefined/);
});

it('getAll retorna error si ocurre excepción no Error', async () => {
  (pgPool.query as jest.Mock).mockRejectedValue({ custom: 'fail' });
  const result = await dataSource.getAll(10, 0);
  expect('exitoso' in result).toBe(true);
  
  if ('exitoso' in result) {
    expect(result.exitoso).toBe('N');
    if ('mensaje' in result) {
      expect(result.mensaje).toMatch(/Error al obtener sesiones:/);
      expect(result.mensaje).toMatch(/custom/);
    } else {
      throw new Error('Expected error response, but got Sesion[]');
    }
  } else {
    throw new Error('Expected error response, but got Sesion[]');
  }
});

it('updateSesiones no hace nada si todos los arrays están vacíos', async () => {
  const mockClient = { query: jest.fn(), release: jest.fn() };
  (pgPool.connect as jest.Mock).mockResolvedValue(mockClient);
  mockClient.query.mockResolvedValue({});
  const editarSesiones = { sesiones: { nuevos: [], modificados: [], eliminados: [] } };
  const result = await dataSource.updateSesiones(editarSesiones as any);
  expect(result.exitoso).toBe('S');
  expect(result.mensaje).toMatch(/actualizadas correctamente/);
});

it('updateSesiones maneja campos opcionales undefined', async () => {
  const mockClient = { query: jest.fn(), release: jest.fn() };
  (pgPool.connect as jest.Mock).mockResolvedValue(mockClient);
  mockClient.query.mockResolvedValue({});
  const editarSesiones = {
    sesiones: {
      nuevos: [
        { id_actividad: 'a1', fecha_actividad: '2023-01-01', hora_inicio: '10:00', hora_fin: '12:00' }
      ],
      modificados: [],
      eliminados: [],
    },
  };
  const result = await dataSource.updateSesiones(editarSesiones as any);
  expect(result.exitoso).toBe('S');
  expect(result.mensaje).toMatch(/actualizadas correctamente/);
    // Verifica que los valores opcionales se envían correctamente
    expect(mockClient.query).toHaveBeenCalledWith(expect.any(String), expect.arrayContaining([
      expect.anything(), // id_sesion
      expect.anything(), // id_actividad
      expect.anything(), // fecha_actividad
      expect.anything(), // hora_inicio
      expect.anything(), // hora_fin
      '', // imagen fallback
      0, // nro_asistentes fallback
      '', // descripcion fallback
      null, // id_modificado_por fallback
      expect.any(Date), // fecha_modificacion
    ]));
});

it('updateSesiones maneja error en release', async () => {
  const mockClient = { query: jest.fn(), release: jest.fn(() => { throw new Error('Release error'); }) };
  (pgPool.connect as jest.Mock).mockResolvedValue(mockClient);
  mockClient.query.mockResolvedValue({});
  const editarSesiones = { sesiones: { nuevos: [], modificados: [], eliminados: [] } };
  await expect(dataSource.updateSesiones(editarSesiones as any)).resolves.toBeTruthy();
});

it('updateSesiones retorna error si editarSesiones no tiene sesiones', async () => {
  const mockClient = { query: jest.fn(), release: jest.fn() };
  (pgPool.connect as jest.Mock).mockResolvedValue(mockClient);
  mockClient.query.mockResolvedValue({});
  // Simula objeto sin sesiones
  const result = await dataSource.updateSesiones({} as any);
  if ('exitoso' in result) {
    expect(result.exitoso).toBe('N');
    expect(result.mensaje).toMatch(/Cannot destructure property 'nuevos'/);
  } else {
    throw new Error('Expected error response, but got Sesion[]');
  }
});

it('updateSesiones retorna error si el error no es instancia de Error', async () => {
  const mockClient = { query: jest.fn(), release: jest.fn() };
  (pgPool.connect as jest.Mock).mockResolvedValue(mockClient);
  mockClient.query.mockResolvedValueOnce({}); // BEGIN
  mockClient.query.mockImplementationOnce(() => { throw { custom: 'fail' }; }); // error no Error
  mockClient.query.mockResolvedValueOnce({}); // ROLLBACK
  const editarSesiones = {
    sesiones: {
      nuevos: [
        { id_actividad: 'a1', fecha_actividad: '2023-01-01', hora_inicio: '10:00', hora_fin: '12:00', imagen: 'img', nro_asistentes: 1, descripcion: 'desc', id_creado_por: 'u1' },
      ],
      modificados: [],
      eliminados: [],
    },
  };
  const result = await dataSource.updateSesiones(editarSesiones as any);
  expect(result.exitoso).toBe('N');
  expect(result.mensaje).toMatch(/Error al actualizar sesiones: \{"custom":"fail"\}/);
  expect(mockClient.query).toHaveBeenCalledWith('ROLLBACK');
  expect(mockClient.release).toHaveBeenCalled();
});
});