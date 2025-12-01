"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const update_sesiones_1 = require("../../sesiones/update-sesiones");
describe('UpdateSesionesUseCaseImpl', () => {
    const sesionRepository = {
        updateSesiones: jest.fn(),
    };
    const useCase = new update_sesiones_1.UpdateSesionesUseCaseImpl(sesionRepository);
    const mockEditarSesiones = { id: '1', cambios: [] };
    const mockRespuesta = { exitoso: 'S', mensaje: 'Actualizado' };
    beforeEach(() => {
        jest.clearAllMocks();
    });
    it('llama updateSesiones con el argumento correcto', async () => {
        sesionRepository.updateSesiones.mockResolvedValueOnce(mockRespuesta);
        await useCase.execute(mockEditarSesiones);
        expect(sesionRepository.updateSesiones).toHaveBeenCalledWith(mockEditarSesiones);
    });
    it('retorna la respuesta del repositorio', async () => {
        sesionRepository.updateSesiones.mockResolvedValueOnce(mockRespuesta);
        const result = await useCase.execute(mockEditarSesiones);
        expect(result).toBe(mockRespuesta);
    });
    it('propaga errores si ocurren', async () => {
        sesionRepository.updateSesiones.mockRejectedValueOnce(new Error('DB error'));
        await expect(useCase.execute(mockEditarSesiones)).rejects.toThrow('DB error');
    });
});
//# sourceMappingURL=update-sesiones.spec.js.map