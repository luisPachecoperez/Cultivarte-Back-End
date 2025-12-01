"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const get_asistencia_1 = require("../../asistencias/get-asistencia");
describe('GetAsistenciaUseCaseImpl', () => {
    const asistenciaRepository = {
        getById: jest.fn(),
    };
    const useCase = new get_asistencia_1.GetAsistenciaUseCaseImpl(asistenciaRepository);
    const mockAsistencia = {
        id_asistencia: '1',
        id_sesion: '1',
        id_persona: null,
        id_creado_por: null,
        fecha_creacion: null,
        id_modificado_por: null,
        fecha_modificacion: null,
    };
    const mockRespuesta = { exitoso: 'N', mensaje: 'Error' };
    beforeEach(() => {
        jest.clearAllMocks();
    });
    it('retorna asistencia correctamente', async () => {
        asistenciaRepository.getById.mockResolvedValueOnce(mockAsistencia);
        const result = await useCase.execute('1');
        expect(asistenciaRepository.getById).toHaveBeenCalledWith('1');
        expect(result).toBe(mockAsistencia);
    });
    it('retorna respuesta de error', async () => {
        asistenciaRepository.getById.mockResolvedValueOnce(mockRespuesta);
        const result = await useCase.execute('1');
        expect(result).toBe(mockRespuesta);
    });
    it('propaga errores si ocurren', async () => {
        asistenciaRepository.getById.mockRejectedValueOnce(new Error('DB error'));
        await expect(useCase.execute('1')).rejects.toThrow('DB error');
    });
});
//# sourceMappingURL=get-asistencia.spec.js.map