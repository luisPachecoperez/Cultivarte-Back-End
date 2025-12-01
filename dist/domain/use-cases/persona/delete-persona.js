"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DeletePersonaUseCaseImpl = void 0;
class DeletePersonaUseCaseImpl {
    constructor(personasRepository) {
        this.personasRepository = personasRepository;
    }
    async execute(id_persona) {
        return this.personasRepository.deletePersona(id_persona);
    }
}
exports.DeletePersonaUseCaseImpl = DeletePersonaUseCaseImpl;
//# sourceMappingURL=delete-persona.js.map