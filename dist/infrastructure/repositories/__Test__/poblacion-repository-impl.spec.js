"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const poblacion_repository_impl_1 = require("../poblacion-repository-impl");
describe('PoblacionRepositoryImpl', () => {
    let dataSource;
    let repo;
    beforeEach(() => {
        dataSource = {
            createPoblacion: jest.fn(),
            updatePoblacionById: jest.fn(),
            deletePoblacionById: jest.fn(),
            getPoblaciones: jest.fn(),
            getPoblacionById: jest.fn(),
        };
        repo = new poblacion_repository_impl_1.PoblacionRepositoryImpl(dataSource);
    });
    const poblacion = { id: '1', nombre: 'Test' };
    const respuestaOk = { exitoso: 'S', mensaje: 'ok' };
    it('createPoblacion - success', async () => {
        dataSource.createPoblacion.mockResolvedValue(respuestaOk);
        const res = await repo.createPoblacion(poblacion);
        expect(res).toBe(respuestaOk);
        expect(dataSource.createPoblacion).toHaveBeenCalledWith(poblacion);
    });
    it('createPoblacion - error (Error)', async () => {
        dataSource.createPoblacion.mockRejectedValue(new Error('fail'));
        const res = await repo.createPoblacion(poblacion);
        expect(res.exitoso).toBe('N');
        expect(res.mensaje).toContain('No se pudo crear población');
        expect(res.mensaje).toContain('fail');
    });
    it('createPoblacion - error (non-Error)', async () => {
        dataSource.createPoblacion.mockRejectedValue('fail');
        const res = await repo.createPoblacion(poblacion);
        expect(res.exitoso).toBe('N');
        expect(res.mensaje).toContain('No se pudo crear población');
        expect(res.mensaje).toContain('fail');
    });
    it('updatePoblacionById - success', async () => {
        dataSource.updatePoblacionById.mockResolvedValue(respuestaOk);
        const res = await repo.updatePoblacionById('1', poblacion);
        expect(res).toBe(respuestaOk);
        expect(dataSource.updatePoblacionById).toHaveBeenCalledWith('1', poblacion);
    });
    it('updatePoblacionById - error (Error)', async () => {
        dataSource.updatePoblacionById.mockRejectedValue(new Error('fail'));
        const res = await repo.updatePoblacionById('1', poblacion);
        expect(res.exitoso).toBe('N');
        expect(res.mensaje).toContain('No se pudo actualizar población');
        expect(res.mensaje).toContain('fail');
    });
    it('updatePoblacionById - error (non-Error)', async () => {
        dataSource.updatePoblacionById.mockRejectedValue('fail');
        const res = await repo.updatePoblacionById('1', poblacion);
        expect(res.exitoso).toBe('N');
        expect(res.mensaje).toContain('No se pudo actualizar población');
        expect(res.mensaje).toContain('fail');
    });
    it('deletePoblacionById - success', async () => {
        dataSource.deletePoblacionById.mockResolvedValue(respuestaOk);
        const res = await repo.deletePoblacionById('1');
        expect(res).toBe(respuestaOk);
        expect(dataSource.deletePoblacionById).toHaveBeenCalledWith('1');
    });
    it('deletePoblacionById - error (Error)', async () => {
        dataSource.deletePoblacionById.mockRejectedValue(new Error('fail'));
        const res = await repo.deletePoblacionById('1');
        expect(res.exitoso).toBe('N');
        expect(res.mensaje).toContain('No se pudo eliminar población');
        expect(res.mensaje).toContain('fail');
    });
    it('deletePoblacionById - error (non-Error)', async () => {
        dataSource.deletePoblacionById.mockRejectedValue('fail');
        const res = await repo.deletePoblacionById('1');
        expect(res.exitoso).toBe('N');
        expect(res.mensaje).toContain('No se pudo eliminar población');
        expect(res.mensaje).toContain('fail');
    });
    it('getPoblaciones - success', async () => {
        dataSource.getPoblaciones.mockResolvedValue([poblacion]);
        const res = await repo.getPoblaciones();
        expect(res).toEqual([poblacion]);
        expect(dataSource.getPoblaciones).toHaveBeenCalled();
    });
    it('getPoblaciones - error (Error)', async () => {
        dataSource.getPoblaciones.mockRejectedValue(new Error('fail'));
        const res = await repo.getPoblaciones();
        expect(res.exitoso).toBe('N');
        expect(res.mensaje).toContain('No se pudo obtener poblaciones');
        expect(res.mensaje).toContain('fail');
    });
    it('getPoblaciones - error (non-Error)', async () => {
        dataSource.getPoblaciones.mockRejectedValue('fail');
        const res = await repo.getPoblaciones();
        expect(res.exitoso).toBe('N');
        expect(res.mensaje).toContain('No se pudo obtener poblaciones');
        expect(res.mensaje).toContain('fail');
    });
    it('getPoblacionById - success', async () => {
        dataSource.getPoblacionById.mockResolvedValue(poblacion);
        const res = await repo.getPoblacionById('1');
        expect(res).toBe(poblacion);
        expect(dataSource.getPoblacionById).toHaveBeenCalledWith('1');
    });
    it('getPoblacionById - error (Error)', async () => {
        dataSource.getPoblacionById.mockRejectedValue(new Error('fail'));
        const res = await repo.getPoblacionById('1');
        expect(res.exitoso).toBe('N');
        expect(res.mensaje).toContain('No se pudo obtener población por id');
        expect(res.mensaje).toContain('fail');
    });
    it('getPoblacionById - error (non-Error)', async () => {
        dataSource.getPoblacionById.mockRejectedValue('fail');
        const res = await repo.getPoblacionById('1');
        expect(res.exitoso).toBe('N');
        expect(res.mensaje).toContain('No se pudo obtener población por id');
        expect(res.mensaje).toContain('fail');
    });
});
//# sourceMappingURL=poblacion-repository-impl.spec.js.map