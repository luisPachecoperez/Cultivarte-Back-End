import { AsistenciaRepositoryImpl } from '../asistencia-respository-impl';

describe('AsistenciaRepositoryImpl', () => {
  let repo: AsistenciaRepositoryImpl;
  let mockDataSource: any;

  beforeEach(() => {
    mockDataSource = {
      getAll: jest.fn().mockResolvedValue('all'),
      getById: jest.fn().mockResolvedValue('byId'),
      getAsistenciasSede: jest.fn().mockResolvedValue('sede'),
      createAsistencia: jest.fn().mockResolvedValue('created'),
      updateAsistencias: jest.fn().mockResolvedValue('updated'),
      updateById: jest.fn().mockResolvedValue('updatedById'),
      deleteById: jest.fn().mockResolvedValue('deleted'),
      getPreAsistencia: jest.fn().mockResolvedValue('preAsistencia'),
    };
    repo = new AsistenciaRepositoryImpl(mockDataSource);
  });

  it('getAll retorna resultado del datasourcesss', async () => {
    const result = await repo.getAll();
    expect(result).toBe('all');
    expect(mockDataSource.getAll).toHaveBeenCalled();
  });

  it('getById retorna resultado del datasources', async () => {
    const result = await repo.getById('a1');
    expect(result).toBe('byId');
    expect(mockDataSource.getById).toHaveBeenCalledWith('a1');
  });

  it('getAsistenciasSede retorna resultado del datasource', async () => {
    const result = await repo.getAsistenciasSede('u1', '2023-01-01', '2023-01-31');
    expect(result).toBe('sede');
    expect(mockDataSource.getAsistenciasSede).toHaveBeenCalledWith('u1', '2023-01-01', '2023-01-31');
  });

  it('createAsistencia retorna resultado del datasource', async () => {
    const asistencia = { id_asistencia: 'a1' };
    const result = await repo.createAsistencia(asistencia as any);
    expect(result).toBe('created');
    expect(mockDataSource.createAsistencia).toHaveBeenCalledWith(asistencia);
  });

  it('updateAsistencias retorna resultado del datasource', async () => {
    const asistenciaSesiones = { nuevos: [] };
    const result = await repo.updateAsistencias(asistenciaSesiones as any);
    expect(result).toBe('updated');
    expect(mockDataSource.updateAsistencias).toHaveBeenCalledWith(asistenciaSesiones);
  });

  it('updateById retorna resultado del datasource', async () => {
    const asistencia = { id_asistencia: 'a1' };
    const result = await repo.updateById('a1', asistencia as any);
    expect(result).toBe('updatedById');
    expect(mockDataSource.updateById).toHaveBeenCalledWith('a1', asistencia);
  });

  it('deleteById retorna resultado del datasource', async () => {
    const result = await repo.deleteById('a1');
    expect(result).toBe('deleted');
    expect(mockDataSource.deleteById).toHaveBeenCalledWith('a1');
  });

  it('getPreAsistencia retorna resultado del datasource', async () => {
    const result = await repo.getPreAsistencia('s1');
    expect(result).toBe('preAsistencia');
    expect(mockDataSource.getPreAsistencia).toHaveBeenCalledWith('s1');
  });
});