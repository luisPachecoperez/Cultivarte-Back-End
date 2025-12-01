"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const create_parametro_detalle_1 = require("../create-parametro-detalle");
describe('CreateParametroDetalleUseCaseImpl', () => {
    let repo;
    let useCase;
    beforeEach(() => {
        repo = { create: jest.fn() };
        useCase = new create_parametro_detalle_1.CreateParametroDetalleUseCaseImpl(repo);
    });
    it('should return created detalle from repository', async () => {
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
        repo.create.mockResolvedValue(detalle);
        const result = await useCase.execute(detalle);
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
        repo.create.mockResolvedValue(error);
        const result = await useCase.execute(detalle);
        expect(result).toEqual(error);
    });
});
//# sourceMappingURL=create-parametro-detalle.spec.js.map