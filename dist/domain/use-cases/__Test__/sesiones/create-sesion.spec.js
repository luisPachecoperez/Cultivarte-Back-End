"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const create_sesion_1 = require("../../sesiones/create-sesion");
describe('CreateSesionUseCaseImpl', () => {
    const sesionRepository = {
        createSesion: jest.fn(),
    };
    const useCase = new create_sesion_1.CreateSesionUseCaseImpl(sesionRepository);
    const mockSesion = { id: '1', nombre: 'Sesion Test' };
    const mockRespuesta = { exitoso: 'S', mensaje: 'Creado' };
    beforeEach(() => {
        jest.clearAllMocks();
    });
    it('llama createSesion con el argumento correcto', async () => {
        sesionRepository.createSesion.mockResolvedValueOnce(mockRespuesta);
        await useCase.execute(mockSesion);
        expect(sesionRepository.createSesion).toHaveBeenCalledWith(mockSesion);
    });
    it('retorna la respuesta del repositorio', async () => {
        sesionRepository.createSesion.mockResolvedValueOnce(mockRespuesta);
        const result = await useCase.execute(mockSesion);
        expect(result).toBe(mockRespuesta);
    });
    it('propaga errores si ocurren', async () => {
        sesionRepository.createSesion.mockRejectedValueOnce(new Error('DB error'));
        await expect(useCase.execute(mockSesion)).rejects.toThrow('DB error');
    });
});
//# sourceMappingURL=create-sesion.spec.js.map