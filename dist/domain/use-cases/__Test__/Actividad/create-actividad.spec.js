"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const create_actividad_1 = require("../../../use-cases/Actividad/create-actividad");
describe('CreateActividadUseCaseImpl', () => {
    const actividadRepository = {
        createActividad: jest.fn(),
    };
    const useCase = new create_actividad_1.CreateActividadUseCaseImpl(actividadRepository);
    const actividad = {
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
    const mockRespuesta = { exitoso: 'S', mensaje: 'Creada' };
    beforeEach(() => {
        jest.clearAllMocks();
    });
    it('ejecuta createActividad y retorna la respuesta', async () => {
        actividadRepository.createActividad.mockResolvedValueOnce(mockRespuesta);
        const result = await useCase.execute(actividad);
        expect(actividadRepository.createActividad).toHaveBeenCalledWith(actividad);
        expect(result).toBe(mockRespuesta);
    });
    it('propaga errores si ocurren', async () => {
        actividadRepository.createActividad.mockRejectedValueOnce(new Error('DB error'));
        await expect(useCase.execute(actividad)).rejects.toThrow('DB error');
    });
});
//# sourceMappingURL=create-actividad.spec.js.map