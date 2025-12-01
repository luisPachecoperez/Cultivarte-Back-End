"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const pre_create_actividad_1 = require("../../Actividad/pre-create-actividad");
describe('GetPreCreateActividadUseCaseImpl', () => {
    const actividadRepository = {
        getPreCreateActividad: jest.fn(),
    };
    const useCase = new pre_create_actividad_1.GetPreCreateActividadUseCaseImpl(actividadRepository);
    const mockPreCreate = {
        id_programa: '1',
        sedes: [],
        tiposDeActividad: [],
        aliados: [],
        responsables: [],
        nombresDeActividad: [],
        frecuencias: [],
    };
    const mockRespuesta = { exitoso: 'N', mensaje: 'Error' };
    beforeEach(() => {
        jest.clearAllMocks();
    });
    it('retorna preCreateActividad correctamente', async () => {
        actividadRepository.getPreCreateActividad.mockResolvedValueOnce(mockPreCreate);
        const result = await useCase.execute('user1');
        expect(actividadRepository.getPreCreateActividad).toHaveBeenCalledWith('user1');
        expect(result).toBe(mockPreCreate);
    });
    it('retorna respuesta de error', async () => {
        actividadRepository.getPreCreateActividad.mockResolvedValueOnce(mockRespuesta);
        const result = await useCase.execute('user1');
        expect(result).toBe(mockRespuesta);
    });
    it('propaga errores si ocurren', async () => {
        actividadRepository.getPreCreateActividad.mockRejectedValueOnce(new Error('DB error'));
        await expect(useCase.execute('user1')).rejects.toThrow('DB error');
    });
});
//# sourceMappingURL=pre-create-actividad.spec.js.map