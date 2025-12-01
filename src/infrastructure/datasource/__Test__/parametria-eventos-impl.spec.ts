import { ParametriaEventosDataSourceImpl } from '../parametria-eventos-impl';
import { pgPool } from '../../db/pool';

jest.mock('../../db/pg-pool', () => ({
  pgPool: {
    query: jest.fn(),
  },
}));

describe('ParametriaEventosDataSourceImpl', () => {
  let dataSource: ParametriaEventosDataSourceImpl;

  beforeEach(() => {
    dataSource = new ParametriaEventosDataSourceImpl();
    jest.clearAllMocks();
  });

  it('getAll retorna lista correctamente', async () => {
    (pgPool.query as jest.Mock).mockResolvedValue({
      rows: [
        { grupo: 'Roles', id: '1', nombre: 'Admin' },
        { grupo: 'Aliados', id: '2', nombre: 'AliadoX' },
      ],
    });
    const result = await dataSource.getAll();
    expect(Array.isArray(result)).toBe(true);
    expect(result[0]).toHaveProperty('grupo', 'Roles');
    expect(result[1]).toHaveProperty('grupo', 'Aliados');
  });

  it('getAll retorna array vacío si no hay resultados', async () => {
    (pgPool.query as jest.Mock).mockResolvedValue({ rows: [] });
    const result = await dataSource.getAll();
    expect(Array.isArray(result)).toBe(true);
    expect(result.length).toBe(0);
  });

  it('getAll lanza error si ocurre excepción', async () => {
    (pgPool.query as jest.Mock).mockRejectedValue(new Error('DB error'));
    await expect(dataSource.getAll()).rejects.toThrow('DB error');
  });
});