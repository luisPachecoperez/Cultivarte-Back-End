"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetPersonaProgramaUseCaseImpl = void 0;
class GetPersonaProgramaUseCaseImpl {
    constructor(personasProgramaRepository) {
        this.personasProgramaRepository = personasProgramaRepository;
    }
    execute(id_persona_programa) {
        return this.personasProgramaRepository.getById(id_persona_programa);
    }
}
exports.GetPersonaProgramaUseCaseImpl = GetPersonaProgramaUseCaseImpl;
//# sourceMappingURL=get-persona-programa.js.map