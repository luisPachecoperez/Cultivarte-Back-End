"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const get_sesiones_1 = require("../../sesiones/get-sesiones");
describe('GetSesionesUseCaseImpl', () => {
    const sesionRepository = {
        getAll: jest.fn(),
    };
    const useCase = new get_sesiones_1.GetSesionesUseCaseImpl(sesionRepository);
    const mockSesiones = [
        { id: '1', nombre: 'Sesion 1' },
        { id: '2', nombre: 'Sesion 2' },
    ];
    const mockRespuesta = { exitoso: 'N', mensaje: 'Error' };
    beforeEach(() => {
        jest.clearAllMocks();
    });
    it('llama getAll con los argumentos correctos', async () => {
        sesionRepository.getAll.mockResolvedValueOnce(mockSesiones);
        const result = await useCase.execute(10, 0);
        expect(sesionRepository.getAll).toHaveBeenCalledWith(10, 0);
        expect(result).toBe(mockSesiones);
    });
    it('retorna respuesta de error', async () => {
        sesionRepository.getAll.mockResolvedValueOnce(mockRespuesta);
        const result = await useCase.execute(5, 2);
        expect(result).toBe(mockRespuesta);
    });
    it('propaga errores si ocurren', async () => {
        sesionRepository.getAll.mockRejectedValueOnce(new Error('DB error'));
        await expect(useCase.execute(1, 1)).rejects.toThrow('DB error');
    });
});
//# sourceMappingURL=get-sesiones.spec.js.map