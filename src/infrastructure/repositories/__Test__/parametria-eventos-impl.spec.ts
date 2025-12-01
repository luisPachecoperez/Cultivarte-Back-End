import { ParametriaEventosRepositoryImpl } from '../parametria-eventos-impl';

describe('ParametriaEventosRepositoryImpl', () => {
  let repo: ParametriaEventosRepositoryImpl;
  let mockDataSource: any;

  beforeEach(() => {
    mockDataSource = {
      getAll: jest.fn(),
    };
    repo = new ParametriaEventosRepositoryImpl(mockDataSource);
  });

  it('getAll agrupa correctamente los parámetros por grupo', async () => {
    const rows = [
      { grupo: 'A', id: '1', nombre: 'Uno' },
      { grupo: 'A', id: '2', nombre: 'Dos' },
      { grupo: 'B', id: '3', nombre: 'Tres' },
    ];
    mockDataSource.getAll.mockResolvedValue(rows);
    const result = await repo.getAll();
    expect(result).toEqual({
      A: [
        { id: '1', nombre: 'Uno' },
        { id: '2', nombre: 'Dos' },
      ],
      B: [
        { id: '3', nombre: 'Tres' },
      ],
    });
  });

  it('getAll retorna objeto vacío si no hay filas', async () => {
    mockDataSource.getAll.mockResolvedValue([]);
    const result = await repo.getAll();
    expect(result).toEqual({});
  });
});