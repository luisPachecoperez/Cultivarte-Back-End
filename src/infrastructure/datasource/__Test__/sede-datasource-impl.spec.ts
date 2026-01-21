import { SedeDataSourceImpl } from '../sede-datasource-impl';
import { pgPool } from '../../db/pool';

type PgQueryMock = jest.Mock;

jest.mock('../../db/pool', () => ({
  pgPool: {
    query: jest.fn(),
  },
}));

describe('SedeDataSourceImpl', () => {
  let dataSource: SedeDataSourceImpl;
  const warnSpy = jest.spyOn(console, 'warn').mockImplementation(() => {});
  const queryMock = pgPool.query as PgQueryMock;

  beforeEach(() => {
    dataSource = new SedeDataSourceImpl();
    jest.clearAllMocks();
  });

  afterAll(() => {
    warnSpy.mockRestore();
  });

  it('getAll retorna lista correctamente', async () => {
    queryMock.mockResolvedValue({ rows: [{ id_sede: '1' }] });
    const result = await dataSource.getAll();
    expect(Array.isArray(result)).toBe(true);
    expect(result[0]).toHaveProperty('id_sede', '1');
  });

  it('getAll retorna error si ocurre excepción', async () => {
    queryMock
      .mockRejectedValueOnce(new Error('DB error'))
      .mockResolvedValueOnce({ rows: [] });
    const result = await dataSource.getAll();
    if (!Array.isArray(result)) {
      expect(result.exitoso).toBe('N');
      expect(result.mensaje).toBe('Error al obtener sedes: DB error');
    } else {
      throw new Error('Expected error response, but got array');
    }
  });

  it('getById retorna sede correctamente', async () => {
    queryMock.mockResolvedValue({ rowCount: 1, rows: [{ id_sede: '1' }] });
    const result = await dataSource.getById('1');
    expect(result).toHaveProperty('id_sede', '1');
  });

  it('getById retorna error si rowCount es 0', async () => {
    queryMock.mockResolvedValue({ rowCount: 0, rows: [] });
    const result = await dataSource.getById('1');
    if ('exitoso' in result) {
      expect(result.exitoso).toBe('N');
      expect(result.mensaje).toMatch(/No se encontró la sede/);
    } else {
      throw new Error('Expected error response, but got Sede');
    }
  });

  it('getById retorna error si ocurre excepción', async () => {
    queryMock
      .mockRejectedValueOnce(new Error('DB error'))
      .mockResolvedValueOnce({ rows: [] });
    const result = await dataSource.getById('1');
    if ('exitoso' in result) {
      expect(result.exitoso).toBe('N');
      expect(result.mensaje).toBe('Error al obtener la sede: DB error');
    } else {
      throw new Error('Expected error response, but got Sede');
    }
  });

  it('create retorna éxito correctamente', async () => {
    queryMock.mockResolvedValue({});
    const sede = { id_sede: '1', nombre: 'Sede' };
    const result = await dataSource.create(sede as any);
    expect(result.exitoso).toBe('S');
    expect(result.mensaje).toMatch(/creada exitosamente/);
  });

  it('create retorna error si ocurre excepción', async () => {
    queryMock
      .mockRejectedValueOnce(new Error('DB error'))
      .mockResolvedValueOnce({ rows: [] });
    const sede = { id_sede: '1', nombre: 'Sede' };
    const result = await dataSource.create(sede as any);
    expect(result.exitoso).toBe('N');
    expect(result.mensaje).toBe('Error al crear la sede: DB error');
  });

  it('updateById retorna éxito correctamente', async () => {
    queryMock.mockResolvedValue({});
    const sede = { id_sede: '1', nombre: 'Sede' };
    const result = await dataSource.updateById('1', sede as any);
    expect(result.exitoso).toBe('S');
    expect(result.mensaje).toMatch(/actualizada exitosamente/);
  });

  it('updateById retorna error si ocurre excepción', async () => {
    queryMock
      .mockRejectedValueOnce(new Error('DB error'))
      .mockResolvedValueOnce({ rows: [] });
    const sede = { id_sede: '1', nombre: 'Sede' };
    const result = await dataSource.updateById('1', sede as any);
    expect(result.exitoso).toBe('N');
    expect(result.mensaje).toBe('Error al actualizar la sede: DB error');
  });

  it('deleteById retorna éxito correctamente', async () => {
    queryMock.mockResolvedValue({});
    const result = await dataSource.deleteById('1');
    expect(result.exitoso).toBe('S');
    expect(result.mensaje).toMatch(/eliminada exitosamente/);
  });

  it('deleteById retorna error si ocurre excepción', async () => {
    queryMock
      .mockRejectedValueOnce(new Error('DB error'))
      .mockResolvedValueOnce({ rows: [] });
    const result = await dataSource.deleteById('1');
    expect(result.exitoso).toBe('N');
    expect(result.mensaje).toBe('Error al eliminar la sede: DB error');
  });

  it('getAll retorna array vacío si no hay sedes', async () => {
    queryMock.mockResolvedValue({ rows: [] });
    const result = await dataSource.getAll();
    expect(Array.isArray(result)).toBe(true);
    if (Array.isArray(result)) {
      expect(result.length).toBe(0);
    } else {
      throw new Error('Expected result to be an array');
    }
  });

  it('getById retorna sede vacía si rows contiene objeto vacío', async () => {
    queryMock.mockResolvedValue({ rowCount: 1, rows: [{}] });
    const result = await dataSource.getById('1');
    expect(result).toEqual({});
  });

  it('getAll retorna error si ocurre excepción no Error', async () => {
    queryMock
      .mockRejectedValueOnce({ custom: 'fail' })
      .mockResolvedValueOnce({ rows: [] });
    const result = await dataSource.getAll();
    if (!Array.isArray(result)) {
      expect(result.exitoso).toBe('N');
      expect(result.mensaje).toMatch(/Error al obtener sedes:/);
      expect(result.mensaje).toMatch(/custom/);
    } else {
      throw new Error('Expected error response, but got array');
    }
  });

  it('getById retorna error si ocurre excepción no Error', async () => {
    queryMock
      .mockRejectedValueOnce({ custom: 'fail' })
      .mockResolvedValueOnce({ rows: [] });
    const result = await dataSource.getById('1');
    if ('exitoso' in result) {
      expect(result.exitoso).toBe('N');
      expect(result.mensaje).toMatch(/Error al obtener la sede:/);
      expect(result.mensaje).toMatch(/custom/);
    } else {
      throw new Error('Expected error response, but got Sede');
    }
  });

  it('create retorna error si ocurre excepción no Error', async () => {
    queryMock
      .mockRejectedValueOnce({ custom: 'fail' })
      .mockResolvedValueOnce({ rows: [] });
    const sede = { id_sede: '1', nombre: 'Sede' };
    const result = await dataSource.create(sede as any);
    expect(result.exitoso).toBe('N');
    expect(result.mensaje).toMatch(/Error al crear la sede:/);
    expect(result.mensaje).toMatch(/custom/);
  });

  it('updateById retorna error si ocurre excepción no Error', async () => {
    queryMock
      .mockRejectedValueOnce({ custom: 'fail' })
      .mockResolvedValueOnce({ rows: [] });
    const sede = { id_sede: '1', nombre: 'Sede' };
    const result = await dataSource.updateById('1', sede as any);
    expect(result.exitoso).toBe('N');
    expect(result.mensaje).toMatch(/Error al actualizar la sede:/);
    expect(result.mensaje).toMatch(/custom/);
  });

  it('deleteById retorna error si ocurre excepción no Error', async () => {
    queryMock
      .mockRejectedValueOnce({ custom: 'fail' })
      .mockResolvedValueOnce({ rows: [] });
    const result = await dataSource.deleteById('1');
    expect(result.exitoso).toBe('N');
    expect(result.mensaje).toMatch(/Error al eliminar la sede:/);
    expect(result.mensaje).toMatch(/custom/);
  });
});