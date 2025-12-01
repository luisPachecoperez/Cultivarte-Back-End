import { CalendarioFechaRepositoryImpl } from '../calendario-fecha-repository-impl';

describe('CalendarioFechaRepositoryImpl', () => {
  let repo: CalendarioFechaRepositoryImpl;
  let mockDataSource: any;

  beforeEach(() => {
    mockDataSource = {
      getByDate: jest.fn().mockResolvedValue('result'),
    };
    repo = new CalendarioFechaRepositoryImpl(mockDataSource);
  });

  it('getByDate retorna resultado del datasource', async () => {
    const input = { fecha: '2023-01-01' };
    const result = await repo.getByDate(input as any);
    expect(result).toBe('result');
    expect(mockDataSource.getByDate).toHaveBeenCalledWith(input);
  });
});