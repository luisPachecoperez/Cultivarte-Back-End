import { PersonaDataSourceImpl } from '../personas-datasource-impl';
import { pgPool } from '../../db/pool';
import { personaQueries } from '../../db/personas-queries';

jest.mock('../../db/pool', () => ({
  pgPool: {
    query: jest.fn(),
    connect: jest.fn(),
  },
}));

const poolQueryMock = pgPool.query as jest.Mock;
const poolConnectMock = pgPool.connect as jest.Mock;

let clientQueryMock: jest.Mock;
let clientReleaseMock: jest.Mock;

describe('PersonaDataSourceImpl', () => {
  let dataSource: PersonaDataSourceImpl;
  const warnSpy = jest.spyOn(console, 'warn').mockImplementation(() => {});

  beforeEach(() => {
    jest.clearAllMocks();

    clientQueryMock = jest.fn().mockResolvedValue({ rows: [], rowCount: 0 });
    clientReleaseMock = jest.fn(() => undefined);

    poolQueryMock.mockReset();
    poolConnectMock.mockReset();

    poolConnectMock.mockImplementation(async () => ({
      query: clientQueryMock,
      release: clientReleaseMock,
    }));

    dataSource = new PersonaDataSourceImpl();
  });

  afterAll(() => {
    warnSpy.mockRestore();
  });

  it('getAll retorna lista correctamente', async () => {
    (pgPool.query as jest.Mock).mockResolvedValue({ rows: [{ id_persona: '1' }] });
    const result = await dataSource.getAll(10, 0);
    expect(Array.isArray(result)).toBe(true);
    expect(result[0]).toHaveProperty('id_persona', '1');
  });

  it('getAll retorna error si ocurre excepción', async () => {
    (pgPool.query as jest.Mock)
      .mockRejectedValueOnce(new Error('DB error'))
      .mockResolvedValueOnce({ rows: [] });
    const result = await dataSource.getAll(10, 0);
    expect('exitoso' in result).toBe(true);
    if ('exitoso' in result) {
      expect(result.exitoso).toBe('N');
      expect(result.mensaje).toBe('Error al obtener personas: DB error');
    }
  });

  it('getById retorna persona correctamente', async () => {
    (pgPool.query as jest.Mock).mockResolvedValue({ rows: [{ id_persona: '1' }] });
    const result = await dataSource.getById('1');
    expect(result).toHaveProperty('id_persona', '1');
  });

  it('getById retorna null si no hay resultado', async () => {
    (pgPool.query as jest.Mock).mockResolvedValue({ rows: [] });
    const result = await dataSource.getById('1');
    expect(result).toBeNull();
  });

  it('getById retorna error si ocurre excepción', async () => {
    (pgPool.query as jest.Mock)
      .mockRejectedValueOnce(new Error('DB error'))
      .mockResolvedValueOnce({ rows: [] });
    const result = await dataSource.getById('1');
    expect('exitoso' in result).toBe(true);
    if ('exitoso' in result) {
      expect(result.exitoso).toBe('N');
      expect(result.mensaje).toBe('Error al obtener persona: DB error');
    }
  });

  it('createPersona retorna persona correctamente', async () => {
    (pgPool.query as jest.Mock).mockResolvedValue({ rows: [{ id_persona: '1' }] });
    const persona = { id_persona: '1' };
    const result = await dataSource.createPersona(persona as any);
    expect(result).toHaveProperty('id_persona', '1');
  });

  it('createPersona retorna null si no hay resultado', async () => {
    (pgPool.query as jest.Mock).mockResolvedValue({ rows: [] });
    const persona = { id_persona: '1' };
    const result = await dataSource.createPersona(persona as any);
    expect(result).toBeNull();
  });

  it('createPersona retorna error si ocurre excepción', async () => {
    (pgPool.query as jest.Mock)
      .mockRejectedValueOnce(new Error('DB error'))
      .mockResolvedValueOnce({ rows: [] });
    const persona = { id_persona: '1' };
    const result = await dataSource.createPersona(persona as any);
    expect('exitoso' in result).toBe(true);
    if ('exitoso' in result) {
      expect(result.exitoso).toBe('N');
      expect(result.mensaje).toBe('Error al crear persona: DB error');
    }
  });

  it('updatePersona retorna persona correctamente', async () => {
    (pgPool.query as jest.Mock).mockResolvedValue({ rows: [{ id_persona: '1' }] });
    const persona = { id_persona: '1' };
    const result = await dataSource.updatePersona('1', persona as any);
    expect(result).toHaveProperty('id_persona', '1');
  });

  it('updatePersona retorna null si no hay resultado', async () => {
    (pgPool.query as jest.Mock).mockResolvedValue({ rows: [] });
    const persona = { id_persona: '1' };
    const result = await dataSource.updatePersona('1', persona as any);
    expect(result).toBeNull();
  });

  it('updatePersona retorna error si ocurre excepción', async () => {
    (pgPool.query as jest.Mock)
      .mockRejectedValueOnce(new Error('DB error'))
      .mockResolvedValueOnce({ rows: [] });
    const persona = { id_persona: '1' };
    const result = await dataSource.updatePersona('1', persona as any);
    expect('exitoso' in result).toBe(true);
    if ('exitoso' in result) {
      expect(result.exitoso).toBe('N');
      expect(result.mensaje).toBe('Error al actualizar persona: DB error');
    }
  });

  it('deletePersona retorna éxito correctamente', async () => {
    (pgPool.query as jest.Mock).mockResolvedValue({ rows: [{ exitoso: 'S', mensaje: 'Eliminada' }] });
    const result = await dataSource.deletePersona('1');
    expect(result.exitoso).toBe('S');
    expect(result.mensaje).toMatch(/Eliminada/);
  });

  it('deletePersona retorna error si no hay resultado', async () => {
    (pgPool.query as jest.Mock).mockResolvedValue({ rows: [] });
    const result = await dataSource.deletePersona('1');
    expect(result.exitoso).toBe('N');
    expect(result.mensaje).toMatch(/No se pudo eliminar persona/);
  });

  it('deletePersona retorna error si ocurre excepción', async () => {
    (pgPool.query as jest.Mock)
      .mockRejectedValueOnce(new Error('DB error'))
      .mockResolvedValueOnce({ rows: [] });
    const result = await dataSource.deletePersona('1');
    expect(result.exitoso).toBe('N');
    expect(result.mensaje).toBe('Error al eliminar persona: DB error');
  });

  it('getAliadosSede retorna lista correctamente', async () => {
    (pgPool.query as jest.Mock).mockResolvedValue({ rows: [{ id_persona: '1' }] });
    const result = await dataSource.getAliadosSede('u1');
    expect(Array.isArray(result)).toBe(true);
    expect(result[0]).toHaveProperty('id_persona', '1');
  });

  it('getAliadosSede retorna array vacío si no hay resultado', async () => {
    (pgPool.query as jest.Mock).mockResolvedValue({ rows: [] });
    const result = await dataSource.getAliadosSede('u1');
    expect(Array.isArray(result)).toBe(true);
    if (Array.isArray(result)) {
      expect(result.length).toBe(0);
    }
  });

  it('getAliadosSede retorna error si ocurre excepción', async () => {
    (pgPool.query as jest.Mock)
      .mockRejectedValueOnce(new Error('DB error'))
      .mockResolvedValueOnce({ rows: [] });
    const result = await dataSource.getAliadosSede('u1');
    expect('exitoso' in result).toBe(true);
    if ('mensaje' in result) {
      expect(result.exitoso).toBe('N');
      expect(result.mensaje).toBe('Error al obtener aliados: DB error');
    }
  });

  it('getBeneficiariosSede retorna lista correctamente', async () => {
    (pgPool.query as jest.Mock).mockResolvedValue({ rows: [{ id_persona: '1' }] });
    const result = await dataSource.getBenSedes();
    expect(Array.isArray(result)).toBe(true);
    expect(result[0]).toHaveProperty('id_persona', '1');
  });

  it('getBeneficiariosSede retorna error si ocurre excepción', async () => {
    (pgPool.query as jest.Mock)
      .mockRejectedValueOnce(new Error('DB error'))
      .mockResolvedValueOnce({ rows: [] });
    const result = await dataSource.getBenSedes();
    expect('exitoso' in result).toBe(true);
    expect((result as any).exitoso).toBe('N');
    if ('mensaje' in result) {
      expect((result as any).mensaje).toBe(
        'Error al obtener beneficiarios: DB error',
      );
    }
  });

  it('getBeneficiarios retorna lista correctamente', async () => {
    (pgPool.query as jest.Mock).mockResolvedValue({ rows: [{ id_persona: '1' }] });
    const result = await dataSource.getBeneficiarios();
    expect(Array.isArray(result)).toBe(true);
    expect(result[0]).toHaveProperty('id_persona', '1');
  });

  it('getBeneficiarios retorna error si ocurre excepción', async () => {
    (pgPool.query as jest.Mock)
      .mockRejectedValueOnce(new Error('DB error'))
      .mockResolvedValueOnce({ rows: [] });
    const result = await dataSource.getBeneficiarios();
    expect('exitoso' in result).toBe(true);
    if ('exitoso' in result) {
      expect(result.exitoso).toBe('N');
      expect(result.mensaje).toBe(
        'Error al obtener beneficiarios: DB error',
      );
    }
  });

  it('getAll retorna error si ocurre excepción no Error', async () => {
    (pgPool.query as jest.Mock).mockRejectedValue({ custom: 'fail' });
    const result = await dataSource.getAll(10, 0);
    expect('exitoso' in result).toBe(true);
    if ('exitoso' in result) {
      expect(result.exitoso).toBe('N');
      expect(result.mensaje).toMatch(/Error al obtener personas:/);
      expect(result.mensaje).toMatch(/custom/);
    }
  });

  it('getById retorna null si rows[0] es undefined', async () => {
  (pgPool.query as jest.Mock).mockResolvedValue({ rows: [] });
  const result = await dataSource.getById('1');
  expect(result).toBeNull();
});

it('getById retorna error si ocurre excepción no Error', async () => {
  (pgPool.query as jest.Mock).mockRejectedValue({ custom: 'fail' });
  const result = await dataSource.getById('1');
  if ('exitoso' in result) {
    expect(result.exitoso).toBe('N');
      expect(result.mensaje).toMatch(/Error al obtener persona:/);
    expect(result.mensaje).toMatch(/custom/);
  }
});

it('createPersona retorna null si rows[0] es undefined', async () => {
  (pgPool.query as jest.Mock).mockResolvedValue({ rows: [] });
  const persona = { id_persona: '1' };
  const result = await dataSource.createPersona(persona as any);
  expect(result).toBeNull();
});

it('createPersona retorna error si ocurre excepción no Error', async () => {
  (pgPool.query as jest.Mock).mockRejectedValue({ custom: 'fail' });
  const persona = { id_persona: '1' };
  const result = await dataSource.createPersona(persona as any);
  if ('exitoso' in result) {
    expect(result.exitoso).toBe('N');
    expect(result.mensaje).toMatch(/Error al crear persona:/);
    expect(result.mensaje).toMatch(/custom/);
  }
});

it('updatePersona retorna null si rows[0] es undefined', async () => {
  (pgPool.query as jest.Mock).mockResolvedValue({ rows: [] });
  const persona = { id_persona: '1' };
  const result = await dataSource.updatePersona('1', persona as any);
  expect(result).toBeNull();
});

it('updatePersona retorna error si ocurre excepción no Error', async () => {
  (pgPool.query as jest.Mock).mockRejectedValue({ custom: 'fail' });
  const persona = { id_persona: '1' };
  const result = await dataSource.updatePersona('1', persona as any);
  if ('exitoso' in result) {
    expect(result.exitoso).toBe('N');
    expect(result.mensaje).toMatch(/Error al actualizar persona:/);
    expect(result.mensaje).toMatch(/custom/);
  }
});

it('deletePersona retorna error si rows[0] es undefined', async () => {
  (pgPool.query as jest.Mock).mockResolvedValue({ rows: [] });
  const result = await dataSource.deletePersona('1');
  expect(result.exitoso).toBe('N');
  expect(result.mensaje).toMatch(/No se pudo eliminar persona/);
});

it('deletePersona retorna error si ocurre excepción no Error', async () => {
  (pgPool.query as jest.Mock).mockRejectedValue({ custom: 'fail' });
  const result = await dataSource.deletePersona('1');
  expect(result.exitoso).toBe('N');
  expect(result.mensaje).toMatch(/Error al eliminar persona:/);
  expect(result.mensaje).toMatch(/custom/);
});

it('getAliadosSede retorna array vacío si no hay resultado', async () => {
  (pgPool.query as jest.Mock).mockResolvedValue({ rows: [] });
  const result = await dataSource.getAliadosSede('u1');
  expect(Array.isArray(result)).toBe(true);
  if (Array.isArray(result)) {
    expect(result.length).toBe(0);
  }
});

it('getAliadosSede retorna array vacío cuando rows es undefined', async () => {
  (pgPool.query as jest.Mock).mockResolvedValue({});
  const result = await dataSource.getAliadosSede('u1');
  expect(Array.isArray(result)).toBe(true);
  if (Array.isArray(result)) {
    expect(result.length).toBe(0);
  }
});

it('getAliadosSede retorna error si ocurre excepción no Error', async () => {
  (pgPool.query as jest.Mock).mockRejectedValue({ custom: 'fail' });
  const result = await dataSource.getAliadosSede('u1');
  expect('exitoso' in result).toBe(true);
  if ('exitoso' in result) {
    expect(result.mensaje).toMatch(/Error al obtener aliados:/);
    expect(result.mensaje).toMatch(/custom/);
  }
});

it('getBeneficiariosSede retorna error si ocurre excepción no Error', async () => {
  (pgPool.query as jest.Mock).mockRejectedValue({ custom: 'fail' });
  const result = await dataSource.getBenSedes();
  expect('exitoso' in result).toBe(true);
  if ('exitoso' in result) {
    expect(result.exitoso).toBe('N');
    expect(result.mensaje).toMatch(/Error al obtener beneficiarios:/);
    expect(result.mensaje).toMatch(/custom/);
  }
});

it('getBeneficiarios retorna error si ocurre excepción no Error', async () => {
  (pgPool.query as jest.Mock).mockRejectedValue({ custom: 'fail' });
  const result = await dataSource.getBeneficiarios();
  expect('exitoso' in result).toBe(true);
  if ('exitoso' in result) {
    expect(result.exitoso).toBe('N');
    expect(result.mensaje).toMatch(/Error al obtener beneficiarios:/);
    expect(result.mensaje).toMatch(/custom/);
  }
});

it('getPreBeneficiarios retorna datos agregados', async () => {
  clientQueryMock.mockImplementation((query: string) => {
    switch (query) {
      case personaQueries.programaRes:
        return Promise.resolve({ rows: [{ id_programa: '11' }] });
      case personaQueries.resPersonaGrupoInteres:
        return Promise.resolve({ rows: [{ id_grupo_interes: '22' }] });
      case personaQueries.sedesRes:
        return Promise.resolve({ rows: [{ id_sede: '1', nombre: 'Sede Norte' }] });
      case personaQueries.tipoIdentificacionRes:
        return Promise.resolve({ rows: [{ id_tipo_identificacion: 'CC', nombre: 'Cedula' }] });
      case personaQueries.tiposPersonaRes:
        return Promise.resolve({ rows: [{ id_tipo_persona: 'TP', nombre: 'Beneficiario' }] });
      case personaQueries.sexoInfoRes:
        return Promise.resolve({ rows: [{ id_sexo: 'M', nombre: 'Masculino' }] });
      case personaQueries.ubicacionesRes:
        return Promise.resolve({ rows: [{ id_ubicacion: 'LOC', nombre: 'Local' }] });
      default:
        return Promise.resolve({ rows: [], rowCount: 0 });
    }
  });

  const result = await dataSource.getPreBeneficiarios('usuario-1');

  expect(Array.isArray(result)).toBe(true);
  if (Array.isArray(result)) {
    expect(result[0].id_programa).toBe('11');
    expect(result[0].id_grupo_interes).toBe('22');
    expect(result[0].sedes).toHaveLength(1);
    expect(result[0].tiposIdentificacion[0]).toHaveProperty('id_tipo_identificacion', 'CC');
  }
  expect(poolConnectMock).toHaveBeenCalledTimes(1);
  expect(clientReleaseMock).toHaveBeenCalledTimes(1);
});

it('getPreBeneficiarios usa allSedes cuando la consulta inicial no retorna datos', async () => {
  clientQueryMock.mockImplementation(async (query: string) => {
    if (query === personaQueries.programaRes) {
      return { rows: [{ id_programa: '5' }] };
    }
    if (query === personaQueries.resPersonaGrupoInteres) {
      return { rows: [{ id_grupo_interes: '7' }] };
    }
    if (query === personaQueries.sedesRes) {
      return { rows: [] };
    }
    if (query === personaQueries.allSedesRes) {
      return { rows: [{ id_sede: '2', nombre: 'Sede fallback' }] };
    }
    if (query === personaQueries.tipoIdentificacionRes) {
      return { rows: [{ id_tipo_identificacion: 'CC', nombre: 'Cedula' }] };
    }
    if (query === personaQueries.tiposPersonaRes) {
      return { rows: [{ id_tipo_persona: 'TP', nombre: 'Beneficiario' }] };
    }
    if (query === personaQueries.sexoInfoRes) {
      return { rows: [{ id_sexo: 'F', nombre: 'Femenino' }] };
    }
    if (query === personaQueries.ubicacionesRes) {
      return { rows: [{ id_ubicacion: 'UB', nombre: 'Urbano' }] };
    }
    return { rows: [], rowCount: 0 };
  });

  const result = await dataSource.getPreBeneficiarios('usuario-2');

  expect(clientQueryMock).toHaveBeenCalledWith(personaQueries.allSedesRes);
  expect(Array.isArray(result)).toBe(true);
  if (Array.isArray(result)) {
    expect(result[0].sedes).toHaveLength(1);
    expect(result[0].sedes[0].nombre).toBe('Sede fallback');
  }
});

it('getPreBeneficiarios entrega valores por defecto cuando no hay datos base', async () => {
  clientQueryMock.mockImplementation(async (query: string) => {
    if (query === personaQueries.programaRes) {
      return { rows: [] };
    }
    if (query === personaQueries.resPersonaGrupoInteres) {
      return { rows: [] };
    }
    if (query === personaQueries.sedesRes) {
      return {} as any;
    }
    if (query === personaQueries.allSedesRes) {
      return { rows: [] };
    }
    if (query === personaQueries.tipoIdentificacionRes) {
      return { rows: [] };
    }
    if (query === personaQueries.tiposPersonaRes) {
      return { rows: [] };
    }
    if (query === personaQueries.sexoInfoRes) {
      return { rows: [] };
    }
    if (query === personaQueries.ubicacionesRes) {
      return { rows: [] };
    }
    return { rows: [], rowCount: 0 };
  });

  const result = await dataSource.getPreBeneficiarios('usuario-3');

  expect(clientQueryMock).toHaveBeenCalledWith(personaQueries.allSedesRes);
  expect(Array.isArray(result)).toBe(true);
  if (Array.isArray(result)) {
    expect(result[0].id_programa).toBe('0');
    expect(result[0].id_grupo_interes).toBe('0');
    expect(result[0].sedes).toHaveLength(0);
    expect(result[0].tiposIdentificacion).toHaveLength(0);
  }
});

it('getPreBeneficiarios convierte valores no serializables a "0"', async () => {
  clientQueryMock.mockImplementation(async (query: string) => {
    if (query === personaQueries.programaRes) {
      return { rows: [{ id_programa: { unexpected: true } }] };
    }
    if (query === personaQueries.resPersonaGrupoInteres) {
      return { rows: [{ id_grupo_interes: { nested: 'value' } }] };
    }
    if (query === personaQueries.sedesRes) {
      return { rows: [] };
    }
    if (query === personaQueries.allSedesRes) {
      return { rows: [] };
    }
    if (query === personaQueries.tipoIdentificacionRes) {
      return { rows: [] };
    }
    if (query === personaQueries.tiposPersonaRes) {
      return { rows: [] };
    }
    if (query === personaQueries.sexoInfoRes) {
      return { rows: [] };
    }
    if (query === personaQueries.ubicacionesRes) {
      return { rows: [] };
    }
    return { rows: [], rowCount: 0 };
  });

  const result = await dataSource.getPreBeneficiarios('usuario-obj');

  expect(Array.isArray(result)).toBe(true);
  if (Array.isArray(result)) {
    expect(result[0].id_programa).toBe('0');
    expect(result[0].id_grupo_interes).toBe('0');
  }
});

  it('getPreBeneficiarios recorta cadenas en blanco a "0"', async () => {
    clientQueryMock.mockImplementation(async (query: string) => {
      if (query === personaQueries.programaRes) {
        return { rows: [{ id_programa: '   ' }] };
      }
      if (query === personaQueries.resPersonaGrupoInteres) {
        return { rows: [{ id_grupo_interes: ' GI-01 ' }] };
      }
      if (query === personaQueries.sedesRes) {
        return { rows: [] };
      }
      if (query === personaQueries.allSedesRes) {
        return { rows: [] };
      }
      if (query === personaQueries.tipoIdentificacionRes) {
        return { rows: [] };
      }
      if (query === personaQueries.tiposPersonaRes) {
        return { rows: [] };
      }
      if (query === personaQueries.sexoInfoRes) {
        return { rows: [] };
      }
      if (query === personaQueries.ubicacionesRes) {
        return { rows: [] };
      }
      return { rows: [], rowCount: 0 };
    });

    const result = await dataSource.getPreBeneficiarios('usuario-trim');

    expect(Array.isArray(result)).toBe(true);
    if (Array.isArray(result)) {
      expect(result[0].id_programa).toBe('0');
      expect(result[0].id_grupo_interes).toBe('GI-01');
    }
  });

it('getPreBeneficiarios retorna error si ocurre excepción', async () => {
  const consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
  clientQueryMock.mockRejectedValue(new Error('fallo prebeneficiarios'));

  const result = await dataSource.getPreBeneficiarios('usuario-1');

  try {
    expect('exitoso' in result).toBe(true);
    if ('exitoso' in result) {
      expect(result.exitoso).toBe('N');
      expect(result.mensaje).toBe(
        'Error al obtener prebeneficiarios: fallo prebeneficiarios',
      );
    }
    expect(poolConnectMock).toHaveBeenCalledTimes(1);
    expect(clientReleaseMock).toHaveBeenCalledTimes(1);
  } finally {
    consoleErrorSpy.mockRestore();
  }
});

it('getPersonasParams retorna lista correctamente', async () => {
  (pgPool.query as jest.Mock).mockResolvedValue({ rows: [{ id_persona: '10' }] });

  const result = await dataSource.getPersonasParams('sede-1', 'programa-2', 'grupo-3', 5, 0);

  expect(Array.isArray(result)).toBe(true);
  if (Array.isArray(result)) {
    expect(result[0]).toHaveProperty('id_persona', '10');
  }
  expect((pgPool.query as jest.Mock)).toHaveBeenCalledWith(personaQueries.getPersonasParams, [
    'sede-1',
    'programa-2',
    'grupo-3',
    5,
    0,
  ]);
});

it('getPersonasParams retorna error si ocurre excepción', async () => {
  const consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
  (pgPool.query as jest.Mock).mockRejectedValue(new Error('fallo params'));

  const result = await dataSource.getPersonasParams('sede-1', 'programa-2', 'grupo-3', 5, 0);

  try {
    expect('exitoso' in result).toBe(true);
    if ('exitoso' in result) {
      expect(result.exitoso).toBe('N');
      expect(result.mensaje).toBe(
        'Error al obtener personas con parámetros: fallo params',
      );
    }
  } finally {
    consoleErrorSpy.mockRestore();
  }
});

it('getPersonaByTipoIdentificacionNumeroIdentificacion retorna persona', async () => {
  (pgPool.query as jest.Mock).mockResolvedValue({ rows: [{ id_persona: '1' }] });

  const result = await dataSource.getPersonaByTipoIdenficacionNumeroIdentificacion('CC', '123');

  expect(result).toHaveProperty('id_persona', '1');
});

it('getPersonaByTipoIdentificacionNumeroIdentificacion retorna null si no encuentra', async () => {
  (pgPool.query as jest.Mock).mockResolvedValue({ rows: [] });

  const result = await dataSource.getPersonaByTipoIdenficacionNumeroIdentificacion('CC', '123');

  expect(result).toBeNull();
});

it('getPersonaByTipoIdentificacionNumeroIdentificacion retorna error si ocurre excepción', async () => {
  (pgPool.query as jest.Mock)
    .mockRejectedValueOnce(new Error('fallo persona por identificación'))
    .mockResolvedValueOnce({ rows: [] });

  const result = await dataSource.getPersonaByTipoIdenficacionNumeroIdentificacion('CC', '123');

  expect('exitoso' in result).toBe(true);
  if ('exitoso' in result) {
    expect(result.exitoso).toBe('N');
    expect(result.mensaje).toBe(
      'Error al obtener persona por tipo y número de identificación: fallo persona por identificación',
    );
  }
});

it('persistBeneficiario lanza error cuando falta id_persona', async () => {
  const mockClient = { query: jest.fn() } as any;
  const persistBeneficiario = (dataSource as any).persistBeneficiario.bind(dataSource);

  await expect(persistBeneficiario(mockClient, {} as any, '', '')).rejects.toThrow(
    'El identificador de la persona es obligatorio',
  );
  expect(mockClient.query).not.toHaveBeenCalled();
});

it('persistBeneficiario actualiza la sede cuando cambia', async () => {
  const queryMock = jest.fn(async (sql: string) => {
    if (sql === personaQueries.selectPersonaSede) {
      return { rowCount: 1, rows: [{ id_persona_sede: 'ps-1', id_sede: 'sede-anterior' }] };
    }
    return { rows: [], rowCount: 0 };
  });

  const mockClient = { query: queryMock } as any;
  const persistBeneficiario = (dataSource as any).persistBeneficiario.bind(dataSource);

  const persona = {
    id_persona: 'persona-1',
    id_tipo_persona: 'TP',
    id_sexo: 'M',
    id_ubicacion: 'UB',
    id_tipo_identificacion: 'CC',
    id_sede: 'sede-nueva',
  } as any;

  await persistBeneficiario(mockClient, persona, '', '');

  expect(queryMock).toHaveBeenCalledWith(personaQueries.updatePersonaSede, [
    'persona-1',
    'sede-nueva',
  ]);
});

it('updateBeneficiarios realiza commit cuando no hay errores', async () => {
  clientQueryMock.mockImplementation(async (query: string, _params?: unknown[]) => {
    if (query === 'BEGIN' || query === 'COMMIT') {
      return { rows: [], rowCount: 0 };
    }
    if (query === personaQueries.selectPersonaSede) {
      return { rowCount: 0, rows: [] };
    }
    return { rows: [], rowCount: 0 };
  });

  const beneficiario = {
    id_persona: '1',
    id_tipo_persona: 'TP',
    id_sexo: 'M',
    id_ubicacion: 'LOC',
    id_tipo_identificacion: 'CC',
    identificacion: '123',
    id_sede: 'SED-1',
  } as any;

  const payload = {
    id_programa: 'PRG-1',
    id_grupo_interes: 'GRP-1',
    nuevos: [beneficiario],
    modificados: [],
    eliminados: [{ id_persona: '2' }],
  } as any;

  const result = await dataSource.updateBeneficiarios(payload);

  expect(result.exitoso).toBe('S');
  expect(clientQueryMock).toHaveBeenCalledWith('BEGIN');
  expect(clientQueryMock).toHaveBeenCalledWith('COMMIT');
  expect(clientReleaseMock).toHaveBeenCalledTimes(1);
});

it('updateBeneficiarios procesa payload sin cambios', async () => {
  clientQueryMock.mockImplementation(async (query: string) => {
    if (query === 'BEGIN' || query === 'COMMIT') {
      return { rows: [], rowCount: 0 };
    }
    return { rows: [], rowCount: 0 };
  });

  const payload = {
    id_programa: '',
    id_grupo_interes: '',
  } as any;

  const result = await dataSource.updateBeneficiarios(payload);

  expect(result.exitoso).toBe('N');
  const upsertCalls = clientQueryMock.mock.calls.filter(([sql]) => sql === personaQueries.upsertPersona);
  expect(upsertCalls.length).toBe(0);
});

it('updateBeneficiarios hace rollback cuando ocurre excepción', async () => {
  const consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation(() => {});

  clientQueryMock.mockImplementation(async (query: string) => {
    if (query === 'BEGIN' || query === 'ROLLBACK') {
      return { rows: [], rowCount: 0 };
    }
    if (query === personaQueries.selectPersonaSede) {
      return { rowCount: 0, rows: [] };
    }
    if (query === personaQueries.upsertPersona) {
      throw new Error('fallo persistencia beneficiario');
    }
    return { rows: [], rowCount: 0 };
  });

  const beneficiario = {
    id_persona: '1',
    id_tipo_persona: 'TP',
    id_sexo: 'M',
    id_ubicacion: 'LOC',
    id_tipo_identificacion: 'CC',
    identificacion: '123',
    id_sede: 'SED-1',
  } as any;

  const payload = {
    id_programa: 'PRG-1',
    id_grupo_interes: 'GRP-1',
    nuevos: [beneficiario],
    modificados: [],
    eliminados: [],
  } as any;

  const result = await dataSource.updateBeneficiarios(payload);

  try {
    expect(result.exitoso).toBe('N');
    expect(result.mensaje).toBe(
      'Error al actualizar beneficiarios: fallo persistencia beneficiario',
    );
    const rollbackCalled = clientQueryMock.mock.calls.some(([sql]) => sql === 'ROLLBACK');
    expect(rollbackCalled).toBe(true);
    const commitCalled = clientQueryMock.mock.calls.some(([sql]) => sql === 'COMMIT');
    expect(commitCalled).toBe(false);
    expect(clientReleaseMock).toHaveBeenCalledTimes(1);
  } finally {
    consoleErrorSpy.mockRestore();
  }
});

it('updateBeneficiarios retorna error cuando el payload es indefinido', async () => {
  const consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation(() => {});

  const result = await dataSource.updateBeneficiarios(undefined as any);

  try {
    expect(result.exitoso).toBe('N');
    expect(result.mensaje).toMatch(/Datos obligatorios/);
    expect(consoleErrorSpy).toHaveBeenCalledWith(
      'updateBeneficiarios recibió un payload indefinido',
    );
  } finally {
    consoleErrorSpy.mockRestore();
  }
});
});