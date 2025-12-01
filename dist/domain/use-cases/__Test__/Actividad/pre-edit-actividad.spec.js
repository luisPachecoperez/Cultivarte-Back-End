"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const pre_edit_actividad_1 = require("../../Actividad/pre-edit-actividad");
describe('GetPreEditActividadUseCaseImpl', () => {
    const actividadRepository = {
        getPreEditActividad: jest.fn(),
    };
    const useCase = new pre_edit_actividad_1.GetPreEditActividadUseCaseImpl(actividadRepository);
    const mockPreEdit = {
        id_programa: 'programa1',
        sedes: [],
        tiposDeActividad: [],
        aliados: [],
        responsables: [],
        nombresDeActividad: [],
        frecuencias: [],
        actividad: {},
        sesiones: [],
    };
    const mockRespuesta = { exitoso: 'N', mensaje: 'Error' };
    beforeEach(() => {
        jest.clearAllMocks();
    });
    it('retorna preEditActividad correctamente', async () => {
        actividadRepository.getPreEditActividad.mockResolvedValueOnce(mockPreEdit);
        const result = await useCase.execute('act1', 'user1');
        expect(actividadRepository.getPreEditActividad).toHaveBeenCalledWith('act1', 'user1');
        expect(result).toBe(mockPreEdit);
    });
    it('retorna respuesta de error', async () => {
        actividadRepository.getPreEditActividad.mockResolvedValueOnce(mockRespuesta);
        const result = await useCase.execute('act1', 'user1');
        expect(result).toBe(mockRespuesta);
    });
    it('propaga errores si ocurren', async () => {
        actividadRepository.getPreEditActividad.mockRejectedValueOnce(new Error('DB error'));
        await expect(useCase.execute('act1', 'user1')).rejects.toThrow('DB error');
    });
});
//# sourceMappingURL=pre-edit-actividad.spec.js.map