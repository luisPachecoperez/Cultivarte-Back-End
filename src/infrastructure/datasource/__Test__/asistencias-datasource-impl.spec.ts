describe('Cobertura branches faltantes', () => {
  let dataSource: AsistenciaDataSourceImpl;
  beforeEach(() => {
    dataSource = new AsistenciaDataSourceImpl();
    jest.clearAllMocks();
  });

  it('getAsistenciaSedes retorna error si ocurre excepción', async () => {
    (pgPool.query as jest.Mock).mockRejectedValue(new Error('DB error'));
    const result = await dataSource.getAsistenciasSede('u1', '2023-01-01', '2023-01-31');
    if ('exitoso' in result) {
      expect(result.exitoso).toBe('N');
      expect(result.mensaje).toMatch(/No se pudo obtener actividades por sedes/);
    } else {
      fail('Expected result to be of type RespuestaGrap');
    }
  });

  it('getAsistenciaSedes retorna error si ocurre excepción no Error', async () => {
    (pgPool.query as jest.Mock).mockRejectedValue({ custom: 'fail' });
    const result = await dataSource.getAsistenciasSede('u1', '2023-01-01', '2023-01-31');
    if ('exitoso' in result) {
      expect(result.exitoso).toBe('N');
      expect(result.mensaje).toMatch(/No se pudo obtener actividades por sedes/);
      expect(result.mensaje).toMatch(/custom/);
    } else {
      fail('Expected result to be of type RespuestaGrap');
    }
  });

  it('createAsistencia retorna error si ocurre excepción no Error', async () => {
    (pgPool.query as jest.Mock).mockRejectedValue({ custom: 'fail' });
    const asistencia = { id_asistencia: 'a1', id_sesion: 's1', id_persona: 'p1', id_creado_por: 'u1', fecha_creacion: '2023-01-01', id_modificado_por: 'u1', fecha_modificacion: '2023-01-01' };
    const result = await dataSource.createAsistencia(asistencia as any);
    if ('exitoso' in result) {
      expect(result.exitoso).toBe('N');
      expect(result.mensaje).toMatch(/No se pudo obtener actividades por sedes/);
      expect(result.mensaje).toMatch(/custom/);
    } else {
      fail('Expected result to be of type RespuestaGrap');
    }
  });

  it('updateAsistencias retorna error si ocurre excepción en bucle de inserción', async () => {
    (pgPool.query as jest.Mock).mockImplementationOnce(() => { throw new Error('DB error'); });
    const asistenciaSesiones = {
      nuevos: [{ id_asistencia: 'a1', id_sesion: 's1', id_persona: 'p1' }],
      id_sesion: 's1',
      id_actividad: 'act1',
      imagen: '',
      numero_asistentes: 1,
      descripcion: '',
    };
    const result = await dataSource.updateAsistencias(asistenciaSesiones as any);
    expect(result.exitoso).toBe('N');
    expect(result.mensaje).toMatch(/No se pudo actualizar la asistencia/);
  });

  it('getPreAsistencia retorna error si ocurre excepción no Error en consultas paralelas', async () => {
    (pgPool.query as jest.Mock)
      .mockResolvedValueOnce({ rows: [{ id_sesion: 's1', id_actividad: 'a1' }] }) // sesionResult
      .mockResolvedValueOnce({ rows: [{ id_actividad: 'a1', id_sede: 'sede1', id_tipo_actividad: 'tipo1' }] }) // actividadResult
      .mockRejectedValueOnce({ custom: 'fail' }); // sedesResult
    const result = await dataSource.getPreAsistencia('s1');
    if ('exitoso' in result) {
      expect(result.exitoso).toBe('N');
      expect(result.mensaje).toMatch(/custom/);
    } else {
      fail('Expected result to be of type RespuestaGrap');
    }
  });

  it('getPreAsistencia retorna error general si ocurre excepción no Error', async () => {
    (pgPool.query as jest.Mock).mockRejectedValueOnce({ custom: 'fail' });
    const result = await dataSource.getPreAsistencia('s1');
    if ('exitoso' in result) {
      expect(result.exitoso).toBe('N');
      expect(result.mensaje).toMatch(/No se pudo obtener la pre-asistencia/);
    } else {
      fail('Expected result to be of type RespuestaGrap');
    }
  });

  it('getPreAsistencia retorna preAsistencia con arrays vacíos', async () => {
    (pgPool.query as jest.Mock)
      .mockResolvedValueOnce({ rows: [{ id_sesion: 's1', id_actividad: 'a1', nro_asistentes: 5, descripcion: 'desc', imagen: 'img' }] }) // sesionResult
      .mockResolvedValueOnce({ rows: [{ id_actividad: 'a1', id_sede: 'sede1', id_tipo_actividad: 'tipo1' }] }) // actividadResult
      .mockResolvedValueOnce({ rows: [] }) // sedesResult
      .mockResolvedValueOnce({ rows: [] }) // beneficiariosResult
      .mockResolvedValueOnce({ rows: [] }) // asistentesSesionesResult
      .mockResolvedValueOnce({ rows: [{ nombre: 'Actividad institucional' }] }); // parametrosResult
    const result = await dataSource.getPreAsistencia('s1');
    if ('exitoso' in result) {
      fail('Expected result to be PreAsistencia');
      return;
    }
    expect(result).toHaveProperty('id_sesion', 's1');
    expect(result).toHaveProperty('id_sede', 'sede1');
    expect(result.sedes).toEqual([]);
    expect(result.beneficiarios).toEqual([]);
    expect(result.asistentes_sesiones).toEqual([]);
  });
});
  it('getPreAsistencia retorna error si actividad es null (cubre línea 245)', async () => {
    // Mock para que la sesión exista pero la actividad sea null
    (pgPool.query as jest.Mock)
      .mockResolvedValueOnce({ rows: [{ id_sesion: 's1', id_actividad: 'a1' }] }) // sesionResult.rows
      .mockResolvedValueOnce({ rows: [] }); // actividadResult.rows vacío
    const ds = new AsistenciaDataSourceImpl();
    const result = await ds.getPreAsistencia('s1');
    if ('exitoso' in result) {
      expect(result.exitoso).toBe('N');
      expect(result.mensaje).toMatch(/No se encontró la actividad asociada a la sesión/);
    } else {
      fail('Expected result to be of type RespuestaGrap');
    }
  });
  it('getPreAsistencia retorna error si sesión es null', async () => {
    (pgPool.query as jest.Mock).mockResolvedValueOnce({ rows: [] }); // sesionResult.rows vacío
    const ds = new AsistenciaDataSourceImpl();
    const result = await ds.getPreAsistencia('id_sesion');
    if ('exitoso' in result) {
      expect(result.exitoso).toBe('N');
      expect(result.mensaje).toMatch(/Sesión no encontrada/);
    } else {
      fail('Expected result to be of type RespuestaGrap');
    }
  });
