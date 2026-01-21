import { ParametriaEventosDataSourceImpl } from '../parametria-eventos-impl';
import { pgPool } from '../../db/pool';

jest.mock('../../db/pool', () => ({
  pgPool: {
    query: jest.fn(),
  },
}));

describe('ParametriaEventosDataSourceImpl', () => {
  let dataSource: ParametriaEventosDataSourceImpl;
  const warnSpy = jest.spyOn(console, 'warn').mockImplementation(() => {});

  beforeEach(() => {
    dataSource = new ParametriaEventosDataSourceImpl();
    jest.clearAllMocks();
  });

  afterAll(() => {
    warnSpy.mockRestore();
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

  it('getAll lanza error homologado cuando ocurre excepción', async () => {
    (pgPool.query as jest.Mock)
      .mockRejectedValueOnce(new Error('DB error'))
      .mockResolvedValueOnce({ rows: [{ mensaje: 'Mensaje homologado' }] });

    await expect(dataSource.getAll()).rejects.toThrow(
      'Error al obtener parametria de eventos: Mensaje homologado',
    );
  });

  it('usa mensaje original cuando no existe homologación', async () => {
    (pgPool.query as jest.Mock)
      .mockRejectedValueOnce(new Error('Otro error'))
      .mockResolvedValueOnce({ rows: [] });

    await expect(dataSource.getAll()).rejects.toThrow(
      'Error al obtener parametria de eventos: Otro error',
    );
  });
});