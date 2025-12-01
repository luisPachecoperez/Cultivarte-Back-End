import { SedeRepositoryImpl } from '../sede-repository-impl';
import { SedeDataSource } from '../../../domain/datasources/sede-datasource';
import { Sede } from '../../../domain/entities/sede';
import { RespuestaGrap } from '../../../domain/entities/respuesta';

describe('SedeRepositoryImpl', () => {
  let dataSource: jest.Mocked<SedeDataSource>;
  let repo: SedeRepositoryImpl;

  beforeEach(() => {
    dataSource = {
      getAll: jest.fn(),
      getById: jest.fn(),
      create: jest.fn(),
      updateById: jest.fn(),
      deleteById: jest.fn(),
    } as any;
    repo = new SedeRepositoryImpl(dataSource);
  });

  const sede: Sede = { id: '1', nombre: 'Test' } as any;
  const respuestaOk: RespuestaGrap = { exitoso: 'S', mensaje: 'ok' };

  it('getAll - retorna arreglo de sedes', async () => {
    dataSource.getAll.mockResolvedValue([sede]);
    const res = await repo.getAll();
    expect(res).toEqual([sede]);
    expect(dataSource.getAll).toHaveBeenCalled();
  });

  it('getAll - retorna respuesta error', async () => {
    dataSource.getAll.mockResolvedValue(respuestaOk);
    const res = await repo.getAll();
    expect(res).toBe(respuestaOk);
    expect(dataSource.getAll).toHaveBeenCalled();
  });

  it('getById - retorna sede', async () => {
    dataSource.getById.mockResolvedValue(sede);
    const res = await repo.getById('1');
    expect(res).toBe(sede);
    expect(dataSource.getById).toHaveBeenCalledWith('1');
  });

  it('getById - retorna respuesta error', async () => {
    dataSource.getById.mockResolvedValue(respuestaOk);
    const res = await repo.getById('1');
    expect(res).toBe(respuestaOk);
    expect(dataSource.getById).toHaveBeenCalledWith('1');
  });

  it('create - retorna respuesta ok', async () => {
    dataSource.create.mockResolvedValue(respuestaOk);
    const res = await repo.create(sede);
    expect(res).toBe(respuestaOk);
    expect(dataSource.create).toHaveBeenCalledWith(sede);
  });

  it('updateById - retorna respuesta ok', async () => {
    dataSource.updateById.mockResolvedValue(respuestaOk);
    const res = await repo.updateById('1', sede);
    expect(res).toBe(respuestaOk);
    expect(dataSource.updateById).toHaveBeenCalledWith('1', sede);
  });

  it('deleteById - retorna respuesta ok', async () => {
    dataSource.deleteById.mockResolvedValue(respuestaOk);
    const res = await repo.deleteById('1');
    expect(res).toBe(respuestaOk);
    expect(dataSource.deleteById).toHaveBeenCalledWith('1');
  });
});