"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetPersonaGrupoInteresUseCaseImpl = void 0;
class GetPersonaGrupoInteresUseCaseImpl {
    constructor(personasGruposInteresRepository) {
        this.personasGruposInteresRepository = personasGruposInteresRepository;
    }
    execute(id_persona_grupo_interes) {
        return this.personasGruposInteresRepository.getById(id_persona_grupo_interes);
    }
}
exports.GetPersonaGrupoInteresUseCaseImpl = GetPersonaGrupoInteresUseCaseImpl;
//# sourceMappingURL=get-persona-grupo-interes.js.map