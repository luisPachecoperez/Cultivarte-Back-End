"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetPersonaSedeUseCaseImpl = void 0;
class GetPersonaSedeUseCaseImpl {
    constructor(personaSedeRepository) {
        this.personaSedeRepository = personaSedeRepository;
    }
    execute(id_persona_sede) {
        return this.personaSedeRepository.getById(id_persona_sede);
    }
}
exports.GetPersonaSedeUseCaseImpl = GetPersonaSedeUseCaseImpl;
//# sourceMappingURL=get-persona-sede.js.map