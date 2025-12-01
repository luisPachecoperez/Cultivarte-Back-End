"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetPersonasProgramaUseCaseImpl = void 0;
class GetPersonasProgramaUseCaseImpl {
    constructor(personasProgramaRepository) {
        this.personasProgramaRepository = personasProgramaRepository;
    }
    execute() {
        return this.personasProgramaRepository.getAll();
    }
}
exports.GetPersonasProgramaUseCaseImpl = GetPersonasProgramaUseCaseImpl;
//# sourceMappingURL=get-personas-programa.js.map