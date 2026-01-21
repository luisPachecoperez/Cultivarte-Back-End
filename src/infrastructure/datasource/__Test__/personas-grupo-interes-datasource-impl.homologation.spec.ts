import { PersonasGrupoInteresDataSourceImpl } from '../personas-grupo-interes-datasource-impl';
import { pgPool } from '../../db/pool';

type PgQueryMock = jest.Mock;

jest.mock('../../db/pool', () => ({
  pgPool: {
    query: jest.fn(),
  },
}));

describe('PersonasGrupoInteresDataSourceImpl homologation', () => {
  let dataSource: PersonasGrupoInteresDataSourceImpl;
  const warnSpy = jest.spyOn(console, 'warn').mockImplementation(() => {});
  const queryMock = pgPool.query as PgQueryMock;

  beforeEach(() => {
    dataSource = new PersonasGrupoInteresDataSourceImpl();
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
    expect(getErrorText(123)).toBe('123');
    expect(getErrorText(true)).toBe('true');
    expect(getErrorText(undefined)).toBe('undefined');
    expect(getErrorText({ foo: 'bar' })).toBe('{"foo":"bar"}');
    expect(getErrorText(circular)).toContain('[Circular');
  });

  it('prioriza mensaje obtenido con client', async () => {
    const client = {
      query: jest.fn().mockResolvedValue({ rows: [{ mensaje: 'Desde client' }] }),
    };

    const result = await (dataSource as any).resolveHomologatedMessage(
      'Original',
      client,
    );

    expect(result).toBe('Desde client');
    expect(client.query).toHaveBeenCalledTimes(1);
    expect(queryMock).not.toHaveBeenCalled();
  });

  it('consulta el pool cuando client no retorna mensaje útil', async () => {
    const client = {
      query: jest.fn().mockResolvedValue({ rows: [{ mensaje: '   ' }] }),
    };
    queryMock.mockResolvedValue({ rows: [{ mensaje: 'Desde pool' }] });

    const result = await (dataSource as any).resolveHomologatedMessage(
      'Original',
      client,
    );

    expect(result).toBe('Desde pool');
    expect(client.query).toHaveBeenCalledTimes(1);
    expect(queryMock).toHaveBeenCalledTimes(1);
  });

  it('retorna texto original cuando no hay parametrización y el pool falla', async () => {
    const client = {
      query: jest.fn().mockResolvedValue({ rows: [] }),
    };
    queryMock.mockRejectedValue(new Error('Pool error'));

    const result = await (dataSource as any).resolveHomologatedMessage(
      'Sin homologacion',
      client,
    );

    expect(result).toBe('Sin homologacion');
    expect(client.query).toHaveBeenCalledTimes(1);
    expect(queryMock).toHaveBeenCalledTimes(1);
  });

  it('regresa texto vacío sin consultar cuando no hay errorText', async () => {
    const result = await (dataSource as any).resolveHomologatedMessage('');

    expect(result).toBe('');
    expect(queryMock).not.toHaveBeenCalled();
  });

  it('buildErrorMessage aplica prefijo y mensaje homologado', async () => {
    queryMock.mockResolvedValue({ rows: [{ mensaje: 'Homologado' }] });

    const result = await (dataSource as any).buildErrorMessage(
      'Prefijo: ',
      new Error('Original'),
    );

    expect(result).toBe('Prefijo: Homologado');
    expect(queryMock).toHaveBeenCalledTimes(1);
  });

  it('buildErrorMessage usa client cuando se proporciona', async () => {
    const client = {
      query: jest.fn().mockResolvedValue({ rows: [{ mensaje: 'Desde client' }] }),
    };

    const result = await (dataSource as any).buildErrorMessage(
      'Prefijo: ',
      'Original',
      client,
    );

    expect(result).toBe('Prefijo: Desde client');
    expect(client.query).toHaveBeenCalledTimes(1);
    expect(queryMock).not.toHaveBeenCalled();
  });
});
