"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateActividadAndSesionesUseCaseImpl = void 0;
class CreateActividadAndSesionesUseCaseImpl {
    constructor(actividadRepository, parametroDetalleRepository) {
        this.actividadRepository = actividadRepository;
        this.parametroDetalleRepository = parametroDetalleRepository;
    }
    async execute(actividad) {
        try {
            const frecuencia = await this.parametroDetalleRepository.getById(actividad.id_frecuencia);
            if (!frecuencia) {
                return { exitoso: 'N', mensaje: 'Frecuencia no encontrada' };
            }
            if ('nombre' in frecuencia) {
                actividad.frecuencia = frecuencia.nombre;
            }
            else {
                return { exitoso: 'N', mensaje: 'Frecuencia no encontrada' };
            }
            return this.actividadRepository.createActividadAndSesiones(actividad);
        }
        catch (error) {
            return {
                exitoso: 'N',
                mensaje: error instanceof Error ? error.message : JSON.stringify(error),
            };
        }
    }
}
exports.CreateActividadAndSesionesUseCaseImpl = CreateActividadAndSesionesUseCaseImpl;
//# sourceMappingURL=create-actividad-sesiones.js.map