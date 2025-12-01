"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdatePersonaSedeUseCaseImpl = void 0;
class UpdatePersonaSedeUseCaseImpl {
    constructor(personaSedeRepository) {
        this.personaSedeRepository = personaSedeRepository;
    }
    execute(id_personas_sede, personasSede) {
        return this.personaSedeRepository.updateById(id_personas_sede, personasSede);
    }
}
exports.UpdatePersonaSedeUseCaseImpl = UpdatePersonaSedeUseCaseImpl;
//# sourceMappingURL=update-persona-sede.js.map