"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const get_actividad_sedes_1 = require("../../Actividad/get-actividad-sedes");
describe('GetActividadSedesUseCaseImpl', () => {
    const actividadRepository = {
        getActividadSedes: jest.fn(),
    };
    const useCase = new get_actividad_sedes_1.GetActividadSedesUseCaseImpl(actividadRepository);
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
        actividadRepository.getActividadSedes.mockResolvedValueOnce([
            mockActividad,
        ]);
        const result = await useCase.execute('user1', '2024-01-01', '2024-01-31');
        expect(actividadRepository.getActividadSedes).toHaveBeenCalledWith('user1', '2024-01-01', '2024-01-31');
        expect(result).toEqual([mockActividad]);
    });
    it('retorna respuesta de error', async () => {
        actividadRepository.getActividadSedes.mockResolvedValueOnce(mockRespuesta);
        const result = await useCase.execute('user1', '2024-01-01', '2024-01-31');
        expect(result).toBe(mockRespuesta);
    });
    it('propaga errores si ocurren', async () => {
        actividadRepository.getActividadSedes.mockRejectedValueOnce(new Error('DB error'));
        await expect(useCase.execute('user1', '2024-01-01', '2024-01-31')).rejects.toThrow('DB error');
    });
});
//# sourceMappingURL=get-actividad-sedes.spec.js.map