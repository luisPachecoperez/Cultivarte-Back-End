"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreatePersonaSedeUseCaseImpl = void 0;
class CreatePersonaSedeUseCaseImpl {
    constructor(personaSedeRepository) {
        this.personaSedeRepository = personaSedeRepository;
    }
    execute(personaSede) {
        return this.personaSedeRepository.create(personaSede);
    }
}
exports.CreatePersonaSedeUseCaseImpl = CreatePersonaSedeUseCaseImpl;
//# sourceMappingURL=create-persona-sede.js.map