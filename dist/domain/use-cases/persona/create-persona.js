"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreatePersonaUseCaseImpl = void 0;
class CreatePersonaUseCaseImpl {
    constructor(personasRepository) {
        this.personasRepository = personasRepository;
    }
    async execute(persona) {
        return this.personasRepository.createPersona(persona);
    }
}
exports.CreatePersonaUseCaseImpl = CreatePersonaUseCaseImpl;
//# sourceMappingURL=create-persona.js.map