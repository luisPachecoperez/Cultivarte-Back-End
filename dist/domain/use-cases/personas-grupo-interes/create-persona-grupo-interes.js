"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreatePersonaGrupoInteresUseCaseImpl = void 0;
class CreatePersonaGrupoInteresUseCaseImpl {
    constructor(personasGruposInteresRepository) {
        this.personasGruposInteresRepository = personasGruposInteresRepository;
    }
    execute(personaGrupoInteres) {
        return this.personasGruposInteresRepository.create(personaGrupoInteres);
    }
}
exports.CreatePersonaGrupoInteresUseCaseImpl = CreatePersonaGrupoInteresUseCaseImpl;
//# sourceMappingURL=create-persona-grupo-interes.js.map