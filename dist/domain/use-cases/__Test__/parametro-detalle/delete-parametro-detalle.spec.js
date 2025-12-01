"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const delete_paramtero_detalle_1 = require("../../parametro-detalle/delete-paramtero-detalle");
describe('DeleteParametroDetalleUseCaseImpl', () => {
    const respuestaGrapMock = { error: false, mensaje: 'Eliminado' };
    let parametroDetalleRepository;
    let useCase;
    beforeEach(() => {
        parametroDetalleRepository = {
            getAll: jest.fn(),
            getById: jest.fn(),
            create: jest.fn(),
            updateById: jest.fn(),
            deleteById: jest.fn(),
        };
        useCase = new delete_paramtero_detalle_1.DeleteParametroDetalleUseCaseImpl(parametroDetalleRepository);
    });
    it('should call repository.deleteById with the correct id', async () => {
        parametroDetalleRepository.deleteById.mockResolvedValue(respuestaGrapMock);
        await useCase.execute('123');
        expect(parametroDetalleRepository.deleteById).toHaveBeenCalledWith('123');
    });
    it('should return RespuestaGrap from repository.deleteById', async () => {
        parametroDetalleRepository.deleteById.mockResolvedValue(respuestaGrapMock);
        const result = await useCase.execute('456');
        expect(result).toBe(respuestaGrapMock);
    });
    it('should propagate errors thrown by repository.deleteById', async () => {
        const error = new Error('DB error');
        parametroDetalleRepository.deleteById.mockRejectedValue(error);
        await expect(useCase.execute('789')).rejects.toThrow(error);
    });
});
//# sourceMappingURL=delete-parametro-detalle.spec.js.map