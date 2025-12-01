"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetPersonasGrupoInteresUseCaseImpl = void 0;
class GetPersonasGrupoInteresUseCaseImpl {
    constructor(personasGruposInteresRepository) {
        this.personasGruposInteresRepository = personasGruposInteresRepository;
    }
    execute() {
        return this.personasGruposInteresRepository.getAll();
    }
}
exports.GetPersonasGrupoInteresUseCaseImpl = GetPersonasGrupoInteresUseCaseImpl;
//# sourceMappingURL=get-personas-grupo-interes.js.map