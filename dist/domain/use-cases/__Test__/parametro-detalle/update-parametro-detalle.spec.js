"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const update_parametro_detalle_1 = require("../../parametro-detalle/update-parametro-detalle");
describe('UpdateParametroDetalleUseCaseImpl', () => {
    const parametroDetalleMock = { id: 1, nombre: 'Test' };
    const respuestaGrapMock = { error: true, mensaje: 'Error' };
    let parametroDetalleRepository;
    let useCase;
    beforeEach(() => {
        parametroDetalleRepository = {
            updateById: jest.fn(),
            getAll: jest.fn(),
            getById: jest.fn(),
            create: jest.fn(),
            deleteById: jest.fn(),
        };
        useCase = new update_parametro_detalle_1.UpdateParametroDetalleUseCaseImpl(parametroDetalleRepository);
    });
    it('should call updateById with correct arguments', async () => {
        parametroDetalleRepository.updateById.mockResolvedValue(parametroDetalleMock);
        await useCase.execute('123', parametroDetalleMock);
        expect(parametroDetalleRepository.updateById).toHaveBeenCalledWith('123', parametroDetalleMock);
    });
    it('should return ParametroDetalle', async () => {
        parametroDetalleRepository.updateById.mockResolvedValue(parametroDetalleMock);
        const result = await useCase.execute('456', parametroDetalleMock);
        expect(result).toBe(parametroDetalleMock);
    });
    it('should return RespuestaGrap if repository.updateById returns it', async () => {
        parametroDetalleRepository.updateById.mockResolvedValue(respuestaGrapMock);
        const result = await useCase.execute('789', parametroDetalleMock);
        expect(result).toBe(respuestaGrapMock);
    });
    it('should propagate errors thrown by repository.updateById', async () => {
        const error = new Error('DB error');
        parametroDetalleRepository.updateById.mockRejectedValue(error);
        await expect(useCase.execute('999', parametroDetalleMock)).rejects.toThrow(error);
    });
});
//# sourceMappingURL=update-parametro-detalle.spec.js.map