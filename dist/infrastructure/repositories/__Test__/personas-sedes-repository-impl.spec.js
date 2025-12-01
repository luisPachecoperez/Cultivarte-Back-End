"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const personas_sedes_repository_impl_1 = require("../personas-sedes-repository-impl");
describe('PersonasSedesRepositoryImpl', () => {
    let repo;
    let mockDataSource;
    beforeEach(() => {
        mockDataSource = {
            getAll: jest.fn().mockResolvedValue('all'),
            getById: jest.fn().mockResolvedValue('byId'),
            create: jest.fn().mockResolvedValue('created'),
            updateById: jest.fn().mockResolvedValue('updated'),
            deleteById: jest.fn().mockResolvedValue('deleted'),
        };
        repo = new personas_sedes_repository_impl_1.PersonasSedesRepositoryImpl(mockDataSource);
    });
    it('getAll retorna resultado del datasource', async () => {
        const result = await repo.getAll();
        expect(result).toBe('all');
        expect(mockDataSource.getAll).toHaveBeenCalled();
    });
    it('getById retorna resultado del datasource', async () => {
        const result = await repo.getById('id1');
        expect(result).toBe('byId');
        expect(mockDataSource.getById).toHaveBeenCalledWith('id1');
    });
    it('create retorna resultado del datasource', async () => {
        const sede = { id_sede: 'id1' };
        const result = await repo.create(sede);
        expect(result).toBe('created');
        expect(mockDataSource.create).toHaveBeenCalledWith(sede);
    });
    it('updateById retorna resultado del datasource', async () => {
        const sede = { id_sede: 'id1' };
        const result = await repo.updateById('id1', sede);
        expect(result).toBe('updated');
        expect(mockDataSource.updateById).toHaveBeenCalledWith('id1', sede);
    });
    it('deleteById retorna resultado del datasource', async () => {
        const result = await repo.deleteById('id1');
        expect(result).toBe('deleted');
        expect(mockDataSource.deleteById).toHaveBeenCalledWith('id1');
    });
});
//# sourceMappingURL=personas-sedes-repository-impl.spec.js.map