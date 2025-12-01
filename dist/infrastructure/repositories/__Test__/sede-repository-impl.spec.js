"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sede_repository_impl_1 = require("../sede-repository-impl");
describe('SedeRepositoryImpl', () => {
    let dataSource;
    let repo;
    beforeEach(() => {
        dataSource = {
            getAll: jest.fn(),
            getById: jest.fn(),
            create: jest.fn(),
            updateById: jest.fn(),
            deleteById: jest.fn(),
        };
        repo = new sede_repository_impl_1.SedeRepositoryImpl(dataSource);
    });
    const sede = { id: '1', nombre: 'Test' };
    const respuestaOk = { exitoso: 'S', mensaje: 'ok' };
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
//# sourceMappingURL=sede-repository-impl.spec.js.map