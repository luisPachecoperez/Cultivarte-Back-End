"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdatePersonaUseCaseImpl = void 0;
class UpdatePersonaUseCaseImpl {
    constructor(personasRepository) {
        this.personasRepository = personasRepository;
    }
    async execute(id_persona, persona) {
        return this.personasRepository.updatePersona(id_persona, persona);
    }
}
exports.UpdatePersonaUseCaseImpl = UpdatePersonaUseCaseImpl;
//# sourceMappingURL=update-persona.js.map