"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const get_parametros_detalle_1 = require("../../parametro-detalle/get-parametros-detalle");
describe('GetParametrosDetalleUseCaseImpl', () => {
    const parametroDetalleRepository = {
        getAll: jest.fn(),
        getById: jest.fn(),
        create: jest.fn(),
        updateById: jest.fn(),
        deleteById: jest.fn(),
    };
    const useCase = new get_parametros_detalle_1.GetParametrosDetalleUseCaseImpl(parametroDetalleRepository);
    const mockDetalles = [
        { id_parametro_detalle: '1', nombre: 'Detalle 1' },
        { id_parametro_detalle: '2', nombre: 'Detalle 2' },
    ];
    const mockRespuesta = { exitoso: 'N', mensaje: 'Error' };
    beforeEach(() => {
        jest.clearAllMocks();
    });
    it('retorna array de ParametroDetalle correctamente', async () => {
        parametroDetalleRepository.getAll.mockResolvedValueOnce(mockDetalles);
        const result = await useCase.execute();
        expect(parametroDetalleRepository.getAll).toHaveBeenCalled();
        expect(result).toBe(mockDetalles);
    });
    it('retorna respuesta de error', async () => {
        parametroDetalleRepository.getAll.mockResolvedValueOnce(mockRespuesta);
        const result = await useCase.execute();
        expect(result).toBe(mockRespuesta);
    });
    it('propaga errores si ocurren', async () => {
        parametroDetalleRepository.getAll.mockRejectedValueOnce(new Error('DB error'));
        await expect(useCase.execute()).rejects.toThrow('DB error');
    });
});
//# sourceMappingURL=get-parametros-detalle.spec.js.map