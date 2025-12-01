"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PersonasGruposInteresController = void 0;
class PersonasGruposInteresController {
    constructor(getPersonaGrupoInteresByIdUseCase, getPersonasGrupoInteresUseCase, createPersonaGrupoInteresUseCase, updatePersonaGrupoInteresUseCase, deletePersonaGrupoInteresUseCase) {
        this.getPersonaGrupoInteresByIdUseCase = getPersonaGrupoInteresByIdUseCase;
        this.getPersonasGrupoInteresUseCase = getPersonasGrupoInteresUseCase;
        this.createPersonaGrupoInteresUseCase = createPersonaGrupoInteresUseCase;
        this.updatePersonaGrupoInteresUseCase = updatePersonaGrupoInteresUseCase;
        this.deletePersonaGrupoInteresUseCase = deletePersonaGrupoInteresUseCase;
    }
    async getPersonaGrupoInteresById(id_persona_grupo_interes) {
        return this.getPersonaGrupoInteresByIdUseCase.execute(id_persona_grupo_interes);
    }
    async getPersonasGrupoInteres() {
        return this.getPersonasGrupoInteresUseCase.execute();
    }
    async createPersonaGrupoInteres(personaGrupoInteres) {
        return this.createPersonaGrupoInteresUseCase.execute(personaGrupoInteres);
    }
    async updatePersonaGrupoInteres(id_persona_grupo_interes, personaGrupoInteres) {
        return this.updatePersonaGrupoInteresUseCase.execute(id_persona_grupo_interes, personaGrupoInteres);
    }
    async deletePersonaGrupoInteres(id_persona_grupo_interes) {
        return this.deletePersonaGrupoInteresUseCase.execute(id_persona_grupo_interes);
    }
}
exports.PersonasGruposInteresController = PersonasGruposInteresController;
//# sourceMappingURL=personas-grupos-interes-controller.js.map