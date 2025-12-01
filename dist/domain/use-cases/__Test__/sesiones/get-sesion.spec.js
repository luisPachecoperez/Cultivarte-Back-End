"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const get_sesion_1 = require("../../sesiones/get-sesion");
describe('GetSesionUseCaseImpl', () => {
    const sesionRepository = {
        getById: jest.fn(),
    };
    const useCase = new get_sesion_1.GetSesionUseCaseImpl(sesionRepository);
    const mockSesion = { id: '1', nombre: 'Sesion Test' };
    const mockRespuesta = { exitoso: 'N', mensaje: 'Error' };
    beforeEach(() => {
        jest.clearAllMocks();
    });
    it('llama getById con el id correcto', async () => {
        sesionRepository.getById.mockResolvedValueOnce(mockSesion);
        const result = await useCase.execute('1');
        expect(sesionRepository.getById).toHaveBeenCalledWith('1');
        expect(result).toBe(mockSesion);
    });
    it('retorna Sesion correctamente', async () => {
        sesionRepository.getById.mockResolvedValueOnce(mockSesion);
        const result = await useCase.execute('2');
        expect(result).toBe(mockSesion);
    });
    it('retorna respuesta de error', async () => {
        sesionRepository.getById.mockResolvedValueOnce(mockRespuesta);
        const result = await useCase.execute('3');
        expect(result).toBe(mockRespuesta);
    });
    it('propaga errores si ocurren', async () => {
        sesionRepository.getById.mockRejectedValueOnce(new Error('DB error'));
        await expect(useCase.execute('4')).rejects.toThrow('DB error');
    });
});
//# sourceMappingURL=get-sesion.spec.js.map