"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const get_parametros_detalle_1 = require("../get-parametros-detalle");
describe('GetParametrosDetalleUseCaseImpl', () => {
    let repo;
    let useCase;
    beforeEach(() => {
        repo = { getAll: jest.fn() };
        useCase = new get_parametros_detalle_1.GetParametrosDetalleUseCaseImpl(repo);
    });
    it('should return result from repository', async () => {
        repo.getAll.mockResolvedValue(['detalle1', 'detalle2']);
        const result = await useCase.execute();
        expect(result).toEqual(['detalle1', 'detalle2']);
    });
    it('should return error from repository', async () => {
        const error = { exitoso: 'N', mensaje: 'Error' };
        repo.getAll.mockResolvedValue(error);
        const result = await useCase.execute();
        expect(result).toEqual(error);
    });
});
//# sourceMappingURL=get-parametros-detalle.spec.js.map