"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ActividadRepositoryImpl = void 0;
class ActividadRepositoryImpl {
    constructor(actividadDataSource) {
        this.actividadDataSource = actividadDataSource;
    }
    async getPreCreateActividad(id_usuario) {
        try {
            return await this.actividadDataSource.getPreCreateActividad(id_usuario);
        }
        catch (error) {
            return {
                exitoso: 'N',
                mensaje: 'Error al obtener pre-create actividad: ' +
                    (error instanceof Error ? error.message : JSON.stringify(error)),
            };
        }
    }
    async getPreEditActividad(id_actividad, id_usuario) {
        try {
            return await this.actividadDataSource.getPreEditActividad(id_actividad, id_usuario);
        }
        catch (error) {
            return {
                exitoso: 'N',
                mensaje: 'Error al obtener pre-edit actividad: ' +
                    (error instanceof Error ? error.message : JSON.stringify(error)),
            };
        }
    }
    async getActividadSedes(id_usuario, fecha_inicio, fecha_fin) {
        try {
            return await this.actividadDataSource.getActividadSedes(id_usuario, fecha_inicio, fecha_fin);
        }
        catch (error) {
            return {
                exitoso: 'N',
                mensaje: 'Error al obtener actividades por sedes: ' +
                    (error instanceof Error ? error.message : JSON.stringify(error)),
            };
        }
    }
    async getAll(limit, offset) {
        try {
            return await this.actividadDataSource.getAll(limit, offset);
        }
        catch (error) {
            return {
                exitoso: 'N',
                mensaje: 'Error al obtener actividades: ' +
                    (error instanceof Error ? error.message : JSON.stringify(error)),
            };
        }
    }
    async getById(id) {
        try {
            return await this.actividadDataSource.getById(id);
        }
        catch (error) {
            return {
                exitoso: 'N',
                mensaje: 'Error al obtener actividad por id: ' +
                    (error instanceof Error ? error.message : JSON.stringify(error)),
            };
        }
    }
    async createActividadAndSesiones(actividad) {
        try {
            return await this.actividadDataSource.createActividadAndSesiones(actividad);
        }
        catch (error) {
            return {
                exitoso: 'N',
                mensaje: 'Error al crear actividad y sesiones: ' +
                    (error instanceof Error ? error.message : JSON.stringify(error)),
            };
        }
    }
    async createActividad(actividad) {
        try {
            return await this.actividadDataSource.createActividad(actividad);
        }
        catch (error) {
            return {
                exitoso: 'N',
                mensaje: 'Error al crear actividad: ' +
                    (error instanceof Error ? error.message : JSON.stringify(error)),
            };
        }
    }
    async updateById(id_actividad, actividad) {
        try {
            return await this.actividadDataSource.updateById(id_actividad, actividad);
        }
        catch (error) {
            return {
                exitoso: 'N',
                mensaje: 'Error al actualizar actividad: ' +
                    (error instanceof Error ? error.message : JSON.stringify(error)),
            };
        }
    }
    async deleteById(id_actividad) {
        try {
            return await this.actividadDataSource.deleteById(id_actividad);
        }
        catch (error) {
            return {
                exitoso: 'N',
                mensaje: 'Error al eliminar actividad: ' +
                    (error instanceof Error ? error.message : JSON.stringify(error)),
            };
        }
    }
}
exports.ActividadRepositoryImpl = ActividadRepositoryImpl;
//# sourceMappingURL=actividad-repository-impl.js.map