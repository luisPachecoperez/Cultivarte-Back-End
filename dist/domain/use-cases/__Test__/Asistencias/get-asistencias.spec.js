"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const get_asistencias_1 = require("../../asistencias/get-asistencias");
describe('GetAsistenciasUseCaseImpl', () => {
    const asistenciaRepository = {
        getAll: jest.fn(),
    };
    const useCase = new get_asistencias_1.GetAsistenciasUseCaseImpl(asistenciaRepository);
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
        asistenciaRepository.getAll.mockResolvedValueOnce([mockAsistencia]);
        const result = await useCase.execute();
        expect(asistenciaRepository.getAll).toHaveBeenCalled();
        expect(result).toEqual([mockAsistencia]);
    });
    it('retorna respuesta de error', async () => {
        asistenciaRepository.getAll.mockResolvedValueOnce(mockRespuesta);
        const result = await useCase.execute();
        expect(result).toBe(mockRespuesta);
    });
    it('propaga errores si ocurren', async () => {
        asistenciaRepository.getAll.mockRejectedValueOnce(new Error('DB error'));
        await expect(useCase.execute()).rejects.toThrow('DB error');
    });
});
//# sourceMappingURL=get-asistencias.spec.js.map