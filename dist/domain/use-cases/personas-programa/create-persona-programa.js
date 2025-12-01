"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreatePersonaProgramaUseCaseImpl = void 0;
class CreatePersonaProgramaUseCaseImpl {
    constructor(personasProgramaRepository) {
        this.personasProgramaRepository = personasProgramaRepository;
    }
    execute(personaPrograma) {
        return this.personasProgramaRepository.create(personaPrograma);
    }
}
exports.CreatePersonaProgramaUseCaseImpl = CreatePersonaProgramaUseCaseImpl;
//# sourceMappingURL=create-persona-programa.js.map