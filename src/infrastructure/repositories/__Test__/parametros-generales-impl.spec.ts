import { ParametrosGeneralesRepositoryImpl } from '../parametros-generales-impl';

describe('ParametrosGeneralesRepositoryImpl', () => {
  let repo: ParametrosGeneralesRepositoryImpl;
  let mockDataSource: any;

  beforeEach(() => {
    mockDataSource = {
      getAll: jest.fn().mockResolvedValue('all'),
      getById: jest.fn().mockResolvedValue('byId'),
      create: jest.fn().mockResolvedValue('created'),
      updateById: jest.fn().mockResolvedValue('updated'),
      deleteById: jest.fn().mockResolvedValue('deleted'),
    };
    repo = new ParametrosGeneralesRepositoryImpl(mockDataSource);
  });

  it('getAll retorna resultado del datasource', async () => {
    const result = await repo.getAll();
    expect(result).toBe('all');
    expect(mockDataSource.getAll).toHaveBeenCalled();
  });

  it('getById retorna resultado del datasource', async () => {
    const result = await repo.getById('id1');
    expect(result).toBe('byId');
    expect(mockDataSource.getById).toHaveBeenCalledWith('id1');
  });

  it('create retorna resultado del datasource', async () => {
    const data = { id_parametro_general: 'id1' };
    const result = await repo.create(data as any);
    expect(result).toBe('created');
    expect(mockDataSource.create).toHaveBeenCalledWith(data);
  });

  it('updateById retorna resultado del datasource', async () => {
    const data = { id_parametro_general: 'id1' };
    const result = await repo.updateById('id1', data as any);
    expect(result).toBe('updated');
    expect(mockDataSource.updateById).toHaveBeenCalledWith('id1', data);
  });

  it('deleteById retorna resultado del datasource', async () => {
    const result = await repo.deleteById('id1');
    expect(result).toBe('deleted');
    expect(mockDataSource.deleteById).toHaveBeenCalledWith('id1');
  });
});