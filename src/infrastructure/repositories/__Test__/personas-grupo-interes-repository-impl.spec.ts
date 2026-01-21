import { PersonasGrupoInteresRepositoryImpl } from '../personas-grupo-interes-repository-impl';

describe('PersonasGrupoInteresRepositoryImpl', () => {
  let repo: PersonasGrupoInteresRepositoryImpl;
  let mockDataSource: any;

  beforeEach(() => {
    mockDataSource = {
      getAll: jest.fn().mockResolvedValue('all'),
      getById: jest.fn().mockResolvedValue('byId'),
      create: jest.fn().mockResolvedValue('created'),
      updateById: jest.fn().mockResolvedValue('updated'),
      deleteById: jest.fn().mockResolvedValue('deleted'),
    };
    repo = new PersonasGrupoInteresRepositoryImpl(mockDataSource);
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
    const grupo = { id_persona_grupo_interes: 'id1' };
    const result = await repo.create(grupo as any);
    expect(result).toBe('created');
    expect(mockDataSource.create).toHaveBeenCalledWith(grupo);
  });

  it('updateById retorna resultado del datasource', async () => {
    const grupo = { id_persona_grupo_interes: 'id1' };
    const result = await repo.updateById('id1', grupo as any);
    expect(result).toBe('updated');
    expect(mockDataSource.updateById).toHaveBeenCalledWith('id1', grupo);
  });

  it('deleteById retorna resultado del datasource', async () => {
    const result = await repo.deleteById('id1');
    expect(result).toBe('deleted');
    expect(mockDataSource.deleteById).toHaveBeenCalledWith('id1');
  });
});