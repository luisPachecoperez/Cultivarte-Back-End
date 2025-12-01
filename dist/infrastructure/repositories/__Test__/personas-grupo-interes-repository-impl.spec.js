"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const personas_grupo_interes_repository_impl_1 = require("../personas-grupo-interes-repository-impl");
describe('PersonasGrupoInteresRepositoryImpl', () => {
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
        repo = new personas_grupo_interes_repository_impl_1.PersonasGrupoInteresRepositoryImpl(mockDataSource);
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
        const grupo = { id_persona_grupo_interes: 'id1' };
        const result = await repo.create(grupo);
        expect(result).toBe('created');
        expect(mockDataSource.create).toHaveBeenCalledWith(grupo);
    });
    it('updateById retorna resultado del datasource', async () => {
        const grupo = { id_persona_grupo_interes: 'id1' };
        const result = await repo.updateById('id1', grupo);
        expect(result).toBe('updated');
        expect(mockDataSource.updateById).toHaveBeenCalledWith('id1', grupo);
    });
    it('deleteById retorna resultado del datasource', async () => {
        const result = await repo.deleteById('id1');
        expect(result).toBe('deleted');
        expect(mockDataSource.deleteById).toHaveBeenCalledWith('id1');
    });
});
//# sourceMappingURL=personas-grupo-interes-repository-impl.spec.js.map