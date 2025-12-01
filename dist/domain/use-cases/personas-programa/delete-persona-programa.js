"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DeletePersonaProgramaUseCaseImpl = void 0;
class DeletePersonaProgramaUseCaseImpl {
    constructor(personasProgramaRepository) {
        this.personasProgramaRepository = personasProgramaRepository;
    }
    execute(id_persona_programa) {
        return this.personasProgramaRepository.deleteById(id_persona_programa);
    }
}
exports.DeletePersonaProgramaUseCaseImpl = DeletePersonaProgramaUseCaseImpl;
//# sourceMappingURL=delete-persona-programa.js.map