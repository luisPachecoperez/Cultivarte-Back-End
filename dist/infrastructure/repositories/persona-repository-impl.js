"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PersonaRepositoryImpl = void 0;
class PersonaRepositoryImpl {
    constructor(personaDataSource) {
        this.personaDataSource = personaDataSource;
    }
    async getAll(limit, offset) {
        try {
            const result = await this.personaDataSource.getAll(limit, offset);
            return Array.isArray(result) ? result : [];
        }
        catch (error) {
            console.error('Error en getAll:', error);
            return {
                exitoso: 'N',
                mensaje: 'No se pudo obtener personas: ' +
                    (error instanceof Error ? error.message : JSON.stringify(error)),
            };
        }
    }
    async getById(id_persona) {
        try {
            const result = await this.personaDataSource.getById(id_persona);
            return result;
        }
        catch (error) {
            console.error('Error en getById:', error);
            return {
                exitoso: 'N',
                mensaje: 'No se pudo obtener persona: ' +
                    (error instanceof Error ? error.message : JSON.stringify(error)),
            };
        }
    }
    async getAliadosSede(id_usuario) {
        try {
            const result = await this.personaDataSource.getAliadosSede(id_usuario);
            return Array.isArray(result) ? result : [];
        }
        catch (error) {
            console.error('Error en getAliadosSede:', error);
            return {
                exitoso: 'N',
                mensaje: 'No se pudo obtener aliados: ' +
                    (error instanceof Error ? error.message : JSON.stringify(error)),
            };
        }
    }
    async getBenSedes() {
        try {
            const result = await this.personaDataSource.getBenSedes();
            return Array.isArray(result) ? result : [];
        }
        catch (error) {
            console.error('Error en getBenSedes:', error);
            return {
                exitoso: 'N',
                mensaje: 'No se pudo obtener beneficiarios: ' +
                    (error instanceof Error ? error.message : JSON.stringify(error)),
            };
        }
    }
    async createPersona(persona) {
        try {
            const result = await this.personaDataSource.createPersona(persona);
            return result;
        }
        catch (error) {
            console.error('Error en createPersona:', error);
            return {
                exitoso: 'N',
                mensaje: 'No se pudo crear persona: ' +
                    (error instanceof Error ? error.message : JSON.stringify(error)),
            };
        }
    }
    async updatePersona(id_persona, persona) {
        try {
            const result = await this.personaDataSource.updatePersona(id_persona, persona);
            return result;
        }
        catch (error) {
            console.error('Error en updatePersona:', error);
            return {
                exitoso: 'N',
                mensaje: 'No se pudo actualizar persona: ' +
                    (error instanceof Error ? error.message : JSON.stringify(error)),
            };
        }
    }
    async deletePersona(id_persona) {
        try {
            const result = await this.personaDataSource.deletePersona(id_persona);
            return result;
        }
        catch (error) {
            console.error('Error en deletePersona:', error);
            return {
                exitoso: 'N',
                mensaje: 'No se pudo eliminar persona: ' +
                    (error instanceof Error ? error.message : JSON.stringify(error)),
            };
        }
    }
    async getBeneficiarios() {
        try {
            const result = await this.personaDataSource.getBeneficiarios();
            return Array.isArray(result) ? result : [];
        }
        catch (error) {
            console.error('Error en getBeneficiarios:', error);
            return {
                exitoso: 'N',
                mensaje: 'No se pudo obtener beneficiarios: ' +
                    (error instanceof Error ? error.message : JSON.stringify(error)),
            };
        }
    }
}
exports.PersonaRepositoryImpl = PersonaRepositoryImpl;
//# sourceMappingURL=persona-repository-impl.js.map