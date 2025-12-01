"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PersonasProgramaController = void 0;
class PersonasProgramaController {
    constructor(createPersonaProgramaUseCase, updatePersonaProgramaUseCase, deletePersonaProgramaUseCase, getPersonaProgramaUseCase, getPersonasProgramaUseCase) {
        this.createPersonaProgramaUseCase = createPersonaProgramaUseCase;
        this.updatePersonaProgramaUseCase = updatePersonaProgramaUseCase;
        this.deletePersonaProgramaUseCase = deletePersonaProgramaUseCase;
        this.getPersonaProgramaUseCase = getPersonaProgramaUseCase;
        this.getPersonasProgramaUseCase = getPersonasProgramaUseCase;
    }
    async createPersonaPrograma(personaPrograma) {
        return this.createPersonaProgramaUseCase.execute(personaPrograma);
    }
    async updatePersonaPrograma(id_persona_programa, personaPrograma) {
        return this.updatePersonaProgramaUseCase.execute(id_persona_programa, personaPrograma);
    }
    async deletePersonaPrograma(id_persona_programa) {
        return this.deletePersonaProgramaUseCase.execute(id_persona_programa);
    }
    async getPersonaPrograma(id_persona_programa) {
        return this.getPersonaProgramaUseCase.execute(id_persona_programa);
    }
    async getPersonasPrograma() {
        return this.getPersonasProgramaUseCase.execute();
    }
}
exports.PersonasProgramaController = PersonasProgramaController;
//# sourceMappingURL=personas-programa-controller.js.map