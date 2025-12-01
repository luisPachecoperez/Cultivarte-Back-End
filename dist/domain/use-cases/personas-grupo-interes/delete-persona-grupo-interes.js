"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DeletePersonaGrupoInteresUseCaseImpl = void 0;
class DeletePersonaGrupoInteresUseCaseImpl {
    constructor(personasGruposInteresRepository) {
        this.personasGruposInteresRepository = personasGruposInteresRepository;
    }
    execute(id_persona_grupo_interes) {
        return this.personasGruposInteresRepository.deleteById(id_persona_grupo_interes);
    }
}
exports.DeletePersonaGrupoInteresUseCaseImpl = DeletePersonaGrupoInteresUseCaseImpl;
//# sourceMappingURL=delete-persona-grupo-interes.js.map