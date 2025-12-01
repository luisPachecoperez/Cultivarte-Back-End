import { SedesController } from '../sedes-controller';
import {
  GetSedesUseCase,
  GetSedeUseCase,
  UpdateSedeUseCase,
  DeleteSedeUseCase,
  CreateSedeUseCase,
  RespuestaGrap,
  Sede,
} from '../../../domain';

describe('SedesController', () => {
  const getSedesUseCase = { execute: jest.fn() };
  const getSedeUseCase = { execute: jest.fn() };
  const createSedeUseCase = { execute: jest.fn() };
  const updateSedeUseCase = { execute: jest.fn() };
  const deleteSedeUseCase = { execute: jest.fn() };

  const controller = new SedesController(
    getSedesUseCase as GetSedesUseCase,
    getSedeUseCase as GetSedeUseCase,
    createSedeUseCase as CreateSedeUseCase,
    updateSedeUseCase as UpdateSedeUseCase,
    deleteSedeUseCase as DeleteSedeUseCase,
  );

  const mockSede: Sede = { id: '1', nombre: 'TestSede' } as unknown as Sede;
  const mockRespuesta: RespuestaGrap = { exitoso: 'N', mensaje: 'error' };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('getAll - success', async () => {
    getSedesUseCase.execute.mockResolvedValueOnce([mockSede]);
    await expect(controller.getAll()).resolves.toEqual([mockSede]);
    expect(getSedesUseCase.execute).toHaveBeenCalled();
  });

  it('getAll - error', async () => {
    getSedesUseCase.execute.mockResolvedValueOnce(mockRespuesta);
    await expect(controller.getAll()).resolves.toBe(mockRespuesta);
  });

  it('getById - success', async () => {
    getSedeUseCase.execute.mockResolvedValueOnce(mockSede);
    await expect(controller.getById('1')).resolves.toBe(mockSede);
    expect(getSedeUseCase.execute).toHaveBeenCalledWith('1');
  });

  it('getById - error', async () => {
    getSedeUseCase.execute.mockResolvedValueOnce(mockRespuesta);
    await expect(controller.getById('1')).resolves.toBe(mockRespuesta);
  });

  it('create - success', async () => {
    createSedeUseCase.execute.mockResolvedValueOnce(mockSede);
    await expect(controller.create(mockSede)).resolves.toBe(mockSede);
    expect(createSedeUseCase.execute).toHaveBeenCalledWith(mockSede);
  });

  it('create - error', async () => {
    createSedeUseCase.execute.mockResolvedValueOnce(mockRespuesta);
    await expect(controller.create(mockSede)).resolves.toBe(mockRespuesta);
  });

  it('update - success', async () => {
    updateSedeUseCase.execute.mockResolvedValueOnce(mockSede);
    await expect(controller.update('1', mockSede)).resolves.toBe(mockSede);
    expect(updateSedeUseCase.execute).toHaveBeenCalledWith('1', mockSede);
  });

  it('update - error', async () => {
    updateSedeUseCase.execute.mockResolvedValueOnce(mockRespuesta);
    await expect(controller.update('1', mockSede)).resolves.toBe(mockRespuesta);
  });

  it('delete - success', async () => {
    deleteSedeUseCase.execute.mockResolvedValueOnce(mockRespuesta);
    await expect(controller.delete('1')).resolves.toBe(mockRespuesta);
    expect(deleteSedeUseCase.execute).toHaveBeenCalledWith('1');
  });
});
