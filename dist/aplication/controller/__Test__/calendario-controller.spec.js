"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const calendario_fecha_controller_1 = require("../calendario-fecha-controller");
describe('CalendarioFechaController', () => {
    const calendarioFechaUseCase = { execute: jest.fn() };
    const controller = new calendario_fecha_controller_1.CalendarioFechaController(calendarioFechaUseCase);
    const mockInput = {
        fecha_inicial: '2024-01-01',
        fecha_final: '2024-01-01',
        id_usuario: 'test-user',
    };
    const mockEvento = {
        id_actividad: 'actividad-1',
        id_sesion: 'sesion-1',
        nombre_actividad: 'Actividad de prueba',
        desde: '2024-01-01T00:00:00Z',
        hasta: '2024-01-01T01:00:00Z',
        asistentes_evento: 10,
    };
    const mockRespuesta = { exitoso: 'N', mensaje: 'error' };
    beforeEach(() => {
        jest.clearAllMocks();
    });
    it('getByDate - success', async () => {
        calendarioFechaUseCase.execute.mockResolvedValueOnce([mockEvento]);
        await expect(controller.getByDate(mockInput)).resolves.toEqual([
            mockEvento,
        ]);
        expect(calendarioFechaUseCase.execute).toHaveBeenCalledWith(mockInput);
    });
    it('getByDate - error', async () => {
        calendarioFechaUseCase.execute.mockResolvedValueOnce(mockRespuesta);
        await expect(controller.getByDate(mockInput)).resolves.toBe(mockRespuesta);
    });
});
//# sourceMappingURL=calendario-controller.spec.js.map