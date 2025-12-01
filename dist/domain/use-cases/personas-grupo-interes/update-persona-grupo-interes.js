"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdatePersonaGrupoInteresUseCaseImpl = void 0;
class UpdatePersonaGrupoInteresUseCaseImpl {
    constructor(personasGruposInteresRepository) {
        this.personasGruposInteresRepository = personasGruposInteresRepository;
    }
    execute(id_persona_grupo_interes, personaGrupoInteres) {
        return this.personasGruposInteresRepository.updateById(id_persona_grupo_interes, personaGrupoInteres);
    }
}
exports.UpdatePersonaGrupoInteresUseCaseImpl = UpdatePersonaGrupoInteresUseCaseImpl;
//# sourceMappingURL=update-persona-grupo-interes.js.map