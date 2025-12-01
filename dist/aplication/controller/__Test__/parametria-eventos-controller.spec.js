"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const parametria_eventos_controller_1 = require("../parametria-eventos-controller");
describe('ParametriaEventosController', () => {
    const getParametriaEventosUseCase = { execute: jest.fn() };
    const controller = new parametria_eventos_controller_1.ParametriaEventosController(getParametriaEventosUseCase);
    beforeEach(() => {
        jest.clearAllMocks();
    });
    it('getAll - success', async () => {
        const mockResult = [{ id: 1, nombre: 'Evento' }];
        getParametriaEventosUseCase.execute.mockResolvedValueOnce(mockResult);
        await expect(controller.getAll()).resolves.toEqual(mockResult);
        expect(getParametriaEventosUseCase.execute).toHaveBeenCalled();
    });
    it('getAll - error', async () => {
        const mockError = { error: true, mensaje: 'error' };
        getParametriaEventosUseCase.execute.mockResolvedValueOnce(mockError);
        await expect(controller.getAll()).resolves.toBe(mockError);
    });
});
//# sourceMappingURL=parametria-eventos-controller.spec.js.map