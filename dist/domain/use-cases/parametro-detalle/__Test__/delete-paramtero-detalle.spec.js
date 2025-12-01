"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const delete_paramtero_detalle_1 = require("../delete-paramtero-detalle");
describe('DeleteParametroDetalleUseCaseImpl', () => {
    let repo;
    let useCase;
    beforeEach(() => {
        repo = { deleteById: jest.fn() };
        useCase = new delete_paramtero_detalle_1.DeleteParametroDetalleUseCaseImpl(repo);
    });
    it('should return success from repository', async () => {
        const respuesta = { exitoso: 'S', mensaje: 'Eliminado' };
        repo.deleteById.mockResolvedValue(respuesta);
        const result = await useCase.execute('1');
        expect(result).toEqual(respuesta);
    });
    it('should return error from repository', async () => {
        const error = { exitoso: 'N', mensaje: 'Error' };
        repo.deleteById.mockResolvedValue(error);
        const result = await useCase.execute('1');
        expect(result).toEqual(error);
    });
});
//# sourceMappingURL=delete-paramtero-detalle.spec.js.map