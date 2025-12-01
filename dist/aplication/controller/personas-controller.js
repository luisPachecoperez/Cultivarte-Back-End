"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PersonasController = void 0;
class PersonasController {
    constructor(getPersonaUseCase, getPersonasUseCase, getAliadosSedeUseCase, getBeneficiariosSedeUseCase, createPersonaUseCase, updatePersonaUseCase, deletePersonaUseCase) {
        this.getPersonaUseCase = getPersonaUseCase;
        this.getPersonasUseCase = getPersonasUseCase;
        this.getAliadosSedeUseCase = getAliadosSedeUseCase;
        this.getBeneficiariosSedeUseCase = getBeneficiariosSedeUseCase;
        this.createPersonaUseCase = createPersonaUseCase;
        this.updatePersonaUseCase = updatePersonaUseCase;
        this.deletePersonaUseCase = deletePersonaUseCase;
    }
    async createPersona(persona) {
        return this.createPersonaUseCase.execute(persona);
    }
    async updatePersona(id_persona, persona) {
        return this.updatePersonaUseCase.execute(id_persona, persona);
    }
    async deletePersona(id_persona) {
        return this.deletePersonaUseCase.execute(id_persona);
    }
    async getPersona(id_persona) {
        return this.getPersonaUseCase.execute(id_persona);
    }
    async getPersonas(limit, offset) {
        return this.getPersonasUseCase.execute(limit, offset);
    }
    async getAliadosSede(id_usuario) {
        return this.getAliadosSedeUseCase.execute(id_usuario);
    }
    async getBenSedes() {
        return this.getBeneficiariosSedeUseCase.execute();
    }
}
exports.PersonasController = PersonasController;
//# sourceMappingURL=personas-controller.js.map