"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DeletePersonaSedeUseCaseImpl = void 0;
class DeletePersonaSedeUseCaseImpl {
    constructor(personaSedeRepository) {
        this.personaSedeRepository = personaSedeRepository;
    }
    execute(id_sede) {
        return this.personaSedeRepository.deleteById(id_sede);
    }
}
exports.DeletePersonaSedeUseCaseImpl = DeletePersonaSedeUseCaseImpl;
//# sourceMappingURL=delete-persona-sede.js.map