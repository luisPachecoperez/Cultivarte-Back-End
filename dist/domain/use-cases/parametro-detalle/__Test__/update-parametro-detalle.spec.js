"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const update_parametro_detalle_1 = require("../update-parametro-detalle");
describe('UpdateParametroDetalleUseCaseImpl', () => {
    let repo;
    let useCase;
    beforeEach(() => {
        repo = { updateById: jest.fn() };
        useCase = new update_parametro_detalle_1.UpdateParametroDetalleUseCaseImpl(repo);
    });
    it('should return updated detalle from repository', async () => {
        const detalle = {
            id_parametro_detalle: '1',
            id_parametro_general: '2',
            nombre: 'detalle',
            codigo: 'A',
            orden: 1,
            valores: 'val',
            estado: 'activo',
            id_creado_por: 'user',
            fecha_creacion: '2023-01-01',
            id_modificado_por: 'user2',
            fecha_modificacion: '2023-01-02',
        };
        repo.updateById.mockResolvedValue(detalle);
        const result = await useCase.execute('1', detalle);
        expect(result).toEqual(detalle);
    });
    it('should return error from repository', async () => {
        const error = { exitoso: 'N', mensaje: 'Error' };
        const detalle = {
            id_parametro_detalle: '1',
            id_parametro_general: '2',
            nombre: 'detalle',
            codigo: 'A',
            orden: 1,
            valores: 'val',
            estado: 'activo',
            id_creado_por: 'user',
            fecha_creacion: '2023-01-01',
            id_modificado_por: 'user2',
            fecha_modificacion: '2023-01-02',
        };
        repo.updateById.mockResolvedValue(error);
        const result = await useCase.execute('1', detalle);
        expect(result).toEqual(error);
    });
});
//# sourceMappingURL=update-parametro-detalle.spec.js.map