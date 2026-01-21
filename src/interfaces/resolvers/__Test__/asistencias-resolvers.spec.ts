const mockQuery = jest.fn().mockResolvedValue({ rows: [], rowCount: 1 });
const mockConnect = jest.fn();
const mockOn = jest.fn();
const mockEnd = jest.fn();

const mockController = {
  getAsistencias: jest.fn().mockResolvedValue([]),
  getAsistencia: jest.fn().mockResolvedValue({}),
  getPreAsistencia: jest.fn().mockResolvedValue({}),
  getAsistenciasSede: jest.fn().mockResolvedValue([]),
  createAsistencia: jest
    .fn()
    .mockResolvedValue({ exitoso: 'S' as const, mensaje: 'Creado' }),
  updateAsistencia: jest
    .fn()
    .mockResolvedValue({ exitoso: 'S' as const, mensaje: 'Actualizado' }),
  deleteAsistencia: jest
    .fn()
    .mockResolvedValue({ exitoso: 'S' as const, mensaje: 'Eliminado' }),
  updateAsistencias: jest
    .fn()
    .mockResolvedValue({ exitoso: 'S' as const, mensaje: 'Actualizado' }),
};

jest.mock('../../../infrastructure/db/pool', () => ({
  pgPool: {
    query: (...args: unknown[]) => mockQuery(...args),
    connect: (...args: unknown[]) => mockConnect(...args),
    on: (...args: unknown[]) => mockOn(...args),
    end: (...args: unknown[]) => mockEnd(...args),
  },
  initDbPool: jest.fn(),
  closeDbPool: jest.fn(),
}));

jest.mock('../../../interfaces/services/secrets.service', () => ({
  SecretService: jest.fn().mockImplementation(() => ({
    getSecret: jest.fn().mockResolvedValue(undefined),
  })),
}));

jest.mock('../../../aplication/controller/asistencia-controller', () => ({
  AsistenciasController: jest
    .fn()
    .mockImplementation(() => mockController),
}));

import { asistenciasResolvers } from '../asistencias-resolvers';

describe('asistenciasResolvers', () => {
  beforeEach(() => {
    mockQuery.mockClear();
    mockConnect.mockClear();
    mockOn.mockClear();
    mockEnd.mockClear();

    mockController.getAsistencias.mockReset();
    mockController.getAsistencias.mockResolvedValue([]);
    mockController.getAsistencia.mockReset();
    mockController.getAsistencia.mockResolvedValue({});
    mockController.getPreAsistencia.mockReset();
    mockController.getPreAsistencia.mockResolvedValue({});
    mockController.getAsistenciasSede.mockReset();
    mockController.getAsistenciasSede.mockResolvedValue([]);
    mockController.createAsistencia.mockReset();
    mockController.createAsistencia.mockResolvedValue({
      exitoso: 'S',
      mensaje: 'Creado',
    });
    mockController.updateAsistencia.mockReset();
    mockController.updateAsistencia.mockResolvedValue({
      exitoso: 'S',
      mensaje: 'Actualizado',
    });
    mockController.deleteAsistencia.mockReset();
    mockController.deleteAsistencia.mockResolvedValue({
      exitoso: 'S',
      mensaje: 'Eliminado',
    });
    mockController.updateAsistencias.mockReset();
    mockController.updateAsistencias.mockResolvedValue({
      exitoso: 'S',
      mensaje: 'Actualizado',
    });
  });
  const mockAsistencia = {
    id_asistencia: '1',
    id_sesion: 'abc',
    id_persona: 'p1',
    fecha_asistencia: new Date().toISOString(),
    estado: 'A', // o el valor que corresponda según tu modelo
    // agrega aquí otras propiedades requeridas por Asistencia
  };
  it('debe definir los resolvers de Query and Mutation', () => {
    expect(asistenciasResolvers.Query).toBeDefined();
    expect(asistenciasResolvers.Mutation).toBeDefined();
  });

  it('delegates Query resolvers to controller', async () => {
    const args = { id: '123' };

    const asistencias = await asistenciasResolvers.Query.getAsistencias();
    const asistencia = await asistenciasResolvers.Query.getAsistencia({}, args);
    const pre = await asistenciasResolvers.Query.getPreAsistencia({}, { id_sesion: '1' });
    const sede = await asistenciasResolvers.Query.getAsistenciasSede({}, {
      id_usuario: 'u1',
      fecha_inicio: '2023-01-01',
      fecha_fin: '2023-01-31',
    });

    expect(mockController.getAsistencias).toHaveBeenCalledTimes(1);
    expect(mockController.getAsistencia).toHaveBeenCalledWith(args.id);
    expect(mockController.getPreAsistencia).toHaveBeenCalledWith('1');
    expect(mockController.getAsistenciasSede).toHaveBeenCalledWith(
      'u1',
      '2023-01-01',
      '2023-01-31',
    );

    expect(asistencias).toEqual([]);
    expect(asistencia).toEqual({});
    expect(pre).toEqual({});
    expect(sede).toEqual([]);
  });

  it('delegates Mutation resolvers to controller', async () => {
    const createArgs = { data: mockAsistencia };
    const updateArgs = { id: '1', data: mockAsistencia };
    const deleteArgs = { id: '1' };
    const bulkArgs = {
      input: {
        id_sesion: 's1',
        id_actividad: 'a1',
        imagen: 'url-imagen',
        numero_asistentes: 10,
        descripcion: 'Sesión de prueba',
        nuevos: [],
        asistencias: [mockAsistencia],
      },
    };

    const created = await asistenciasResolvers.Mutation.createAsistencia({}, createArgs);
    const updated = await asistenciasResolvers.Mutation.updateAsistencia({}, updateArgs);
    const deleted = await asistenciasResolvers.Mutation.deleteAsistencia({}, deleteArgs);
    const bulk = await asistenciasResolvers.Mutation.updateAsistencias({}, bulkArgs);

    expect(mockController.createAsistencia).toHaveBeenCalledWith(createArgs.data);
    expect(mockController.updateAsistencia).toHaveBeenCalledWith(
      updateArgs.id,
      updateArgs.data,
    );
    expect(mockController.deleteAsistencia).toHaveBeenCalledWith(deleteArgs.id);
    expect(mockController.updateAsistencias).toHaveBeenCalledWith(bulkArgs.input);

    expect(created).toEqual({ exitoso: 'S', mensaje: 'Creado' });
    expect(updated).toEqual({ exitoso: 'S', mensaje: 'Actualizado' });
    expect(deleted).toEqual({ exitoso: 'S', mensaje: 'Eliminado' });
    expect(bulk).toEqual({ exitoso: 'S', mensaje: 'Actualizado' });
  });
});