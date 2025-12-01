"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const asistencia_respository_impl_1 = require("../asistencia-respository-impl");
describe('AsistenciaRepositoryImpl', () => {
    let repo;
    let mockDataSource;
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
        repo = new asistencia_respository_impl_1.AsistenciaRepositoryImpl(mockDataSource);
    });
    it('getAll retorna resultado del datasource', async () => {
        const result = await repo.getAll();
        expect(result).toBe('all');
        expect(mockDataSource.getAll).toHaveBeenCalled();
    });
    it('getById retorna resultado del datasource', async () => {
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
        const result = await repo.createAsistencia(asistencia);
        expect(result).toBe('created');
        expect(mockDataSource.createAsistencia).toHaveBeenCalledWith(asistencia);
    });
    it('updateAsistencias retorna resultado del datasource', async () => {
        const asistenciaSesiones = { nuevos: [] };
        const result = await repo.updateAsistencias(asistenciaSesiones);
        expect(result).toBe('updated');
        expect(mockDataSource.updateAsistencias).toHaveBeenCalledWith(asistenciaSesiones);
    });
    it('updateById retorna resultado del datasource', async () => {
        const asistencia = { id_asistencia: 'a1' };
        const result = await repo.updateById('a1', asistencia);
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
//# sourceMappingURL=asistencia-respository-impl.spec.js.map