"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetPersonasUseCaseImpl = void 0;
class GetPersonasUseCaseImpl {
    constructor(personasRepository) {
        this.personasRepository = personasRepository;
    }
    async execute(limit, offset) {
        return this.personasRepository.getAll(limit, offset);
    }
}
exports.GetPersonasUseCaseImpl = GetPersonasUseCaseImpl;
//# sourceMappingURL=get-personas.js.map