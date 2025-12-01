"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const get_sesiones_sedes_1 = require("../../sesiones/get-sesiones-sedes");
describe('GetSesionesSedesUseCaseImpl', () => {
    const sesionesRepository = {
        getSesionesSede: jest.fn(),
    };
    const useCase = new get_sesiones_sedes_1.GetSesionesSedesUseCaseImpl(sesionesRepository);
    const mockSesiones = [
        { id: '1', nombre: 'Sesion 1' },
        { id: '2', nombre: 'Sesion 2' },
    ];
    const mockRespuesta = { exitoso: 'N', mensaje: 'Error' };
    beforeEach(() => {
        jest.clearAllMocks();
    });
    it('llama getSesionesSede con los argumentos correctos', async () => {
        sesionesRepository.getSesionesSede.mockResolvedValueOnce(mockSesiones);
        const result = await useCase.execute('user1', '2025-01-01', '2025-01-31');
        expect(sesionesRepository.getSesionesSede).toHaveBeenCalledWith('user1', '2025-01-01', '2025-01-31');
        expect(result).toBe(mockSesiones);
    });
    it('retorna respuesta de error', async () => {
        sesionesRepository.getSesionesSede.mockResolvedValueOnce(mockRespuesta);
        const result = await useCase.execute('user2', '2025-02-01', '2025-02-28');
        expect(result).toBe(mockRespuesta);
    });
    it('propaga errores si ocurren', async () => {
        sesionesRepository.getSesionesSede.mockRejectedValueOnce(new Error('DB error'));
        await expect(useCase.execute('user3', '2025-03-01', '2025-03-31')).rejects.toThrow('DB error');
    });
});
//# sourceMappingURL=get-sesiones-sedes.spec.js.map