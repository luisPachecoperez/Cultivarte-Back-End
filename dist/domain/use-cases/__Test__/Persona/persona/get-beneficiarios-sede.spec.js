"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const get_beneficiarios_sede_1 = require("../../../persona/get-beneficiarios-sede");
describe('GetBeneficiariosSedeUseCaseImpl', () => {
    const personasRepository = {
        getBenSedes: jest.fn(),
    };
    const useCase = new get_beneficiarios_sede_1.GetBeneficiariosSedeUseCaseImpl(personasRepository);
    const mockBeneficiarios = [
        { id_persona: '1', id_sede: 'A', nombre: 'Beneficiario 1' },
        { id_persona: '2', id_sede: 'B', nombre: 'Beneficiario 2' },
    ];
    const mockRespuesta = { exitoso: 'N', mensaje: 'Error' };
    beforeEach(() => {
        jest.clearAllMocks();
    });
    it('retorna array de beneficiarios correctamente', async () => {
        personasRepository.getBenSedes.mockResolvedValueOnce(mockBeneficiarios);
        const result = await useCase.execute();
        expect(personasRepository.getBenSedes).toHaveBeenCalled();
        expect(result).toBe(mockBeneficiarios);
    });
    it('retorna respuesta de error', async () => {
        personasRepository.getBenSedes.mockResolvedValueOnce(mockRespuesta);
        const result = await useCase.execute();
        expect(result).toBe(mockRespuesta);
    });
    it('propaga errores si ocurren', async () => {
        personasRepository.getBenSedes.mockRejectedValueOnce(new Error('DB error'));
        await expect(useCase.execute()).rejects.toThrow('DB error');
    });
});
//# sourceMappingURL=get-beneficiarios-sede.spec.js.map