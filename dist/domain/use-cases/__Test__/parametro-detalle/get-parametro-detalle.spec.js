"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const get_parametro_detalle_1 = require("../../parametro-detalle/get-parametro-detalle");
describe('GetParametroDetalleUseCaseImpl', () => {
    const parametroDetalleRepository = {
        getById: jest.fn(),
        getAll: jest.fn(),
        create: jest.fn(),
        updateById: jest.fn(),
        deleteById: jest.fn(),
    };
    const useCase = new get_parametro_detalle_1.GetParametroDetalleUseCaseImpl(parametroDetalleRepository);
    const mockParametroDetalle = {
        id_parametro_detalle: '1',
        nombre: 'Test',
    };
    const mockRespuesta = { exitoso: 'N', mensaje: 'Error' };
    beforeEach(() => {
        jest.clearAllMocks();
    });
    it('retorna ParametroDetalle correctamente', async () => {
        parametroDetalleRepository.getById.mockResolvedValueOnce(mockParametroDetalle);
        const result = await useCase.execute('1');
        expect(parametroDetalleRepository.getById).toHaveBeenCalledWith('1');
        expect(result).toBe(mockParametroDetalle);
    });
    it('retorna respuesta de error', async () => {
        parametroDetalleRepository.getById.mockResolvedValueOnce(mockRespuesta);
        const result = await useCase.execute('2');
        expect(result).toBe(mockRespuesta);
    });
    it('propaga errores si ocurren', async () => {
        parametroDetalleRepository.getById.mockRejectedValueOnce(new Error('DB error'));
        await expect(useCase.execute('3')).rejects.toThrow('DB error');
    });
});
//# sourceMappingURL=get-parametro-detalle.spec.js.map