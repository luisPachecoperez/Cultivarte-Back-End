"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const get_asistencia_sede_1 = require("../../asistencias/get-asistencia-sede");
describe('GetAsistenciasSedeUseCaseImpl', () => {
    const asistenciaRepository = {
        getAsistenciasSede: jest.fn(),
    };
    const useCase = new get_asistencia_sede_1.GetAsistenciasSedeUseCaseImpl(asistenciaRepository);
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
    it('retorna asistencias correctamente', async () => {
        asistenciaRepository.getAsistenciasSede.mockResolvedValueOnce([
            mockAsistencia,
        ]);
        const result = await useCase.execute('user1', '2024-01-01', '2024-01-31');
        expect(asistenciaRepository.getAsistenciasSede).toHaveBeenCalledWith('user1', '2024-01-01', '2024-01-31');
        expect(result).toEqual([mockAsistencia]);
    });
    it('retorna respuesta de error', async () => {
        asistenciaRepository.getAsistenciasSede.mockResolvedValueOnce(mockRespuesta);
        const result = await useCase.execute('user1', '2024-01-01', '2024-01-31');
        expect(result).toBe(mockRespuesta);
    });
    it('propaga errores si ocurren', async () => {
        asistenciaRepository.getAsistenciasSede.mockRejectedValueOnce(new Error('DB error'));
        await expect(useCase.execute('user1', '2024-01-01', '2024-01-31')).rejects.toThrow('DB error');
    });
});
//# sourceMappingURL=get-asistencia-sede.spec.js.map