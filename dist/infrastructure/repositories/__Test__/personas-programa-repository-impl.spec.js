"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const personas_programa_repository_impl_1 = require("../personas-programa-repository-impl");
describe('PersonasProgramaRepositoryImpl', () => {
    let repo;
    let mockDataSource;
    beforeEach(() => {
        mockDataSource = {
            getById: jest.fn().mockResolvedValue('byId'),
            getAll: jest.fn().mockResolvedValue('all'),
            create: jest.fn().mockResolvedValue('created'),
            updateById: jest.fn().mockResolvedValue('updated'),
            deleteById: jest.fn().mockResolvedValue('deleted'),
        };
        repo = new personas_programa_repository_impl_1.PersonasProgramaRepositoryImpl(mockDataSource);
    });
    it('getById retorna resultado del datasource', async () => {
        const result = await repo.getById('id1');
        expect(result).toBe('byId');
        expect(mockDataSource.getById).toHaveBeenCalledWith('id1');
    });
    it('getAll retorna resultado del datasource', async () => {
        const result = await repo.getAll();
        expect(result).toBe('all');
        expect(mockDataSource.getAll).toHaveBeenCalled();
    });
    it('create retorna resultado del datasource', async () => {
        const programa = { id_persona_programa: 'id1' };
        const result = await repo.create(programa);
        expect(result).toBe('created');
        expect(mockDataSource.create).toHaveBeenCalledWith(programa);
    });
    it('updateById retorna resultado del datasource', async () => {
        const programa = { id_persona_programa: 'id1' };
        const result = await repo.updateById('id1', programa);
        expect(result).toBe('updated');
        expect(mockDataSource.updateById).toHaveBeenCalledWith('id1', programa);
    });
    it('deleteById retorna resultado del datasource', async () => {
        const result = await repo.deleteById('id1');
        expect(result).toBe('deleted');
        expect(mockDataSource.deleteById).toHaveBeenCalledWith('id1');
    });
});
//# sourceMappingURL=personas-programa-repository-impl.spec.js.map