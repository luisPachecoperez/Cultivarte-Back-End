import { ParametroDetalleDataSourceImpl } from '../parametro-detalle-datasource-impl';
import { pgPool } from '../../db/pool';

jest.mock('../../db/pool', () => ({
  pgPool: {
    query: jest.fn(),
  },
}));

describe('ParametroDetalleDataSourceImpl homologation', () => {
  let dataSource: ParametroDetalleDataSourceImpl;
  const warnSpy = jest.spyOn(console, 'warn').mockImplementation(() => {});

  beforeEach(() => {
    dataSource = new ParametroDetalleDataSourceImpl();
    jest.clearAllMocks();
  });

  afterAll(() => {
    warnSpy.mockRestore();
  });

  it('normaliza valores en getErrorText', () => {
    const circular: any = {};
    circular.self = circular;

    const getErrorText = (dataSource as any).getErrorText.bind(dataSource);

    expect(getErrorText(new Error('boom'))).toBe('boom');
    expect(getErrorText('texto')).toBe('texto');
    expect(getErrorText(7)).toBe('7');
    expect(getErrorText(false)).toBe('false');
    expect(getErrorText(undefined)).toBe('undefined');
    expect(getErrorText({ foo: 'bar' })).toBe('{"foo":"bar"}');
    expect(getErrorText(circular)).toContain('[Circular');
  });

  it('prioriza mensaje homologado usando client', async () => {
    const client = {
      query: jest.fn().mockResolvedValue({ rows: [{ mensaje: 'Desde client' }] }),
    };

    const result = await (dataSource as any).resolveHomologatedMessage(
      'Original',
      client,
    );

    expect(result).toBe('Desde client');
    expect(client.query).toHaveBeenCalledTimes(1);
    expect(pgPool.query).not.toHaveBeenCalled();
  });

  it('consulta el pool cuando client no provee mensaje', async () => {
    const client = {
      query: jest.fn().mockResolvedValue({ rows: [{ mensaje: '   ' }] }),
    };
    (pgPool.query as jest.Mock).mockResolvedValue({
      rows: [{ mensaje: 'Desde pool' }],
    });

    const result = await (dataSource as any).resolveHomologatedMessage(
      'Original',
      client,
    );

    expect(result).toBe('Desde pool');
    expect(client.query).toHaveBeenCalledTimes(1);
    expect(pgPool.query).toHaveBeenCalledTimes(1);
  });

  it('retorna texto original cuando no hay mensaje y el pool falla', async () => {
    const client = {
      query: jest.fn().mockResolvedValue({ rows: [] }),
    };
    (pgPool.query as jest.Mock).mockRejectedValue(new Error('Pool error'));

    const result = await (dataSource as any).resolveHomologatedMessage(
      'Sin homologacion',
      client,
    );

    expect(result).toBe('Sin homologacion');
    expect(client.query).toHaveBeenCalledTimes(1);
    expect(pgPool.query).toHaveBeenCalledTimes(1);
  });

  it('devuelve texto vacío sin consultar cuando errorText está vacío', async () => {
    const result = await (dataSource as any).resolveHomologatedMessage('');

    expect(result).toBe('');
    expect(pgPool.query).not.toHaveBeenCalled();
  });

  it('buildErrorMessage aplica prefijo y mensaje homologado', async () => {
    (pgPool.query as jest.Mock).mockResolvedValue({
      rows: [{ mensaje: 'Homologado' }],
    });

    const result = await (dataSource as any).buildErrorMessage(
      'Prefijo: ',
      new Error('Original'),
    );

    expect(result).toBe('Prefijo: Homologado');
    expect(pgPool.query).toHaveBeenCalledTimes(1);
  });
});
