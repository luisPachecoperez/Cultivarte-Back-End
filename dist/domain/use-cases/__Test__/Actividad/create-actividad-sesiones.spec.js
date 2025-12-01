"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const create_actividad_sesiones_1 = require("../../../use-cases/Actividad/create-actividad-sesiones");
describe('CreateActividadAndSesionesUseCaseImpl', () => {
    let actividadRepository;
    let parametroDetalleRepository;
    let useCase;
    const actividad = {
        id_frecuencia: 'freq1',
        frecuencia: '',
    };
    beforeEach(() => {
        actividadRepository = {
            createActividadAndSesiones: jest.fn(),
        };
        parametroDetalleRepository = {
            getById: jest.fn(),
        };
        useCase = new create_actividad_sesiones_1.CreateActividadAndSesionesUseCaseImpl(actividadRepository, parametroDetalleRepository);
        jest.clearAllMocks();
    });
    it('retorna error si no encuentra frecuencia', async () => {
        parametroDetalleRepository.getById.mockResolvedValueOnce(undefined);
        const result = await useCase.execute(actividad);
        expect(result).toEqual({
            exitoso: 'N',
            mensaje: 'Frecuencia no encontrada',
        });
        expect(parametroDetalleRepository.getById).toHaveBeenCalledWith('freq1');
    });
    it('retorna error si frecuencia no tiene nombre', async () => {
        parametroDetalleRepository.getById.mockResolvedValueOnce({
            id_parametro_detalle: 'freq1',
            id_parametro_general: 'general1',
        });
        const result = await useCase.execute(actividad);
        expect(result).toEqual({
            exitoso: 'N',
            mensaje: 'Frecuencia no encontrada',
        });
    });
    it('asigna frecuencia y crea actividad', async () => {
        parametroDetalleRepository.getById.mockResolvedValueOnce({
            id_parametro_detalle: 'freq1',
            nombre: 'Semanal',
            id_parametro_general: 'general1',
        });
        actividadRepository.createActividadAndSesiones.mockResolvedValueOnce({
            ...actividad,
            frecuencia: 'Semanal',
        });
        const result = await useCase.execute(actividad);
        expect(actividad.frecuencia).toBe('Semanal');
        expect(actividadRepository.createActividadAndSesiones).toHaveBeenCalledWith(actividad);
        expect(result).toEqual({ ...actividad, frecuencia: 'Semanal' });
    });
    it('retorna error si ocurre excepción', async () => {
        parametroDetalleRepository.getById.mockRejectedValueOnce(new Error('DB error'));
        const result = await useCase.execute(actividad);
        expect(result).toEqual({ exitoso: 'N', mensaje: 'DB error' });
    });
    it('retorna error si ocurre excepción no Error', async () => {
        parametroDetalleRepository.getById.mockRejectedValueOnce({
            custom: 'fail',
        });
        const result = await useCase.execute(actividad);
        expect(result).toEqual({
            exitoso: 'N',
            mensaje: JSON.stringify({ custom: 'fail' }),
        });
    });
});
//# sourceMappingURL=create-actividad-sesiones.spec.js.map