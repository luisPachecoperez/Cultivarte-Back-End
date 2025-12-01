"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sesiones_repository_impl_1 = require("../sesiones-repository-impl");
describe('SesionesRepositoryImpl', () => {
    let dataSource;
    let repo;
    beforeEach(() => {
        dataSource = {
            getAll: jest.fn(),
            getById: jest.fn(),
            getSesionesSede: jest.fn(),
            createSesion: jest.fn(),
            updateById: jest.fn(),
            deleteById: jest.fn(),
            updateSesiones: jest.fn(),
        };
        repo = new sesiones_repository_impl_1.SesionesRepositoryImpl(dataSource);
    });
    const sesion = { id: '1', nombre: 'Test' };
    const editarSesiones = { id: '1', cambios: [] };
    const respuestaOk = { exitoso: 'S', mensaje: 'ok' };
    it('getAll - retorna arreglo de sesiones', async () => {
        dataSource.getAll.mockResolvedValue([sesion]);
        const res = await repo.getAll(10, 0);
        expect(res).toEqual([sesion]);
        expect(dataSource.getAll).toHaveBeenCalledWith(10, 0);
    });
    it('getAll - retorna respuesta error', async () => {
        dataSource.getAll.mockResolvedValue(respuestaOk);
        const res = await repo.getAll(10, 0);
        expect(res).toBe(respuestaOk);
        expect(dataSource.getAll).toHaveBeenCalledWith(10, 0);
    });
    it('getById - retorna sesion', async () => {
        dataSource.getById.mockResolvedValue(sesion);
        const res = await repo.getById('1');
        expect(res).toBe(sesion);
        expect(dataSource.getById).toHaveBeenCalledWith('1');
    });
    it('getById - retorna respuesta error', async () => {
        dataSource.getById.mockResolvedValue(respuestaOk);
        const res = await repo.getById('1');
        expect(res).toBe(respuestaOk);
        expect(dataSource.getById).toHaveBeenCalledWith('1');
    });
    it('getSesionesSede - retorna arreglo de sesiones', async () => {
        dataSource.getSesionesSede.mockResolvedValue([sesion]);
        const res = await repo.getSesionesSede('user', '2023-01-01', '2023-01-31');
        expect(res).toEqual([sesion]);
        expect(dataSource.getSesionesSede).toHaveBeenCalledWith('user', '2023-01-01', '2023-01-31');
    });
    it('getSesionesSede - retorna respuesta error', async () => {
        dataSource.getSesionesSede.mockResolvedValue(respuestaOk);
        const res = await repo.getSesionesSede('user', '2023-01-01', '2023-01-31');
        expect(res).toBe(respuestaOk);
        expect(dataSource.getSesionesSede).toHaveBeenCalledWith('user', '2023-01-01', '2023-01-31');
    });
    it('createSesion - retorna respuesta ok', async () => {
        dataSource.createSesion.mockResolvedValue(respuestaOk);
        const res = await repo.createSesion(sesion);
        expect(res).toBe(respuestaOk);
        expect(dataSource.createSesion).toHaveBeenCalledWith(sesion);
    });
    it('updateById - retorna respuesta ok', async () => {
        dataSource.updateById.mockResolvedValue(respuestaOk);
        const res = await repo.updateById('1', sesion);
        expect(res).toBe(respuestaOk);
        expect(dataSource.updateById).toHaveBeenCalledWith('1', sesion);
    });
    it('deleteById - retorna respuesta ok', async () => {
        dataSource.deleteById.mockResolvedValue(respuestaOk);
        const res = await repo.deleteById('1');
        expect(res).toBe(respuestaOk);
        expect(dataSource.deleteById).toHaveBeenCalledWith('1');
    });
    it('updateSesiones - retorna respuesta ok', async () => {
        dataSource.updateSesiones.mockResolvedValue(respuestaOk);
        const res = await repo.updateSesiones(editarSesiones);
        expect(res).toBe(respuestaOk);
        expect(dataSource.updateSesiones).toHaveBeenCalledWith(editarSesiones);
    });
});
//# sourceMappingURL=sesiones-repository-impl.spec.js.map