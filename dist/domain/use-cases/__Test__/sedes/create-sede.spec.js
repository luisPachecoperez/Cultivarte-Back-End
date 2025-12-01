"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const create_sede_1 = require("../../sedes/create-sede");
describe('CreateSedeUseCaseImpl', () => {
    const sedeRepository = {
        create: jest.fn(),
    };
    const useCase = new create_sede_1.CreateSedeUseCaseImpl(sedeRepository);
    const mockSede = { id: '1', nombre: 'Sede Test' };
    const mockRespuesta = { exitoso: 'N', mensaje: 'Error' };
    beforeEach(() => {
        jest.clearAllMocks();
    });
    it('retorna Sede correctamente', async () => {
        sedeRepository.create.mockResolvedValueOnce(mockSede);
        const result = await useCase.execute(mockSede);
        expect(sedeRepository.create).toHaveBeenCalledWith(mockSede);
        expect(result).toBe(mockSede);
    });
    it('retorna respuesta de error', async () => {
        sedeRepository.create.mockResolvedValueOnce(mockRespuesta);
        const result = await useCase.execute(mockSede);
        expect(result).toBe(mockRespuesta);
    });
    it('propaga errores si ocurren', async () => {
        sedeRepository.create.mockRejectedValueOnce(new Error('DB error'));
        await expect(useCase.execute(mockSede)).rejects.toThrow('DB error');
    });
});
//# sourceMappingURL=create-sede.spec.js.map