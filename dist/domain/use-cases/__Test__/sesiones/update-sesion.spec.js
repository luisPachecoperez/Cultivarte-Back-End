"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const update_sesion_1 = require("../../sesiones/update-sesion");
describe('UpdateSesionUseCaseImpl', () => {
    const sesionRepository = {
        updateById: jest.fn(),
    };
    const useCase = new update_sesion_1.UpdateSesionUseCaseImpl(sesionRepository);
    const mockSesion = { id: '1', nombre: 'Sesion Test' };
    const mockRespuesta = { exitoso: 'S', mensaje: 'Actualizado' };
    beforeEach(() => {
        jest.clearAllMocks();
    });
    it('llama updateById con los argumentos correctos', async () => {
        sesionRepository.updateById.mockResolvedValueOnce(mockRespuesta);
        await useCase.execute('1', mockSesion);
        expect(sesionRepository.updateById).toHaveBeenCalledWith('1', mockSesion);
    });
    it('retorna la respuesta del repositorio', async () => {
        sesionRepository.updateById.mockResolvedValueOnce(mockRespuesta);
        const result = await useCase.execute('2', mockSesion);
        expect(result).toBe(mockRespuesta);
    });
    it('propaga errores si ocurren', async () => {
        sesionRepository.updateById.mockRejectedValueOnce(new Error('DB error'));
        await expect(useCase.execute('3', mockSesion)).rejects.toThrow('DB error');
    });
});
//# sourceMappingURL=update-sesion.spec.js.map