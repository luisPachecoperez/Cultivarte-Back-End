"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const create_asistencia_1 = require("../../asistencias/create-asistencia");
describe('CreateAsistenciaUseCaseImpl', () => {
    const asistenciaRepository = {
        createAsistencia: jest.fn(),
    };
    const useCase = new create_asistencia_1.CreateAsistenciaUseCaseImpl(asistenciaRepository);
    const asistencia = {
        id_asistencia: '1',
        id_sesion: '1',
        id_persona: null,
        id_creado_por: null,
        fecha_creacion: null,
        id_modificado_por: null,
        fecha_modificacion: null,
    };
    const mockRespuesta = { exitoso: 'S', mensaje: 'Creada' };
    beforeEach(() => {
        jest.clearAllMocks();
    });
    it('ejecuta createAsistencia y retorna la respuesta', async () => {
        asistenciaRepository.createAsistencia.mockResolvedValueOnce(mockRespuesta);
        const result = await useCase.execute(asistencia);
        expect(asistenciaRepository.createAsistencia).toHaveBeenCalledWith(asistencia);
        expect(result).toBe(mockRespuesta);
    });
    it('propaga errores si ocurren', async () => {
        asistenciaRepository.createAsistencia.mockRejectedValueOnce(new Error('DB error'));
        await expect(useCase.execute(asistencia)).rejects.toThrow('DB error');
    });
});
//# sourceMappingURL=create-asistencia.spec.js.map