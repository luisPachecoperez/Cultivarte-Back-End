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
import { sesionesQueries } from '../../db/sesiones-queries';
import { excepcionesQueries } from '../../db/excepciones-queries';

type PgQueryMock = jest.Mock;
type PgConnectMock = jest.Mock;

jest.mock('../../db/pool', () => ({
  pgPool: {
    query: jest.fn(),
    connect: jest.fn(),
  },
}));

describe('SesionesDataSourceImpl', () => {
  let dataSource: SesionesDataSourceImpl;
  let warnSpy: jest.SpyInstance;
  const queryMock = pgPool.query as PgQueryMock;
  const connectMock = pgPool.connect as PgConnectMock;

  beforeEach(() => {
    jest.clearAllMocks();
    warnSpy = jest.spyOn(console, 'warn').mockImplementation(() => {});
    dataSource = new SesionesDataSourceImpl();
  });

  afterEach(() => {
    warnSpy.mockRestore();
  });

  const buildClient = () => {
    const client = {
      query: jest.fn(),
      release: jest.fn(),
    };
    connectMock.mockResolvedValue(client);
    return client;
  };

  it('getAll retorna lista correctamente', async () => {
    queryMock.mockResolvedValue({ rows: [{ id_sesion: '1' }] });
    const result = await dataSource.getAll(10, 0);
    expect(Array.isArray(result)).toBe(true);
    expect(result[0]).toHaveProperty('id_sesion', '1');
  });

  it('getAll retorna error si ocurre excepción', async () => {
    queryMock
      .mockRejectedValueOnce(new Error('DB error'))
      .mockResolvedValueOnce({ rows: [] });

    const result = await dataSource.getAll(10, 0);
    expect('exitoso' in result).toBe(true);
    if ('exitoso' in result) {
      expect(result.exitoso).toBe('N');
      expect(result.mensaje).toBe('Error al obtener sesiones: DB error');
    }
  });

  it('getAll retorna error si ocurre excepción no Error', async () => {
    queryMock
      .mockRejectedValueOnce({ custom: 'fail' })
      .mockResolvedValueOnce({ rows: [] });

    const result = await dataSource.getAll(10, 0);
    expect('exitoso' in result).toBe(true);
    if ('exitoso' in result) {
      expect(result.exitoso).toBe('N');
      expect(result.mensaje).toMatch(/Error al obtener sesiones:/);
      expect(result.mensaje).toMatch(/custom/);
    }
  });

  it('getById retorna sesión correctamente', async () => {
    queryMock.mockResolvedValue({ rows: [{ id_sesion: '1' }] });
    const result = await dataSource.getById('1');
    expect(result).toHaveProperty('id_sesion', '1');
  });

  it('getById retorna error si no hay sesión', async () => {
    queryMock.mockResolvedValue({ rows: [] });
    const result = await dataSource.getById('1');
    if ('exitoso' in result) {
      expect(result.exitoso).toBe('N');
      expect(result.mensaje).toBe('Sesión no encontrada');
    }
  });

  it('getById retorna error si ocurre excepción', async () => {
    queryMock
      .mockRejectedValueOnce(new Error('DB error'))
      .mockResolvedValueOnce({ rows: [] });

    const result = await dataSource.getById('1');
    if ('exitoso' in result) {
      expect(result.exitoso).toBe('N');
      expect(result.mensaje).toBe('Error al obtener sesiones: DB error');
    }
  });

  it('getSesionesSede retorna lista correctamente', async () => {
    queryMock.mockResolvedValue({ rows: [{ id_sesion: '1' }] });
    const result = await dataSource.getSesionesSede('u1', '2023-01-01', '2023-01-31');
    expect(Array.isArray(result)).toBe(true);
    expect(result[0]).toHaveProperty('id_sesion', '1');
  });

  it('getSesionesSede retorna error si ocurre excepción', async () => {
    queryMock
      .mockRejectedValueOnce(new Error('DB error'))
      .mockResolvedValueOnce({ rows: [] });

    const result = await dataSource.getSesionesSede('u1', '2023-01-01', '2023-01-31');
    expect('exitoso' in result).toBe(true);
    if ('exitoso' in result) {
      expect(result.exitoso).toBe('N');
      expect(result.mensaje).toBe('Error al obtener sesiones: DB error');
    }
  });

  it('createSesion retorna éxito correctamente', async () => {
    queryMock.mockResolvedValue({});
    const sesion = {
      id_actividad: 'a1',
      fecha_actividad: '2023-01-01',
      hora_inicio: '10:00',
      hora_fin: '12:00',
      imagen: '',
      nro_asistentes: 1,
      descripcion: '',
      id_creado_por: 'u1',
      fecha_creacion: '2023-01-01',
      id_modificado_por: 'u1',
      fecha_modificacion: '2023-01-01',
    };
    const result = await dataSource.createSesion(sesion as any);
    expect(result.exitoso).toBe('S');
    expect(result.mensaje).toBe('Sesion creada correctamente');
  });

  it('createSesion retorna error si ocurre excepción', async () => {
    queryMock
      .mockRejectedValueOnce(new Error('DB error'))
      .mockResolvedValueOnce({ rows: [] });
    const sesion = {
      id_actividad: 'a1',
      fecha_actividad: '2023-01-01',
      hora_inicio: '10:00',
      hora_fin: '12:00',
      imagen: '',
      nro_asistentes: 1,
      descripcion: '',
      id_creado_por: 'u1',
      fecha_creacion: '2023-01-01',
      id_modificado_por: 'u1',
      fecha_modificacion: '2023-01-01',
    };
    const result = await dataSource.createSesion(sesion as any);
    expect(result.exitoso).toBe('N');
    expect(result.mensaje).toBe('Error al crear sesiones: DB error');
  });

  it('updateById retorna éxito correctamente', async () => {
    queryMock.mockResolvedValue({});
    const sesion = {
      id_actividad: 'a1',
      fecha_actividad: '2023-01-01',
      hora_inicio: '10:00',
      hora_fin: '12:00',
      imagen: '',
      nro_asistentes: 1,
      descripcion: '',
      id_modificado_por: 'u1',
      fecha_modificacion: '2023-01-01',
    };
    const result = await dataSource.updateById('1', sesion as any);
    expect(result.exitoso).toBe('S');
    expect(result.mensaje).toBe('Sesion actualizada correctamente');
  });

  it('updateById retorna error si ocurre excepción', async () => {
    queryMock
      .mockRejectedValueOnce(new Error('DB error'))
      .mockResolvedValueOnce({ rows: [] });
    const sesion = {
      id_actividad: 'a1',
      fecha_actividad: '2023-01-01',
      hora_inicio: '10:00',
      hora_fin: '12:00',
      imagen: '',
      nro_asistentes: 1,
      descripcion: '',
      id_modificado_por: 'u1',
      fecha_modificacion: '2023-01-01',
    };
    const result = await dataSource.updateById('1', sesion as any);
    expect(result.exitoso).toBe('N');
    expect(result.mensaje).toBe('Error al actualizar sesiones: DB error');
  });

  it('deleteById retorna éxito correctamente', async () => {
    queryMock.mockResolvedValue({});
    const result = await dataSource.deleteById('1');
    expect(result.exitoso).toBe('S');
    expect(result.mensaje).toBe('Sesion eliminada correctamente');
  });

  it('deleteById retorna error si ocurre excepción', async () => {
    queryMock
      .mockRejectedValueOnce(new Error('DB error'))
      .mockResolvedValueOnce({ rows: [] });
    const result = await dataSource.deleteById('1');
    expect(result.exitoso).toBe('N');
    expect(result.mensaje).toBe('Error al eliminar sesiones: DB error');
  });

  it('updateSesiones actualiza correctamente', async () => {
    const client = buildClient();
    client.query.mockResolvedValue({});

    const editarSesiones = {
      sesiones: {
        nuevos: [
          {
            id_actividad: 'a1',
            fecha_actividad: '2023-01-01',
            hora_inicio: '10:00',
            hora_fin: '12:00',
            imagen: '',
            nro_asistentes: 1,
            descripcion: '',
            id_creado_por: 'u1',
          },
        ],
        modificados: [
          {
            id_sesion: '1',
            id_actividad: 'a1',
            fecha_actividad: '2023-01-01',
            hora_inicio: '10:00',
            hora_fin: '12:00',
            imagen: '',
            nro_asistentes: 1,
            descripcion: '',
            id_modificado_por: 'u1',
          },
        ],
        eliminados: [{ id_sesion: '2' }],
      },
    };

    const result = await dataSource.updateSesiones(editarSesiones as any);
    expect(result.exitoso).toBe('S');
    expect(result.mensaje).toBe('Sesiones actualizadas correctamente');
    expect(client.query).toHaveBeenCalledWith('BEGIN');
    expect(client.query).toHaveBeenCalledWith('COMMIT');
    expect(client.release).toHaveBeenCalled();
  });

  it('updateSesiones registra advertencia cuando release falla', async () => {
    const client = buildClient();
    client.query.mockResolvedValue({});
    client.release.mockImplementation(() => {
      throw new Error('release fail');
    });

    const editarSesiones = {
      sesiones: {
        nuevos: [],
        modificados: [],
        eliminados: [],
      },
    };

    const result = await dataSource.updateSesiones(editarSesiones as any);
    expect(result.exitoso).toBe('S');
    expect(result.mensaje).toBe('Sesiones actualizadas correctamente');
    expect(warnSpy).toHaveBeenCalledWith(
      'Error al liberar el cliente:',
      expect.any(Error),
    );
  });

  it('updateSesiones retorna error y hace rollback si ocurre excepción', async () => {
    const client = buildClient();
    queryMock.mockResolvedValue({ rows: [] });
    client.query.mockImplementation((sql: string) => {
      if (sql === 'BEGIN' || sql === 'ROLLBACK') {
        return Promise.resolve({});
      }
      if (sql === excepcionesQueries.findMensajeByError) {
        return Promise.resolve({ rows: [] });
      }
      if (sql === sesionesQueries.create) {
        throw new Error('DB error');
      }
      return Promise.resolve({});
    });

    const editarSesiones = {
      sesiones: {
        nuevos: [
          {
            id_actividad: 'a1',
            fecha_actividad: '2023-01-01',
            hora_inicio: '10:00',
            hora_fin: '12:00',
            imagen: '',
            nro_asistentes: 1,
            descripcion: '',
            id_creado_por: 'u1',
          },
        ],
        modificados: [],
        eliminados: [],
      },
    };

    const result = await dataSource.updateSesiones(editarSesiones as any);
    expect(result.exitoso).toBe('N');
    expect(result.mensaje).toBe('Error al actualizar sesiones: DB error');
    expect(client.query).toHaveBeenCalledWith('ROLLBACK');
    expect(client.release).toHaveBeenCalled();
  });

  it('updateSesiones retorna error si el error no es instancia de Error', async () => {
    const client = buildClient();
    queryMock.mockResolvedValue({ rows: [] });
    client.query.mockImplementation((sql: string) => {
      if (sql === 'BEGIN' || sql === 'ROLLBACK') {
        return Promise.resolve({});
      }
      if (sql === excepcionesQueries.findMensajeByError) {
        return Promise.resolve({ rows: [] });
      }
      if (sql === sesionesQueries.create) {
        throw { custom: 'fail' };
      }
      return Promise.resolve({});
    });

    const editarSesiones = {
      sesiones: {
        nuevos: [
          {
            id_actividad: 'a1',
            fecha_actividad: '2023-01-01',
            hora_inicio: '10:00',
            hora_fin: '12:00',
            imagen: 'img',
            nro_asistentes: 1,
            descripcion: 'desc',
            id_creado_por: 'u1',
          },
        ],
        modificados: [],
        eliminados: [],
      },
    };

    const result = await dataSource.updateSesiones(editarSesiones as any);
    expect(result.exitoso).toBe('N');
    expect(result.mensaje).toBe('Error al actualizar sesiones: {"custom":"fail"}');
    expect(client.query).toHaveBeenCalledWith('ROLLBACK');
    expect(client.release).toHaveBeenCalled();
  });

  it('updateSesiones maneja error en release', async () => {
    const client = buildClient();
    client.release.mockImplementation(() => {
      throw new Error('Release error');
    });
    client.query.mockResolvedValue({});

    const editarSesiones = {
      sesiones: { nuevos: [], modificados: [], eliminados: [] },
    };

    await expect(dataSource.updateSesiones(editarSesiones as any)).resolves.toEqual({
      exitoso: 'S',
      mensaje: 'Sesiones actualizadas correctamente',
    });
    expect(warnSpy).toHaveBeenCalledWith('Error al liberar el cliente:', expect.any(Error));
  });

  it('updateSesiones maneja campos opcionales undefined', async () => {
    const client = buildClient();
    client.query.mockResolvedValue({});

    const editarSesiones = {
      sesiones: {
        nuevos: [
          {
            id_actividad: 'a1',
            fecha_actividad: '2023-01-01',
            hora_inicio: '10:00',
            hora_fin: '12:00',
          },
        ],
        modificados: [],
        eliminados: [],
      },
    };

    const result = await dataSource.updateSesiones(editarSesiones as any);
    expect(result.exitoso).toBe('S');
    expect(result.mensaje).toBe('Sesiones actualizadas correctamente');
  });

  it('updateSesiones retorna error si editarSesiones no tiene sesiones', async () => {
    const client = buildClient();
    queryMock.mockResolvedValue({ rows: [] });
    client.query.mockResolvedValue({});

    const result = await dataSource.updateSesiones({} as any);
    expect(result.exitoso).toBe('N');
    expect(result.mensaje).toMatch(
      /Error al actualizar sesiones: Cannot (read properties|destructure property).*nuevos/,
    );
  });
});