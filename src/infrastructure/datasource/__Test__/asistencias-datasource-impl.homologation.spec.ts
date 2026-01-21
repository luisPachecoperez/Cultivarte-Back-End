import { AsistenciaDataSourceImpl } from '../asistencias-datasource-impl';
import { pgPool } from '../../db/pool';
import { asistenciasQueries } from '../../db/asistencia-queries';
import { sesionesQueries } from '../../db/sesiones-queries';

jest.mock('../../db/pool', () => ({
  pgPool: {
    query: jest.fn(),
  },
}));

describe('AsistenciaDataSourceImpl error homologation', () => {
  let dataSource: AsistenciaDataSourceImpl;

  beforeEach(() => {
    dataSource = new AsistenciaDataSourceImpl();
    jest.clearAllMocks();
  });

  it('retorna mensaje homologado cuando getAll falla y existe parametrización', async () => {
    (pgPool.query as jest.Mock)
      .mockRejectedValueOnce(new Error('DB error'))
      .mockResolvedValueOnce({ rows: [{ mensaje: 'Error homologado' }] });

    const result = await dataSource.getAll();

    if ('exitoso' in result) {
      expect(result.exitoso).toBe('N');
      expect(result.mensaje).toBe(
        'No se pudo obtener actividades por sedes: Error homologado',
      );
    } else {
      throw new Error('Expected error response');
    }
  });

  it('retorna mensaje homologado cuando getPreAsistencia falla y existe parametrización', async () => {
    (pgPool.query as jest.Mock)
      .mockRejectedValueOnce(new Error('DB error general'))
      .mockResolvedValueOnce({ rows: [{ mensaje: 'Error homologado' }] });

    const result = await dataSource.getPreAsistencia('sesion-1');

    if ('exitoso' in result) {
      expect(result.exitoso).toBe('N');
      expect(result.mensaje).toBe(
        'No se pudo obtener la pre-asistencia: Error homologado',
      );
    } else {
      throw new Error('Expected error response');
    }
  });

  it('normaliza diferentes tipos de error en getErrorText', () => {
    const circular: Record<string, unknown> = {};
    circular.self = circular;

    const errorTextString = (dataSource as any).getErrorText('cadena');
    const errorTextNumber = (dataSource as any).getErrorText(123);
    const errorTextUndefined = (dataSource as any).getErrorText(undefined);
    const errorTextCircular = (dataSource as any).getErrorText(circular);

    expect(errorTextString).toBe('cadena');
    expect(errorTextNumber).toBe('123');
    expect(errorTextUndefined).toBe('undefined');
    expect(errorTextCircular).toContain('Circular');
  });

  it('usa mensaje homologado del client cuando está disponible', async () => {
    const client = {
      query: jest.fn().mockResolvedValue({ rows: [{ mensaje: 'Desde client' }] }),
    };

    const mensaje = await (dataSource as any).resolveHomologatedMessage(
      'Original',
      client,
    );

    expect(client.query).toHaveBeenCalled();
    expect(mensaje).toBe('Desde client');
    expect((pgPool.query as jest.Mock)).not.toHaveBeenCalled();
  });

  it('recupera mensaje homologado desde pool cuando el client falla', async () => {
    const client = {
      query: jest.fn().mockRejectedValue(new Error('Client fail')),
    };
    (pgPool.query as jest.Mock).mockResolvedValueOnce({
      rows: [{ mensaje: 'Desde pool' }],
    });

    const mensaje = await (dataSource as any).resolveHomologatedMessage(
      'Original',
      client,
    );

    expect(client.query).toHaveBeenCalled();
    expect(pgPool.query).toHaveBeenCalled();
    expect(mensaje).toBe('Desde pool');
  });

  it('retorna error original cuando no hay homologación y no consulta si el texto es vacío', async () => {
    const clientNoConsulta = { query: jest.fn() };
    const mensajeVacio = await (dataSource as any).resolveHomologatedMessage(
      '',
      clientNoConsulta,
    );

    expect(mensajeVacio).toBe('');
    expect(clientNoConsulta.query).not.toHaveBeenCalled();
    expect(pgPool.query).not.toHaveBeenCalled();

    const clientSinHomologacion = {
      query: jest.fn().mockResolvedValue({ rows: [] }),
    };
    (pgPool.query as jest.Mock).mockResolvedValue({ rows: [] });

    const mensajeSinHomologacion = await (dataSource as any).resolveHomologatedMessage(
      'Sin mapa',
      clientSinHomologacion,
    );
    expect(clientSinHomologacion.query).toHaveBeenCalled();
    expect(pgPool.query).toHaveBeenCalled();
    expect(mensajeSinHomologacion).toBe('Sin mapa');
  });

  it('getPreAsistencia maneja errores en consultas paralelas y homologa el mensaje', async () => {
    const queryMock = pgPool.query as jest.Mock;
    queryMock
      .mockResolvedValueOnce({
        rows: [
          {
            id_sesion: 'sesion-1',
            id_actividad: 'actividad-1',
            nro_asistentes: 2,
            descripcion: 'desc',
            imagen: 'img',
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
      .mockResolvedValueOnce({ rows: [] })
      .mockResolvedValueOnce({ rows: [] })
      .mockRejectedValueOnce(new Error('fallo sedes'))
      .mockResolvedValueOnce({ rows: [{ mensaje: 'Parametrizado' }] });

    const consoleErrorSpy = jest
      .spyOn(console, 'error')
      .mockImplementation(() => {});

    const result = await dataSource.getPreAsistencia('sesion-1');

    try {
      expect('exitoso' in result).toBe(true);
      if ('exitoso' in result) {
        expect(result.exitoso).toBe('N');
        expect(result.mensaje).toBe(
          'Error al obtener datos de pre-asistencia: Parametrizado',
        );
      }
      const expectedCalls = [
        [sesionesQueries.getById, ['sesion-1']],
        [asistenciasQueries.actividadResult, ['actividad-1']],
      ];
      expect(queryMock.mock.calls[0]).toEqual(expectedCalls[0]);
      expect(queryMock.mock.calls[1]).toEqual(expectedCalls[1]);
      expect(consoleErrorSpy).toHaveBeenCalledWith(
        'Error en consultas de pre-asistencia:',
        expect.any(Error),
      );
      expect(queryMock).toHaveBeenCalledTimes(6);
    } finally {
      consoleErrorSpy.mockRestore();
    }
  });
});
