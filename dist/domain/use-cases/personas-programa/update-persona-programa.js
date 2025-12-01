"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdatePersonaProgramaUseCaseImpl = void 0;
class UpdatePersonaProgramaUseCaseImpl {
    constructor(personasProgramaRepository) {
        this.personasProgramaRepository = personasProgramaRepository;
    }
    execute(id_persona, personaPrograma) {
        return this.personasProgramaRepository.updateById(id_persona, personaPrograma);
    }
}
exports.UpdatePersonaProgramaUseCaseImpl = UpdatePersonaProgramaUseCaseImpl;
//# sourceMappingURL=update-persona-programa.js.map