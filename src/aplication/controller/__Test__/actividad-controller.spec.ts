import { ActividadesController } from '../actividades-controller';
import {
  Actividad,
  PreCreateActividad,
  PreEditActividad,
  RespuestaGrap,
  GetPreCreateActividadUseCase,
  GetPreEditActividadUseCase,
  GetActividadesUseCase,
  GetActividadUseCase,
  GetActividadSedesUseCase,
  CreateActividadAndSesionesUseCase,
  CreateActividadUseCase,
  UpdateActividadUseCase,
  DeleteActividadUseCase,
} from '../../../domain';

describe('ActividadesController test', () => {
  // Mocks
  const getPreCreateActividadUseCase = { execute: jest.fn() };
  const getPreEditActividadUseCase = { execute: jest.fn() };
  const getActividadesUseCase = { execute: jest.fn() };
  const getActividadUseCase = { execute: jest.fn() };
  const getActividadSedesUseCase = { execute: jest.fn() };
  const createActividadAndSesionesUseCase = { execute: jest.fn() };
  const createActividadUseCase = { execute: jest.fn() };
  const updateActividadUseCase = { execute: jest.fn() };
  const deleteActividadUseCase = { execute: jest.fn() };

  const controller = new ActividadesController(
    getPreCreateActividadUseCase as GetPreCreateActividadUseCase,
    getPreEditActividadUseCase as GetPreEditActividadUseCase,
    getActividadesUseCase as GetActividadesUseCase,
    getActividadUseCase as GetActividadUseCase,
    getActividadSedesUseCase as GetActividadSedesUseCase,
    createActividadAndSesionesUseCase as CreateActividadAndSesionesUseCase,
    createActividadUseCase as CreateActividadUseCase,
    updateActividadUseCase as UpdateActividadUseCase,
    deleteActividadUseCase as DeleteActividadUseCase,
  );

  const mockActividad: Actividad = {
    id_actividad: '1',
    id_programa: 'programa1',
    id_tipo_actividad: 'tipo1',
    id_responsable: 'responsable1',
    id_aliado: 'aliado1',
    estado: 'A',
    id_sede: 'sede1',
    id_frecuencia: 'frecuencia1',
    institucional: 'N',
    nombre_actividad: 'Actividad Test',
    descripcion: 'Descripción de la actividad de prueba',
  };
  const mockPreCreate: PreCreateActividad = {
    id_programa: 'programa1',
    sedes: [],
    tiposDeActividad: [],
    aliados: [],
    responsables: [],
    nombresDeActividad: [],
    frecuencias: [],
  };
  const mockPreEdit: PreEditActividad = {
    id_programa: 'programa1',
    sedes: [],
    tiposDeActividad: [],
    aliados: [],
    responsables: [],
    nombresDeActividad: [],
    frecuencias: [],
    actividad: {
      id_actividad: '1',
      id_programa: 'programa1',
      id_tipo_actividad: 'tipo1',
      id_responsable: 'responsable1',
      id_aliado: 'aliado1',
      estado: 'A',
      id_sede: 'sede1',
      id_frecuencia: 'frecuencia1',
      institucional: 'N',
      nombre_actividad: 'Actividad Test',
      descripcion: 'Descripción de la actividad de prueba',
    },
    sesiones: [],
  };
  const mockRespuesta: RespuestaGrap = { exitoso: 'N', mensaje: 'error' };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('getPreCreateActividad - success', async () => {
    getPreCreateActividadUseCase.execute.mockResolvedValueOnce(mockPreCreate);
    await expect(controller.getPreCreateActividad('user')).resolves.toBe(
      mockPreCreate,
    );
    expect(getPreCreateActividadUseCase.execute).toHaveBeenCalledWith('user');
  });

  it('getPreCreateActividad - error', async () => {
    getPreCreateActividadUseCase.execute.mockResolvedValueOnce(mockRespuesta);
    await expect(controller.getPreCreateActividad('user')).resolves.toBe(
      mockRespuesta,
    );
  });

  it('getPreEditActividad - success', async () => {
    getPreEditActividadUseCase.execute.mockResolvedValueOnce(mockPreEdit);
    await expect(controller.getPreEditActividad('act', 'user')).resolves.toBe(
      mockPreEdit,
    );
    expect(getPreEditActividadUseCase.execute).toHaveBeenCalledWith(
      'act',
      'user',
    );
  });

  it('getPreEditActividad - error', async () => {
    getPreEditActividadUseCase.execute.mockResolvedValueOnce(mockRespuesta);
    await expect(controller.getPreEditActividad('act', 'user')).resolves.toBe(
      mockRespuesta,
    );
  });

  it('getActividades - success', async () => {
    getActividadesUseCase.execute.mockResolvedValueOnce([mockActividad]);
    await expect(controller.getActividades(10, 0)).resolves.toEqual([
      mockActividad,
    ]);
    expect(getActividadesUseCase.execute).toHaveBeenCalledWith(10, 0);
  });

  it('getActividades - error', async () => {
    getActividadesUseCase.execute.mockResolvedValueOnce(mockRespuesta);
    await expect(controller.getActividades(10, 0)).resolves.toBe(mockRespuesta);
  });

  it('getActividad - success', async () => {
    getActividadUseCase.execute.mockResolvedValueOnce(mockActividad);
    await expect(controller.getActividad('1')).resolves.toBe(mockActividad);
    expect(getActividadUseCase.execute).toHaveBeenCalledWith('1');
  });

  it('getActividad - error', async () => {
    getActividadUseCase.execute.mockResolvedValueOnce(mockRespuesta);
    await expect(controller.getActividad('1')).resolves.toBe(mockRespuesta);
  });

  it('getActividadSedes - success', async () => {
    getActividadSedesUseCase.execute.mockResolvedValueOnce([mockActividad]);
    await expect(
      controller.getActividadSedes('user', '2024-01-01', '2024-01-31'),
    ).resolves.toEqual([mockActividad]);
    expect(getActividadSedesUseCase.execute).toHaveBeenCalledWith(
      'user',
      '2024-01-01',
      '2024-01-31',
    );
  });

  it('getActividadSedes - error', async () => {
    getActividadSedesUseCase.execute.mockResolvedValueOnce(mockRespuesta);
    await expect(
      controller.getActividadSedes('user', '2024-01-01', '2024-01-31'),
    ).resolves.toBe(mockRespuesta);
  });

  it('createActividadAndSesiones - success', async () => {
    createActividadAndSesionesUseCase.execute.mockResolvedValueOnce(
      mockActividad,
    );
    await expect(
      controller.createActividadAndSesiones(mockActividad),
    ).resolves.toBe(mockActividad);
    expect(createActividadAndSesionesUseCase.execute).toHaveBeenCalledWith(
      mockActividad,
    );
  });

  it('createActividadAndSesiones - error', async () => {
    createActividadAndSesionesUseCase.execute.mockResolvedValueOnce(
      mockRespuesta,
    );
    await expect(
      controller.createActividadAndSesiones(mockActividad),
    ).resolves.toBe(mockRespuesta);
  });

  it('createActividad - success', async () => {
    createActividadUseCase.execute.mockResolvedValueOnce(mockActividad);
    await expect(controller.createActividad(mockActividad)).resolves.toBe(
      mockActividad,
    );
    expect(createActividadUseCase.execute).toHaveBeenCalledWith(mockActividad);
  });

  it('createActividad - error', async () => {
    createActividadUseCase.execute.mockResolvedValueOnce(mockRespuesta);
    await expect(controller.createActividad(mockActividad)).resolves.toBe(
      mockRespuesta,
    );
  });

  it('updateActividad - success', async () => {
    updateActividadUseCase.execute.mockResolvedValueOnce(mockActividad);
    await expect(controller.updateActividad('1', mockActividad)).resolves.toBe(
      mockActividad,
    );
    expect(updateActividadUseCase.execute).toHaveBeenCalledWith(
      '1',
      mockActividad,
    );
  });

  it('updateActividad - error', async () => {
    updateActividadUseCase.execute.mockResolvedValueOnce(mockRespuesta);
    await expect(controller.updateActividad('1', mockActividad)).resolves.toBe(
      mockRespuesta,
    );
  });

  it('deleteActividad - success', async () => {
    deleteActividadUseCase.execute.mockResolvedValueOnce(mockRespuesta);
    await expect(controller.deleteActividad('1')).resolves.toBe(mockRespuesta);
    expect(deleteActividadUseCase.execute).toHaveBeenCalledWith('1');
  });
});
