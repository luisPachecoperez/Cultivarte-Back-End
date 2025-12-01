"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const get_actividades_1 = require("../../Actividad/get-actividades");
describe('GetActividadesUseCaseImpl', () => {
    const actividadRepository = {
        getAll: jest.fn(),
    };
    const useCase = new get_actividades_1.GetActividadesUseCaseImpl(actividadRepository);
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
    it('retorna actividades correctamente', async () => {
        actividadRepository.getAll.mockResolvedValueOnce([mockActividad]);
        const result = await useCase.execute(10, 0);
        expect(actividadRepository.getAll).toHaveBeenCalledWith(10, 0);
        expect(result).toEqual([mockActividad]);
    });
    it('retorna respuesta de error', async () => {
        actividadRepository.getAll.mockResolvedValueOnce(mockRespuesta);
        const result = await useCase.execute(10, 0);
        expect(result).toBe(mockRespuesta);
    });
    it('propaga errores si ocurren', async () => {
        actividadRepository.getAll.mockRejectedValueOnce(new Error('DB error'));
        await expect(useCase.execute(10, 0)).rejects.toThrow('DB error');
    });
});
//# sourceMappingURL=get-actividades.spec.js.map