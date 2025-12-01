"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const get_aliados_sede_1 = require("../../../persona/get-aliados-sede");
describe('GetAliadosSedeUseCaseImpl', () => {
    const personasRepository = {
        getAliadosSede: jest.fn(),
    };
    const useCase = new get_aliados_sede_1.GetAliadosSedeUseCaseImpl(personasRepository);
    const mockPersonas = [
        { id_persona: '1', nombre: 'Aliado 1' },
        { id_persona: '2', nombre: 'Aliado 2' },
    ];
    const mockRespuesta = { exitoso: 'N', mensaje: 'Error' };
    beforeEach(() => {
        jest.clearAllMocks();
    });
    it('retorna array de personas si el repositorio retorna array', async () => {
        personasRepository.getAliadosSede.mockResolvedValueOnce(mockPersonas);
        const result = await useCase.execute('1');
        expect(personasRepository.getAliadosSede).toHaveBeenCalledWith('1');
        expect(result).toEqual(mockPersonas);
    });
    it('retorna array vacío si el repositorio retorna un objeto no array', async () => {
        personasRepository.getAliadosSede.mockResolvedValueOnce(mockRespuesta);
        const result = await useCase.execute('2');
        expect(result).toEqual([]);
    });
    it('retorna array vacío si el repositorio lanza error', async () => {
        personasRepository.getAliadosSede.mockRejectedValueOnce(new Error('DB error'));
        const result = await useCase.execute('3');
        expect(result).toEqual([]);
    });
});
//# sourceMappingURL=get-aliados-sede.spec.js.map