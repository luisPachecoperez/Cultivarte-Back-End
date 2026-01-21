import { PersonasSedesRepositoryImpl } from '../personas-sedes-repository-impl';

describe('PersonasSedesRepositoryImpl', () => {
  let repo: PersonasSedesRepositoryImpl;
  let mockDataSource: any;

  beforeEach(() => {
    mockDataSource = {
      getAll: jest.fn().mockResolvedValue('all'),
      getById: jest.fn().mockResolvedValue('byId'),
      create: jest.fn().mockResolvedValue('created'),
      updateById: jest.fn().mockResolvedValue('updated'),
      deleteById: jest.fn().mockResolvedValue('deleted'),
    };
    repo = new PersonasSedesRepositoryImpl(mockDataSource);
  });

  it('getAll retorna resultado del datasource', async () => {
    const result = await repo.getAll(1,100);
    expect(result).toBe('all');
    expect(mockDataSource.getAll).toHaveBeenCalled();
  });

  it('getById retorna resultado del datasource', async () => {
    const result = await repo.getById('id1');
    expect(result).toBe('byId');
    expect(mockDataSource.getById).toHaveBeenCalledWith('id1');
  });

  it('create retorna resultado del datasource', async () => {
    const sede = { id_sede: 'id1' };
    const result = await repo.create(sede as any);
    expect(result).toBe('created');
    expect(mockDataSource.create).toHaveBeenCalledWith(sede);
  });

  it('updateById retorna resultado del datasource', async () => {
    const sede = { id_sede: 'id1' };
    const result = await repo.updateById('id1', sede as any);
    expect(result).toBe('updated');
    expect(mockDataSource.updateById).toHaveBeenCalledWith('id1', sede);
  });

  it('deleteById retorna resultado del datasource', async () => {
    const result = await repo.deleteById('id1');
    expect(result).toBe('deleted');
    expect(mockDataSource.deleteById).toHaveBeenCalledWith('id1');
  });
});