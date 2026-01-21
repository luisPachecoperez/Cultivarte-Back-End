import { PersonasProgramaRepositoryImpl } from '../personas-programa-repository-impl';

describe('PersonasProgramaRepositoryImpl', () => {
  let repo: PersonasProgramaRepositoryImpl;
  let mockDataSource: any;

  beforeEach(() => {
    mockDataSource = {
      getById: jest.fn().mockResolvedValue('byId'),
      getAll: jest.fn().mockResolvedValue('all'),
      create: jest.fn().mockResolvedValue('created'),
      updateById: jest.fn().mockResolvedValue('updated'),
      deleteById: jest.fn().mockResolvedValue('deleted'),
    };
    repo = new PersonasProgramaRepositoryImpl(mockDataSource);
  });

  it('getById retorna resultado del datasource', async () => {
    const result = await repo.getById('id1');
    expect(result).toBe('byId');
    expect(mockDataSource.getById).toHaveBeenCalledWith('id1');
  });

  it('getAll retorna resultado del datasource', async () => {
    const result = await repo.getAll(1,100);
    expect(result).toBe('all');
    expect(mockDataSource.getAll).toHaveBeenCalled();
  });

  it('create retorna resultado del datasource', async () => {
    const programa = { id_persona_programa: 'id1' };
    const result = await repo.create(programa as any);
    expect(result).toBe('created');
    expect(mockDataSource.create).toHaveBeenCalledWith(programa);
  });

  it('updateById retorna resultado del datasource', async () => {
    const programa = { id_persona_programa: 'id1' };
    const result = await repo.updateById('id1', programa as any);
    expect(result).toBe('updated');
    expect(mockDataSource.updateById).toHaveBeenCalledWith('id1', programa);
  });

  it('deleteById retorna resultado del datasource', async () => {
    const result = await repo.deleteById('id1');
    expect(result).toBe('deleted');
    expect(mockDataSource.deleteById).toHaveBeenCalledWith('id1');
  });
});