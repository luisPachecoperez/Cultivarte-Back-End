import { ActividadDataSourceImpl } from '../actividad-datasource-impl';
import { pgPool } from '../../db/pool';
import { actividadQueries } from '../../db/actividad-queries';

type QueryMock = jest.MockedFunction<typeof pgPool.query>;
type ConnectMock = jest.MockedFunction<typeof pgPool.connect>;

jest.mock('../../db/pool', () => ({
  pgPool: {
    query: jest.fn(),
    connect: jest.fn(),
  },
}));

describe('ActividadDataSourceImpl targeted branches', () => {
  let dataSource: ActividadDataSourceImpl;
  let queryMock: QueryMock;
  let connectMock: ConnectMock;

  beforeEach(() => {
    jest.clearAllMocks();
    dataSource = new ActividadDataSourceImpl();
    queryMock = pgPool.query as QueryMock;
    connectMock = pgPool.connect as ConnectMock;
  });

  it('applies fallbacks when pre-create queries return empty data', async () => {
    const client = {
      query: jest.fn(),
      release: jest.fn(),
    };

    connectMock.mockResolvedValue(client as any);

    client.query.mockImplementation(async (sql: string) => {
      switch (sql) {
        case actividadQueries.programaRes:
          return { rows: [] } as any;
        case actividadQueries.sedesResult:
          return { rows: [] } as any;
        case actividadQueries.tiposDeActividadResult:
        case actividadQueries.aliadosResult:
        case actividadQueries.responsablesResult:
          return {} as any;
        case actividadQueries.nombreDeActividadResult:
          return {
            rows: [
              { id_tipo_actividad: undefined, nombre: 'ignorado' },
              { id_tipo_actividad: 'tipo2', nombre: '', valores: 'X' },
              {
                id_tipo_actividad: 'tipo3',
                nombre: 'Nombre válido',
                valores: ' ,Valido , ',
              },
            ],
          } as any;
        case actividadQueries.frecuenciasResult:
          return {} as any;
        case actividadQueries.allSedesResult:
          return {
            rows: [{ id_sede: 'SED-ALL', nombre: 'Sede General' }],
          } as any;
        default:
          throw new Error(`Unexpected SQL: ${sql}`);
      }
    });

    const result = await dataSource.getPreCreateActividad('user-x');

    if ('exitoso' in result) {
      throw new Error('Expected a successful pre-create payload');
    }

    expect(result.id_programa).toBe('');
    expect(result.sedes).toEqual([{ id_sede: 'SED-ALL', nombre: 'Sede General' }]);
    expect(result.tiposDeActividad).toEqual([]);
    expect(result.aliados).toEqual([]);
    expect(result.responsables).toEqual([]);
    expect(result.frecuencias).toEqual([]);
    expect(result.nombresDeActividad).toEqual([
      { id_tipo_actividad: 'tipo3', nombre: 'Valido' },
    ]);
    expect(client.query).toHaveBeenCalledWith(
      actividadQueries.allSedesResult,
    );
    expect(client.release).toHaveBeenCalledTimes(1);
  });

  it('returns error when getPreEditActividad cannot determine programa', async () => {
    queryMock.mockImplementation(async (sql: string) => {
      switch (sql) {
        case actividadQueries.programaRes:
          return { rows: [] } as any;
        default:
          return { rows: [] } as any;
      }
    });

    const result = await dataSource.getPreEditActividad('act-x', 'user-x');

    expect(result).toEqual({
      exitoso: 'N',
      mensaje: 'No se pudo determinar el programa para el usuario.',
    });
  });

  it('uses fallback arrays in getPreEditActividad when queries return nothing', async () => {
    queryMock.mockImplementation(async (sql: string) => {
      switch (sql) {
        case actividadQueries.programaRes:
          return { rows: [{ id_programa: 'PROG-1' }] } as any;
        case actividadQueries.sedesResult:
          return { rows: [] } as any;
        case actividadQueries.tiposDeActividadResult:
        case actividadQueries.aliadosResult:
        case actividadQueries.responsablesResult:
          return {} as any;
        case actividadQueries.nombreDeActividadResult:
          return {
            rows: [
              { id_tipo_actividad: undefined, nombre: 'IGNORED' },
              { id_tipo_actividad: 'T-2', nombre: '', valores: 'A' },
              {
                id_tipo_actividad: 'T-3',
                nombre: 'Nombre',
                valores: ' ,Util ',
              },
            ],
          } as any;
        case actividadQueries.frecuenciasResult:
          return {} as any;
        case actividadQueries.actividadResult:
          return {
            rows: [
              {
                id_actividad: 'ACT-1',
                fecha_actividad: undefined,
                fecha_creacion: undefined,
                fecha_modificacion: undefined,
              },
            ],
          } as any;
        case actividadQueries.sesionesResult:
          return {} as any;
        case actividadQueries.allSedesResult:
          return {
            rows: [{ id_sede: 'SED-1', nombre: 'Fallback' }],
          } as any;
        default:
          throw new Error(`Unexpected SQL: ${sql}`);
      }
    });

    const result = await dataSource.getPreEditActividad('act-1', 'user-1');

    if ('exitoso' in result) {
      throw new Error('Expected successful payload');
    }

    expect(result.sedes).toEqual([{ id_sede: 'SED-1', nombre: 'Fallback' }]);
    expect(result.tiposDeActividad).toEqual([]);
    expect(result.aliados).toEqual([]);
    expect(result.responsables).toEqual([]);
    expect(result.frecuencias).toEqual([]);
    expect(result.nombresDeActividad).toEqual([
      { id_tipo_actividad: 'T-3', nombre: 'Util' },
    ]);
    expect(result.sesiones).toEqual([]);
    expect(result.actividad).toMatchObject({ id_actividad: 'ACT-1' });
    expect(queryMock).toHaveBeenCalledWith(actividadQueries.allSedesResult);
  });

  it('falls back when nombreDeActividad valores cannot be parsed (line ~252)', async () => {
    const responses = [
      { rows: [{ id_programa: 'prog1' }] }, // programaRes
      { rows: [{ id_sede: 'sede1', nombre: 'Sede 1' }] }, // sedesRes
      { rows: [] }, // tiposDeActividadRes
      { rows: [] }, // aliadosRes
      { rows: [] }, // responsablesRes
      {
        rows: [
          {
            id_tipo_actividad: 'tipo1',
            nombre: 'Nombre base',
            valores: {} as unknown as string,
          },
        ],
      }, // nombreDeActividadRes
      { rows: [] }, // frecuenciasRes
      {
        rows: [
          {
            id_actividad: 'act1',
            fecha_actividad: '2024-01-02',
            fecha_creacion: '2024-01-01',
            fecha_modificacion: '2024-01-03',
          },
        ],
      }, // actividadRes
      {
        rows: [
          {
            id_sesion: 'ses1',
            fecha_actividad: '2024-01-04',
            fecha_creacion: '2024-01-04',
            fecha_modificacion: '2024-01-05',
          },
        ],
      }, // sesionesRes
    ];

    queryMock.mockImplementation(() =>
      Promise.resolve((responses.shift() ?? { rows: [] }) as any),
    );

    const result = await dataSource.getPreEditActividad('act1', 'user1');

    expect('exitoso' in result).toBe(false);
    if (!('nombresDeActividad' in result) || !Array.isArray(result.nombresDeActividad)) {
      throw new Error('Expected nombresDeActividad array in result');
    }

    expect(result.nombresDeActividad).toContainEqual({ id_tipo_actividad: '', nombre: '' });
  });

  it('inserts generated sesiones inside createActividadAndSesiones (line ~400)', async () => {
    const client = {
      query: jest.fn(),
      release: jest.fn(),
    };

    connectMock.mockResolvedValue(client as any);

    const sessionCalls: Array<{ sql: string }> = [];

    client.query.mockImplementation(async (sql: string, params?: unknown[]) => {
      if (sql === 'BEGIN' || sql === 'COMMIT') {
        return { rows: [] } as any;
      }

      if (sql === actividadQueries.insertActividad) {
        expect(Array.isArray(params)).toBe(true);
        return {
          rows: [
            {
              id_actividad: 'act1',
              fecha_actividad: '2024-01-02',
            },
          ],
        } as any;
      }

      if (sql === actividadQueries.insertSesion) {
        sessionCalls.push({ sql });
        return { rows: [] } as any;
      }

      return { rows: [] } as any;
    });

    const actividad = {
      id_actividad: 'act1',
      id_programa: 'prog',
      id_tipo_actividad: 'tipo',
      id_responsable: 'resp',
      id_aliado: 'aliado',
      id_sede: 'sede',
      id_frecuencia: 'freq',
      institucional: 'N',
      nombre_actividad: 'Nombre',
      descripcion: 'Desc',
      fecha_actividad: '2024-01-02',
      hora_inicio: '08:00:00',
      hora_fin: '09:00:00',
      plazo_asistencia: 1,
      estado: 'A',
      id_creado_por: 'user1',
      fecha_creacion: '2024-01-01',
      id_modificado_por: 'user1',
      fecha_modificacion: '2024-01-01',
      frecuencia: 'Diario',
    } as any;

    const result = await dataSource.createActividadAndSesiones(actividad);

    expect(sessionCalls.length).toBeGreaterThan(0);
    expect(client.query).toHaveBeenCalledWith('BEGIN');
    expect(client.query).toHaveBeenCalledWith('COMMIT');
    expect(result).toHaveProperty('id_actividad', 'act1');
    expect(client.release).toHaveBeenCalledTimes(1);
  });

  it('skips session insertion when insertActividad returns no rows', async () => {
    const client = {
      query: jest.fn(),
      release: jest.fn(),
    };

    connectMock.mockResolvedValue(client as any);

    client.query.mockImplementation(async (sql: string, params?: unknown[]) => {
      if (sql === 'BEGIN' || sql === 'COMMIT') {
        return { rows: [] } as any;
      }

      if (sql === actividadQueries.insertActividad) {
        return { rows: [] } as any;
      }

      if (sql === actividadQueries.insertSesion) {
        throw new Error('insertSesion should not be called');
      }

      throw new Error(`Unexpected SQL: ${sql}`);
    });

    const actividad = {
      id_programa: 'prog',
      id_tipo_actividad: 'tipo',
      id_responsable: 'resp',
      id_aliado: 'aliado',
      id_sede: 'sede',
      id_frecuencia: 'freq',
      institucional: 'N',
      nombre_actividad: 'Nombre',
      descripcion: 'Desc',
      fecha_actividad: '2024-02-01',
      hora_inicio: '08:00:00',
      hora_fin: '09:00:00',
      plazo_asistencia: 1,
      estado: 'A',
      id_creado_por: 'user1',
      fecha_creacion: '2024-01-01',
      id_modificado_por: 'user1',
      fecha_modificacion: '2024-01-01',
    } as any;

    const result = await dataSource.createActividadAndSesiones(actividad);

    expect(result).toBeUndefined();
    expect(client.query).toHaveBeenCalledWith('BEGIN');
    expect(client.query).toHaveBeenCalledWith('COMMIT');
    expect(client.release).toHaveBeenCalledTimes(1);
  });

  it('uses default values when actividad is missing horario and frecuencia details', async () => {
    const client = {
      query: jest.fn(),
      release: jest.fn(),
    };

    connectMock.mockResolvedValue(client as any);

    const insertSesionCalls: Array<unknown[] | undefined> = [];

    client.query.mockImplementation(async (sql: string, params?: unknown[]) => {
      if (sql === 'BEGIN' || sql === 'COMMIT') {
        return { rows: [] } as any;
      }

      if (sql === actividadQueries.insertActividad) {
        return {
          rows: [
            {
              id_actividad: 'ACT-2',
              fecha_actividad: '2024-03-10',
            },
          ],
        } as any;
      }

      if (sql === actividadQueries.insertSesion) {
        insertSesionCalls.push(params as unknown[]);
        return { rows: [] } as any;
      }

      throw new Error(`Unexpected SQL: ${sql}`);
    });

    const generarStub = jest
      .spyOn<any, any>(dataSource as any, 'generarSesiones')
      .mockImplementation(
        (
          actividadId: string,
          fechaActividad: Date,
          frecuencia: string,
          idCreadoPor: string,
          horaInicio: string,
          horaFin: string,
        ) => {
          expect(frecuencia).toBe('');
          expect(idCreadoPor).toBe('');
          expect(horaInicio).toBe('09:00:00');
          expect(horaFin).toBe('12:00:00');

          return [
            {
              id_sesion: 'SES-2',
              id_actividad: actividadId,
              fecha_actividad: fechaActividad,
              hora_inicio: undefined as any,
              hora_fin: undefined as any,
              id_creado_por: idCreadoPor,
            },
          ];
        },
      );

    const actividad = {
      id_programa: 'prog',
      id_tipo_actividad: 'tipo',
      id_responsable: 'resp',
      id_aliado: 'aliado',
      id_sede: 'sede',
      id_frecuencia: 'freq',
      institucional: 'N',
      nombre_actividad: 'Nombre',
      descripcion: 'Desc',
      fecha_actividad: '2024-03-10',
      plazo_asistencia: 1,
      estado: 'A',
      fecha_creacion: '2024-03-01',
      fecha_modificacion: '2024-03-01',
    } as any;

    const result = await dataSource.createActividadAndSesiones(actividad);

    expect(result).toHaveProperty('id_actividad', 'ACT-2');
    expect(generarStub).toHaveBeenCalledTimes(1);
    expect(insertSesionCalls).toHaveLength(1);
    const params = insertSesionCalls[0] ?? [];
    expect(params[3]).toBe('09:00:00');
    expect(params[4]).toBe('12:00:00');
    expect(client.query).toHaveBeenCalledWith('COMMIT');
    generarStub.mockRestore();
  });

  it('advances dates correctly for frecuencia Mensual (line ~599)', () => {
    const sesiones = (dataSource as any).generarSesiones(
      'act1',
      new Date(2024, 0, 15),
      'Mensual',
      'user1',
      '08:00:00',
      '09:00:00',
    );

    expect(Array.isArray(sesiones)).toBe(true);
    expect(sesiones.length).toBeGreaterThanOrEqual(1);
    expect(sesiones[0].fecha_actividad instanceof Date).toBe(true);
  });

  it('genera una única sesión cuando no se define la frecuencia', () => {
    const sesiones = (dataSource as any).generarSesiones(
      'act1',
      new Date(2024, 0, 5),
      '',
      'user1',
      '07:00:00',
      '08:00:00',
    );

    expect(sesiones).toHaveLength(1);
    expect(sesiones[0]).toMatchObject({
      id_actividad: 'act1',
      hora_inicio: '07:00:00',
      hora_fin: '08:00:00',
      id_creado_por: 'user1',
    });
  });

  it('advances dates correctly for frecuencia Diario', () => {
    const sesiones = (dataSource as any).generarSesiones(
      'act1',
      new Date(2024, 0, 1),
      'Diario',
      'user1',
      '08:00:00',
      '09:00:00',
    );

    expect(sesiones.length).toBeGreaterThan(1);
    const first = sesiones[0].fecha_actividad.getDate();
    const second = sesiones[1].fecha_actividad.getDate();
    expect(second - first).toBe(1);
  });

  it('advances dates correctly for frecuencia Semanal', () => {
    const sesiones = (dataSource as any).generarSesiones(
      'act1',
      new Date(2024, 0, 1),
      'Semanal',
      'user1',
      '08:00:00',
      '09:00:00',
    );

    expect(sesiones.length).toBeGreaterThan(1);
    const firstDate = sesiones[0].fecha_actividad;
    const secondDate = sesiones[1].fecha_actividad;
    const diff = (secondDate.getTime() - firstDate.getTime()) / (1000 * 60 * 60 * 24);
    expect(diff).toBe(7);
  });

  it('retorna arreglo vacío cuando la frecuencia no es soportada', () => {
    const sesiones = (dataSource as any).generarSesiones(
      'act1',
      new Date(2024, 0, 1),
      'Anual',
      'user1',
      '08:00:00',
      '09:00:00',
    );

    expect(sesiones).toEqual([]);
  });
});
