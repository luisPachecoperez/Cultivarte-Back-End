import { ParametriaEventosDataSourceImpl } from '../parametria-eventos-impl';
import { pgPool } from '../../db/pool';

jest.mock('../../db/pool', () => ({
  pgPool: {
    query: jest.fn(),
  },
}));

describe('ParametriaEventosDataSourceImpl homologation', () => {
  let dataSource: ParametriaEventosDataSourceImpl;
  const warnSpy = jest.spyOn(console, 'warn').mockImplementation(() => {});

  beforeEach(() => {
    dataSource = new ParametriaEventosDataSourceImpl();
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
    expect(getErrorText(42)).toBe('42');
    expect(getErrorText(true)).toBe('true');
    expect(getErrorText(undefined)).toBe('undefined');
    expect(getErrorText({ foo: 'bar' })).toBe('{"foo":"bar"}');
    expect(getErrorText(circular)).toContain('[Circular');
  });

  it('prioriza mensaje homologado desde client', async () => {
    const client = {
      query: jest.fn().mockResolvedValue({ rows: [{ mensaje: 'Desde client' }] }),
    };

    const message = await (dataSource as any).resolveHomologatedMessage(
      'Original',
      client,
    );

    expect(message).toBe('Desde client');
    expect(client.query).toHaveBeenCalledTimes(1);
    expect(pgPool.query).not.toHaveBeenCalled();
  });

  it('consulta el pool cuando client no retorna mensaje util', async () => {
    const client = {
      query: jest.fn().mockResolvedValue({ rows: [{ mensaje: '   ' }] }),
    };
    (pgPool.query as jest.Mock).mockResolvedValue({
      rows: [{ mensaje: 'Desde pool' }],
    });

    const message = await (dataSource as any).resolveHomologatedMessage(
      'Original',
      client,
    );

    expect(message).toBe('Desde pool');
    expect(client.query).toHaveBeenCalledTimes(1);
    expect(pgPool.query).toHaveBeenCalledTimes(1);
  });

  it('retorna texto original cuando no hay parametrizacion y pool falla', async () => {
    const client = {
      query: jest.fn().mockResolvedValue({ rows: [] }),
    };
    (pgPool.query as jest.Mock).mockRejectedValue(new Error('Pool error'));

    const message = await (dataSource as any).resolveHomologatedMessage(
      'Sin homologacion',
      client,
    );

    expect(message).toBe('Sin homologacion');
    expect(client.query).toHaveBeenCalledTimes(1);
    expect(pgPool.query).toHaveBeenCalledTimes(1);
  });

  it('sale temprano cuando el texto esta vacio', async () => {
    const message = await (dataSource as any).resolveHomologatedMessage('');

    expect(message).toBe('');
    expect(pgPool.query).not.toHaveBeenCalled();
  });

  it('buildErrorMessage aplica prefijo y mensaje homologado', async () => {
    (pgPool.query as jest.Mock).mockResolvedValue({
      rows: [{ mensaje: 'Homologado' }],
    });

    const result = await (dataSource as any).buildErrorMessage(
      'Prefijo: ',
      new Error('Error original'),
    );

    expect(result).toBe('Prefijo: Homologado');
    expect(pgPool.query).toHaveBeenCalledTimes(1);
  });
});