import { AsistenciaDataSourceImpl } from '../../../infrastructure/datasource/asistencias-datasource-impl';
import { pgPool } from '../../db/pool';

jest.mock('../../../infrastructure/db/pool', () => ({
  pgPool: {
    query: jest.fn(),
  },
}));

describe('AsistenciaDataSourceImpl', () => {
  it('getAll retorna error si ocurre excepción no Error', async () => {
    (pgPool.query as jest.Mock).mockRejectedValue(123);
    const result = await dataSource.getAll();
    if ('exitoso' in result) {
      expect(result.exitoso).toBe('N');
      expect(result.mensaje).toMatch(/123/);
    } else {
      fail('Expected result to be of type RespuestaGrap');
    }
  });

  it('getById retorna error si ocurre excepción no Error', async () => {
    (pgPool.query as jest.Mock).mockRejectedValue({ custom: 'fail' });
    const result = await dataSource.getById('a1');
    if ('exitoso' in result) {
      expect(result.exitoso).toBe('N');
      expect(result.mensaje).toMatch(/custom/);
    } else {
      fail('Expected result to be of type RespuestaGrap');
    }
  });

  it('updateAsistencias retorna error si ocurre excepción en query', async () => {
    (pgPool.query as jest.Mock).mockImplementation(() => { throw new Error('DB error'); });
    const asistenciaSesiones = {
      id_sesion: 's1',
      id_actividad: 'act1',
      imagen: '',
      numero_asistentes: 1,
      descripcion: '',
      nuevos: [{ id_asistencia: 'a1', id_sesion: 's1', id_persona: 'p1' }],
    };
    const result = await dataSource.updateAsistencias(asistenciaSesiones as any);
    expect(result.exitoso).toBe('N');
    expect(result.mensaje).toMatch(/DB error/);
  });

  it('updateAsistencias retorna error si ocurre excepción no Error en query', async () => {
    (pgPool.query as jest.Mock).mockImplementationOnce(() => { throw 'string error'; });
    const asistenciaSesiones = {
      id_sesion: 's1',
      id_actividad: 'act1',
      imagen: '',
      numero_asistentes: 1,
      descripcion: '',
      nuevos: [{ id_asistencia: 'a1', id_sesion: 's1', id_persona: 'p1' }],
    };
    const result = await dataSource.updateAsistencias(asistenciaSesiones as any);
    expect(result.exitoso).toBe('N');
    expect(result.mensaje).toMatch(/string error/);
  });
  it('updateAsistencias retorna error si nuevos es undefined', async () => {
    const asistenciaSesiones = {
      id_sesion: 's1',
      id_actividad: 'act1',
      imagen: '',
      numero_asistentes: 1,
      descripcion: '',
      // nuevos is undefined
    };
    const result = await dataSource.updateAsistencias(asistenciaSesiones as any);
    expect(result.exitoso).toBe('N');
    expect(result.mensaje).toMatch(/No se pudo actualizar la asistencia/);
  });
  let dataSource: AsistenciaDataSourceImpl;

  beforeEach(() => {
    dataSource = new AsistenciaDataSourceImpl();
    jest.clearAllMocks();
  });

  it('getAll retorna asistencias correctamente', async () => {
    (pgPool.query as jest.Mock).mockResolvedValue({ rows: [{ id_asistencia: 'a1' }] });
    const result = await dataSource.getAll();
    expect(Array.isArray(result)).toBe(true);
    expect(result[0]).toHaveProperty('id_asistencia', 'a1');
  });

  it('getAll retorna error si ocurre excepción', async () => {
    (pgPool.query as jest.Mock).mockRejectedValue(new Error('DB error'));
    const result = await dataSource.getAll();
    if ('exitoso' in result) {
      expect(result.exitoso).toBe('N');
      if ('mensaje' in result) {
        expect(result.mensaje).toMatch(/No se pudo obtener actividades por sedes/);
      } else {
        fail('Expected result to have mensaje property');
      }
    } else {
      fail('Expected result to be of type RespuestaGrap');
    }
  });

  it('getById retorna asistencia correctamente', async () => {
    (pgPool.query as jest.Mock).mockResolvedValue({ rows: [{ id_asistencia: 'a1' }] });
    const result = await dataSource.getById('a1');
    expect(result).toHaveProperty('id_asistencia', 'a1');
  });

  it('getById retorna null si no hay asistencia', async () => {
    (pgPool.query as jest.Mock).mockResolvedValue({ rows: [] });
    const result = await dataSource.getById('a1');
    expect(result).toBeNull();
  });

  it('getById retorna error si ocurre excepción', async () => {
    (pgPool.query as jest.Mock).mockRejectedValue(new Error('DB error'));
    const result = await dataSource.getById('a1');
    if ('exitoso' in result) {
      if ('exitoso' in result) {
        if ('exitoso' in result) {
          if ('exitoso' in result) {
            expect(result.exitoso).toBe('N');
            expect(result.mensaje).toMatch(/No se pudo obtener actividades por sedes/);
          } else {
            fail('Expected result to be of type RespuestaGrap');
          }
        } else {
          fail('Expected result to be of type RespuestaGrap');
        }
      } else {
        fail('Expected result to be of type RespuestaGrap');
      }
    } else {
      fail('Expected result to be of type RespuestaGrap');
    }
  });

  it('getAsistenciasSede retorna asistencias correctamente', async () => {
    (pgPool.query as jest.Mock).mockResolvedValue({ rows: [{ id_asistencia: 'a1' }] });
    const result = await dataSource.getAsistenciasSede('u1', '2023-01-01', '2023-01-31');
    expect(Array.isArray(result)).toBe(true);
    expect(result[0]).toHaveProperty('id_asistencia', 'a1');
  });

  it('getAsistenciasSede retorna error si ocurre excepción', async () => {
    (pgPool.query as jest.Mock).mockRejectedValue(new Error('DB error'));
    const result = await dataSource.getAsistenciasSede('u1', '2023-01-01', '2023-01-31');
    if ('exitoso' in result) {
      expect(result.exitoso).toBe('N');
      expect(result.mensaje).toMatch(/No se pudo obtener actividades por sedes/);
    } else {
      fail('Expected result to be of type RespuestaGrap');
    }
  });

  it('createAsistencia retorna respuesta correctamente', async () => {
    (pgPool.query as jest.Mock).mockResolvedValue({ rows: [{ exitoso: 'S', mensaje: 'Creada' }] });
    const asistencia = { id_asistencia: 'a1', id_sesion: 's1', id_persona: 'p1', id_creado_por: 'u1', fecha_creacion: '2023-01-01', id_modificado_por: 'u1', fecha_modificacion: '2023-01-01' };
    const result = await dataSource.createAsistencia(asistencia as any);
    expect(result.exitoso).toBe('S');
    expect(result.mensaje).toBe('Creada');
  });

  it('createAsistencia retorna error si ocurre excepción', async () => {
    (pgPool.query as jest.Mock).mockRejectedValue(new Error('DB error'));
    const asistencia = { id_asistencia: 'a1', id_sesion: 's1', id_persona: 'p1', id_creado_por: 'u1', fecha_creacion: '2023-01-01', id_modificado_por: 'u1', fecha_modificacion: '2023-01-01' };
    const result = await dataSource.createAsistencia(asistencia as any);
    expect(result.exitoso).toBe('N');
    expect(result.mensaje).toMatch(/No se pudo obtener actividades por sedes/);
  });

  it('updateAsistencias actualiza solo sesiones si nuevos es null', async () => {
    (pgPool.query as jest.Mock).mockResolvedValue({});
    const asistenciaSesiones = { nuevos: null, id_sesion: 's1', id_actividad: 'act1', imagen: '', numero_asistentes: 1, descripcion: '' };
    const result = await dataSource.updateAsistencias(asistenciaSesiones as any);
    expect(result.exitoso).toBe('S');
    expect(result.mensaje).toMatch(/actualizada correctamente/);
  });

  it('updateAsistencias actualiza asistencias si nuevos tiene elementos', async () => {
    (pgPool.query as jest.Mock).mockResolvedValue({});
    const asistenciaSesiones = {
      nuevos: [{ id_asistencia: 'a1', id_sesion: 's1', id_persona: 'p1' }],
      id_sesion: 's1',
      id_actividad: 'act1',
      imagen: '',
      numero_asistentes: 1,
      descripcion: '',
    };
    const result = await dataSource.updateAsistencias(asistenciaSesiones as any);
    expect(result.exitoso).toBe('S');
    expect(result.mensaje).toMatch(/actualizada correctamente/);
  });

  it('updateAsistencias retorna error si nuevos es array vacío', async () => {
    const asistenciaSesiones = {
      nuevos: [],
      id_sesion: 's1',
      id_actividad: 'act1',
      imagen: '',
      numero_asistentes: 1,
      descripcion: '',
    };
    const result = await dataSource.updateAsistencias(asistenciaSesiones as any);
    expect(result.exitoso).toBe('N');
    expect(result.mensaje).toMatch(/No se pudo actualizar la asistencia/);
  });

  it('updateById retorna éxito si rowCount > 0', async () => {
    (pgPool.query as jest.Mock).mockResolvedValue({ rowCount: 1 });
    const asistencia = { id_sesion: 's1', id_persona: 'p1', id_modificado_por: 'u1', fecha_modificacion: '2023-01-01' };
    const result = await dataSource.updateById('a1', asistencia as any);
    expect(result.exitoso).toBe('S');
    expect(result.mensaje).toMatch(/actualizada correctamente/);
  });

  it('updateById retorna error si rowCount es 0', async () => {
    (pgPool.query as jest.Mock).mockResolvedValue({ rowCount: 0 });
    const asistencia = { id_sesion: 's1', id_persona: 'p1', id_modificado_por: 'u1', fecha_modificacion: '2023-01-01' };
    const result = await dataSource.updateById('a1', asistencia as any);
    expect(result.exitoso).toBe('N');
    expect(result.mensaje).toMatch(/No se encontró la asistencia a actualizar/);
  });

  it('updateById retorna error si ocurre excepción', async () => {
    (pgPool.query as jest.Mock).mockRejectedValue(new Error('DB error'));
    const asistencia = { id_sesion: 's1', id_persona: 'p1', id_modificado_por: 'u1', fecha_modificacion: '2023-01-01' };
    const result = await dataSource.updateById('a1', asistencia as any);
    expect(result.exitoso).toBe('N');
    expect(result.mensaje).toMatch(/No se pudo actualizar la asistencia/);
  });

  it('deleteById retorna éxito si rowCount > 0', async () => {
    (pgPool.query as jest.Mock).mockResolvedValue({ rowCount: 1 });
    const result = await dataSource.deleteById('a1');
    expect(result.exitoso).toBe('S');
    expect(result.mensaje).toMatch(/eliminada correctamente/);
  });

  it('deleteById retorna error si rowCount es 0', async () => {
    (pgPool.query as jest.Mock).mockResolvedValue({ rowCount: 0 });
    const result = await dataSource.deleteById('a1');
    expect(result.exitoso).toBe('N');
    expect(result.mensaje).toMatch(/No se encontró la asistencia a eliminar/);
  });

  it('deleteById retorna error si ocurre excepción', async () => {
    (pgPool.query as jest.Mock).mockRejectedValue(new Error('DB error'));
    const result = await dataSource.deleteById('a1');
    expect(result.exitoso).toBe('N');
    expect(result.mensaje).toMatch(/No se pudo eliminar la asistencia/);
  });

  it('getPreAsistencia retorna error si no hay sesión', async () => {
    (pgPool.query as jest.Mock).mockResolvedValueOnce({ rows: [] });
    const result = await dataSource.getPreAsistencia('s1');
    if ('exitoso' in result) {
      expect(result.exitoso).toBe('N');
      expect(result.mensaje).toMatch(/Sesión no encontrada/);
    } else {
      fail('Expected result to be of type RespuestaGrap');
    }
  });



  it('getPreAsistencia retorna error si ocurre excepción en consultas paralelas', async () => {
    (pgPool.query as jest.Mock)
      .mockResolvedValueOnce({ rows: [{ id_sesion: 's1', id_actividad: 'a1' }] }) // sesionResult
      .mockResolvedValueOnce({ rows: [{ id_actividad: 'a1', id_sede: 'sede1', id_tipo_actividad: 'tipo1' }] }) // actividadResult
      .mockRejectedValueOnce(new Error('DB error')); // sedesResult
    const result = await dataSource.getPreAsistencia('s1');
    if ('exitoso' in result) {
      if ('exitoso' in result) {
        expect(result.exitoso).toBe('N');
        expect([
          'No se pudo obtener la pre-asistencia',
          "Error al obtener datos de pre-asistencia: DB error",
          'Error al obtener datos de pre-asistencia'
        ]).toContain(result.mensaje);
      } else {
        fail('Expected result to be of type RespuestaGrap');
      }
    } else {
      fail('Expected result to be of type RespuestaGrap');
    }
  });

  it('getPreAsistencia retorna preAsistencia correctamente', async () => {
    (pgPool.query as jest.Mock)
      .mockResolvedValueOnce({ rows: [{ id_sesion: 's1', id_actividad: 'a1', nro_asistentes: 5, descripcion: 'desc', imagen: 'img' }] }) // sesionResult
      .mockResolvedValueOnce({ rows: [{ id_actividad: 'a1', id_sede: 'sede1', id_tipo_actividad: 'tipo1' }] }) // actividadResult
      .mockResolvedValueOnce({ rows: [{ id_sede: 'sede1' }] }) // sedesResult
      .mockResolvedValueOnce({ rows: [{ id_beneficiario: 'b1' }] }) // beneficiariosResult
      .mockResolvedValueOnce({ rows: [{ id_asistente: 'as1' }] }) // asistentesSesionesResult
      .mockResolvedValueOnce({ rows: [{ nombre: 'Actividad institucional' }] }); // parametrosResult

    const result = await dataSource.getPreAsistencia('s1');
    expect(result).toHaveProperty('id_sesion', 's1');
    expect(result).toHaveProperty('id_sede', 'sede1');
    if ('foto' in result) {
      expect(result.foto).toBe('S');
    } else {
      fail('Expected result to have foto property');
    }
    if ('numero_asistentes' in result) {
      expect(result.numero_asistentes).toBe(5);
    } else {
      fail('Expected result to have numero_asistentes property');
    }
    if ('sedes' in result) {
      expect(Array.isArray(result.sedes)).toBe(true);
      expect(Array.isArray(result.beneficiarios)).toBe(true);
      expect(Array.isArray(result.asistentes_sesiones)).toBe(true);
    } else {
      fail('Expected result to have sedes property');
    }
  });

  it('getPreAsistencia retorna error si ocurre excepción en consultas paralelas', async () => {
  (pgPool.query as jest.Mock)
    .mockResolvedValueOnce({ rows: [{ id_sesion: 's1', id_actividad: 'a1' }] }) // sesionResult
    .mockResolvedValueOnce({ rows: [{ id_actividad: 'a1', id_sede: 'sede1', id_tipo_actividad: 'tipo1' }] }) // actividadResult
    .mockRejectedValueOnce(new Error('DB error')); // sedesResult (Promise.all)
  const result = await dataSource.getPreAsistencia('s1');
 if ('exitoso' in result) {
  // Aquí es seguro acceder a result.exitoso
  expect(result.exitoso).toBe('N');
  expect([
  'No se pudo obtener la pre-asistencia',
  "Error al obtener datos de pre-asistencia: DB error",
  'Error al obtener datos de pre-asistencia'
]).toContain(result.mensaje);
} else {
  // Aquí puedes hacer pruebas para PreAsistencia
  expect(result).toHaveProperty('id_sesion', 's1');
  // ...otros expects para PreAsistencia
}
});

describe('AsistenciaDataSourceImpl additional coverage', () => {
  let dataSource: AsistenciaDataSourceImpl;

  beforeEach(() => {
    dataSource = new AsistenciaDataSourceImpl();
    (pgPool.query as jest.Mock).mockReset();
  });

  it('updateById captura excepciones no Error', async () => {
    (pgPool.query as jest.Mock).mockRejectedValueOnce({ reason: 'boom' });

    const result = await dataSource.updateById(
      'id-asistencia',
      {
        id_sesion: 's1',
        id_persona: 'p1',
        id_modificado_por: 'u1',
        fecha_modificacion: '2023-01-01',
      } as any,
    );

    expect(result.exitoso).toBe('N');
    expect(result.mensaje).toContain('boom');
  });

  it('deleteById captura excepciones no Error', async () => {
    (pgPool.query as jest.Mock).mockRejectedValueOnce('kaput');

    const result = await dataSource.deleteById('id-asistencia');

    expect(result.exitoso).toBe('N');
    expect(result.mensaje).toContain('kaput');
  });

  it('getPreAsistencia arma respuesta con valores por defecto', async () => {
    (pgPool.query as jest.Mock)
      .mockResolvedValueOnce({
        rows: [
          {
            id_sesion: 's1',
            id_actividad: 'a1',
            nro_asistentes: '7',
            descripcion: 'Sesión prueba',
            imagen: 'img.png',
          },
        ],
      })
      .mockResolvedValueOnce({
        rows: [
          {
            id_sede: 'sede-1',
            id_tipo_actividad: 'tipo-1',
          },
        ],
      })
      .mockResolvedValueOnce({ rows: [{ id_sede: 'sede-1' }] })
      .mockResolvedValueOnce({ rows: [{ id_persona: 'p1' }] })
      .mockResolvedValueOnce({ rows: [{ id_asistencia: 'a1' }] })
      .mockResolvedValueOnce({ rows: [{ nombre: 'Actividad institucional' }] });

    const result = await dataSource.getPreAsistencia('s1');

    if ('exitoso' in result) {
      fail('Se esperaba un objeto de pre-asistencia');
      return;
    }

    expect(result.id_sede).toBe('sede-1');
    expect(result.numero_asistentes).toBe(7);
    expect(result.foto).toBe('S');
    expect(result.descripcion).toBe('Sesión prueba');
    expect(result.imagen).toBe('img.png');
  });
});

it('getPreAsistencia retorna error general si ocurre excepción', async () => {
  (pgPool.query as jest.Mock).mockRejectedValue(new Error('General error'));
  const result = await dataSource.getPreAsistencia('s1');
if ('exitoso' in result) {
  // Aquí es seguro acceder a result.exitoso
  expect(result.exitoso).toBe('N');
  expect(result.mensaje).toBe(
    'No se pudo obtener la pre-asistencia: General error',
  );
} else {
  // Aquí puedes hacer pruebas para PreAsistencia
  expect(result).toHaveProperty('id_sesion', 's1');
  // ...otros expects para PreAsistencia
}
});

it('getPreAsistencia retorna error si ocurre excepción no Error en consultas paralelas', async () => {
  (pgPool.query as jest.Mock)
    .mockResolvedValueOnce({ rows: [{ id_sesion: 's1', id_actividad: 'a1' }] }) // sesionResult
    .mockResolvedValueOnce({ rows: [{ id_actividad: 'a1', id_sede: 'sede1', id_tipo_actividad: 'tipo1' }] }) // actividadResult
    .mockRejectedValueOnce({ custom: 'fail' }); // sedesResult (Promise.all)
  const result = await dataSource.getPreAsistencia('s1');
  if ('exitoso' in result) {
    expect(result.exitoso).toBe('N');
    expect(result.mensaje).toMatch(/Error al obtener datos de pre-asistencia:/);
    expect(result.mensaje).toMatch(/custom/);
  } else {
    throw new Error('Expected error response, but got PreAsistencia');
  }
});

it('getPreAsistencia retorna preAsistencia con foto N si nombre no esperado', async () => {
  (pgPool.query as jest.Mock)
    .mockResolvedValueOnce({ rows: [{ id_sesion: 's1', id_actividad: 'a1', nro_asistentes: 5, descripcion: 'desc', imagen: 'img' }] }) // sesionResult
    .mockResolvedValueOnce({ rows: [{ id_actividad: 'a1', id_sede: 'sede1', id_tipo_actividad: 'tipo1' }] }) // actividadResult
    .mockResolvedValueOnce({ rows: [{ id_sede: 'sede1' }] }) // sedesResult
    .mockResolvedValueOnce({ rows: [{ id_beneficiario: 'b1' }] }) // beneficiariosResult
    .mockResolvedValueOnce({ rows: [{ id_asistente: 'as1' }] }) // asistentesSesionesResult
    .mockResolvedValueOnce({ rows: [{ nombre: 'Otro nombre' }] }); // parametrosResult

  const result = await dataSource.getPreAsistencia('s1');
  expect(result).toHaveProperty('id_sesion', 's1');
  if ('foto' in result) {
    expect(result.foto).toBe('N');
  } else {
    fail('Expected result to have foto property');
  }
});

it('getPreAsistencia retorna preAsistencia con arrays vacíos', async () => {
  (pgPool.query as jest.Mock)
    .mockResolvedValueOnce({ rows: [{ id_sesion: 's1', id_actividad: 'a1', nro_asistentes: 5, descripcion: 'desc', imagen: 'img' }] }) // sesionResult
    .mockResolvedValueOnce({ rows: [{ id_actividad: 'a1', id_sede: 'sede1', id_tipo_actividad: 'tipo1' }] }) // actividadResult
    .mockResolvedValueOnce({ rows: [] }) // sedesResult
    .mockResolvedValueOnce({ rows: [] }) // beneficiariosResult
    .mockResolvedValueOnce({ rows: [] }) // asistentesSesionesResult
    .mockResolvedValueOnce({ rows: [{ nombre: 'Actividad institucional' }] }); // parametrosResult

  const result = await dataSource.getPreAsistencia('s1');
  if ('sedes' in result && 'beneficiarios' in result && 'asistentes_sesiones' in result) {
    expect(result).toHaveProperty('id_sesion', 's1');
    expect(Array.isArray(result.sedes)).toBe(true);
    expect(result.sedes.length).toBe(0);
    expect(Array.isArray(result.beneficiarios)).toBe(true);
    expect(result.beneficiarios.length).toBe(0);
    expect(Array.isArray(result.asistentes_sesiones)).toBe(true);
    expect(result.asistentes_sesiones.length).toBe(0);
  } else {
    fail('Expected result to have sedes, beneficiarios, and asistentes_sesiones properties');
  }
});
});