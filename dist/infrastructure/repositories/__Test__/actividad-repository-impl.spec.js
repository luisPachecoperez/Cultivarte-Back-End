"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const actividad_repository_impl_1 = require("../actividad-repository-impl");
describe('ActividadRepositoryImpl', () => {
    let repo;
    let mockDataSource;
    beforeEach(() => {
        mockDataSource = {
            getPreCreateActividad: jest.fn(),
            getPreEditActividad: jest.fn(),
            getActividadSedes: jest.fn(),
            getAll: jest.fn(),
            getById: jest.fn(),
            createActividadAndSesiones: jest.fn(),
            createActividad: jest.fn(),
            updateById: jest.fn(),
            deleteById: jest.fn(),
        };
        repo = new actividad_repository_impl_1.ActividadRepositoryImpl(mockDataSource);
    });
    it('getPreCreateActividad retorna resultado del datasource', async () => {
        mockDataSource.getPreCreateActividad.mockResolvedValue('ok');
        const result = await repo.getPreCreateActividad('u1');
        expect(result).toBe('ok');
    });
    it('getPreCreateActividad retorna error si ocurre excepción', async () => {
        mockDataSource.getPreCreateActividad.mockImplementation(() => { throw new Error('fail'); });
        const result = await repo.getPreCreateActividad('u1');
        expect(result).toEqual({
            exitoso: 'N',
            mensaje: expect.stringContaining('Error al obtener pre-create actividad: fail'),
        });
    });
    it('getPreCreateActividad retorna error si ocurre excepción no Error', async () => {
        mockDataSource.getPreCreateActividad.mockImplementation(() => { throw 'fail-string'; });
        const result = await repo.getPreCreateActividad('u1');
        expect(result).toEqual({
            exitoso: 'N',
            mensaje: expect.stringContaining('Error al obtener pre-create actividad: "fail-string"'),
        });
    });
    it('getPreEditActividad retorna resultado del datasource', async () => {
        mockDataSource.getPreEditActividad.mockResolvedValue('ok');
        const result = await repo.getPreEditActividad('a1', 'u1');
        expect(result).toBe('ok');
    });
    it('getPreEditActividad retorna error si ocurre excepción', async () => {
        mockDataSource.getPreEditActividad.mockImplementation(() => { throw new Error('fail'); });
        const result = await repo.getPreEditActividad('a1', 'u1');
        expect(result).toEqual({
            exitoso: 'N',
            mensaje: expect.stringContaining('Error al obtener pre-edit actividad: fail'),
        });
    });
    it('getPreEditActividad retorna error si ocurre excepción no Error', async () => {
        mockDataSource.getPreEditActividad.mockImplementation(() => { throw { custom: 'fail' }; });
        const result = await repo.getPreEditActividad('a1', 'u1');
        expect(result).toEqual({
            exitoso: 'N',
            mensaje: expect.stringContaining('Error al obtener pre-edit actividad: {"custom":"fail"}'),
        });
    });
    it('getActividadSedes retorna resultado del datasource', async () => {
        mockDataSource.getActividadSedes.mockResolvedValue('ok');
        const result = await repo.getActividadSedes('u1', '2023-01-01', '2023-01-31');
        expect(result).toBe('ok');
    });
    it('getActividadSedes retorna error si ocurre excepción', async () => {
        mockDataSource.getActividadSedes.mockImplementation(() => { throw new Error('fail'); });
        const result = await repo.getActividadSedes('u1', '2023-01-01', '2023-01-31');
        expect(result).toEqual({
            exitoso: 'N',
            mensaje: expect.stringContaining('Error al obtener actividades por sedes: fail'),
        });
    });
    it('getActividadSedes retorna error si ocurre excepción no Error', async () => {
        mockDataSource.getActividadSedes.mockImplementation(() => { throw 123; });
        const result = await repo.getActividadSedes('u1', '2023-01-01', '2023-01-31');
        expect(result).toEqual({
            exitoso: 'N',
            mensaje: expect.stringContaining('Error al obtener actividades por sedes: 123'),
        });
    });
    it('getAll retorna resultado del datasource', async () => {
        mockDataSource.getAll.mockResolvedValue('ok');
        const result = await repo.getAll(10, 0);
        expect(result).toBe('ok');
    });
    it('getAll retorna error si ocurre excepción', async () => {
        mockDataSource.getAll.mockImplementation(() => { throw new Error('fail'); });
        const result = await repo.getAll(10, 0);
        expect(result).toEqual({
            exitoso: 'N',
            mensaje: expect.stringContaining('Error al obtener actividades: fail'),
        });
    });
    it('getAll retorna error si ocurre excepción no Error', async () => {
        mockDataSource.getAll.mockImplementation(() => { throw false; });
        const result = await repo.getAll(10, 0);
        expect(result).toEqual({
            exitoso: 'N',
            mensaje: expect.stringContaining('Error al obtener actividades: false'),
        });
    });
    it('getById retorna resultado del datasource', async () => {
        mockDataSource.getById.mockResolvedValue('ok');
        const result = await repo.getById('a1');
        expect(result).toBe('ok');
    });
    it('getById retorna error si ocurre excepción', async () => {
        mockDataSource.getById.mockImplementation(() => { throw new Error('fail'); });
        const result = await repo.getById('a1');
        expect(result).toEqual({
            exitoso: 'N',
            mensaje: expect.stringContaining('Error al obtener actividad por id: fail'),
        });
    });
    it('getById retorna error si ocurre excepción no Error', async () => {
        mockDataSource.getById.mockImplementation(() => { throw null; });
        const result = await repo.getById('a1');
        expect(result).toEqual({
            exitoso: 'N',
            mensaje: expect.stringContaining('Error al obtener actividad por id: null'),
        });
    });
    it('createActividadAndSesiones retorna resultado del datasource', async () => {
        mockDataSource.createActividadAndSesiones.mockResolvedValue('ok');
        const result = await repo.createActividadAndSesiones({});
        expect(result).toBe('ok');
    });
    it('createActividadAndSesiones retorna error si ocurre excepción', async () => {
        mockDataSource.createActividadAndSesiones.mockImplementation(() => { throw new Error('fail'); });
        const result = await repo.createActividadAndSesiones({});
        expect(result).toEqual({
            exitoso: 'N',
            mensaje: expect.stringContaining('Error al crear actividad y sesiones: fail'),
        });
    });
    it('createActividadAndSesiones retorna error si ocurre excepción no Error', async () => {
        mockDataSource.createActividadAndSesiones.mockImplementation(() => { throw [1, 2, 3]; });
        const result = await repo.createActividadAndSesiones({});
        expect(result).toEqual({
            exitoso: 'N',
            mensaje: expect.stringContaining('Error al crear actividad y sesiones: [1,2,3]'),
        });
    });
    it('createActividad retorna resultado del datasource', async () => {
        mockDataSource.createActividad.mockResolvedValue('ok');
        const result = await repo.createActividad({});
        expect(result).toBe('ok');
    });
    it('createActividad retorna error si ocurre excepción', async () => {
        mockDataSource.createActividad.mockImplementation(() => { throw new Error('fail'); });
        const result = await repo.createActividad({});
        expect(result).toEqual({
            exitoso: 'N',
            mensaje: expect.stringContaining('Error al crear actividad: fail'),
        });
    });
    it('createActividad retorna error si ocurre excepción no Error', async () => {
        mockDataSource.createActividad.mockImplementation(() => { throw undefined; });
        const result = await repo.createActividad({});
        expect(result).toEqual({
            exitoso: 'N',
            mensaje: expect.stringContaining('Error al crear actividad: undefined'),
        });
    });
    it('updateById retorna resultado del datasource', async () => {
        mockDataSource.updateById.mockResolvedValue('ok');
        const result = await repo.updateById('a1', {});
        expect(result).toBe('ok');
    });
    it('updateById retorna error si ocurre excepción', async () => {
        mockDataSource.updateById.mockImplementation(() => { throw new Error('fail'); });
        const result = await repo.updateById('a1', {});
        expect(result).toEqual({
            exitoso: 'N',
            mensaje: expect.stringContaining('Error al actualizar actividad: fail'),
        });
    });
    it('updateById retorna error si ocurre excepción no Error', async () => {
        mockDataSource.updateById.mockImplementation(() => { throw { msg: 'fail' }; });
        const result = await repo.updateById('a1', {});
        expect(result).toEqual({
            exitoso: 'N',
            mensaje: expect.stringContaining('Error al actualizar actividad: {"msg":"fail"}'),
        });
    });
    it('deleteById retorna resultado del datasource', async () => {
        mockDataSource.deleteById.mockResolvedValue('ok');
        const result = await repo.deleteById('a1');
        expect(result).toBe('ok');
    });
    it('deleteById retorna error si ocurre excepción', async () => {
        mockDataSource.deleteById.mockImplementation(() => { throw new Error('fail'); });
        const result = await repo.deleteById('a1');
        expect(result).toEqual({
            exitoso: 'N',
            mensaje: expect.stringContaining('Error al eliminar actividad: fail'),
        });
    });
    it('deleteById retorna error si ocurre excepción no Error', async () => {
        mockDataSource.deleteById.mockImplementation(() => { throw { error: 'fail' }; });
        const result = await repo.deleteById('a1');
        expect(result).toEqual({
            exitoso: 'N',
            mensaje: expect.stringContaining('Error al eliminar actividad: {"error":"fail"}'),
        });
    });
});
//# sourceMappingURL=actividad-repository-impl.spec.js.map