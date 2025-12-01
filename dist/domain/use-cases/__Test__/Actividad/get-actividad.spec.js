"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const get_actividad_1 = require("../../Actividad/get-actividad");
describe('GetActividadUseCaseImpl', () => {
    const actividadRepository = {
        getById: jest.fn(),
    };
    const useCase = new get_actividad_1.GetActividadUseCaseImpl(actividadRepository);
    const mockActividad = {
        id_programa: 'programa1',
        id_tipo_actividad: 'tipo1',
        id_responsable: 'responsable1',
        id_aliado: 'aliado1',
        fecha_actividad: new Date(),
        descripcion: 'descripcion1',
        estado: 'A',
        id_sede: 'sede1',
        id_frecuencia: 'frecuencia1',
        institucional: 'N',
        nombre_actividad: 'Actividad de prueba',
    };
    const mockRespuesta = { exitoso: 'N', mensaje: 'Error' };
    beforeEach(() => {
        jest.clearAllMocks();
    });
    it('retorna actividad correctamente', async () => {
        actividadRepository.getById.mockResolvedValueOnce(mockActividad);
        const result = await useCase.execute('1');
        expect(actividadRepository.getById).toHaveBeenCalledWith('1');
        expect(result).toBe(mockActividad);
    });
    it('retorna respuesta de error', async () => {
        actividadRepository.getById.mockResolvedValueOnce(mockRespuesta);
        const result = await useCase.execute('1');
        expect(result).toBe(mockRespuesta);
    });
    it('propaga errores si ocurren', async () => {
        actividadRepository.getById.mockRejectedValueOnce(new Error('DB error'));
        await expect(useCase.execute('1')).rejects.toThrow('DB error');
    });
});
//# sourceMappingURL=get-actividad.spec.js.map