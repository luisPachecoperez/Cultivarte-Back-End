"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetPersonaUseCaseImpl = void 0;
class GetPersonaUseCaseImpl {
    constructor(personasRepository) {
        this.personasRepository = personasRepository;
    }
    async execute(id_persona) {
        return this.personasRepository.getById(id_persona);
    }
}
exports.GetPersonaUseCaseImpl = GetPersonaUseCaseImpl;
//# sourceMappingURL=get-persona.js.map