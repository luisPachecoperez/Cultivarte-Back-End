"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetPersonasSedesUseCaseImpl = void 0;
class GetPersonasSedesUseCaseImpl {
    constructor(personaSedeRepository) {
        this.personaSedeRepository = personaSedeRepository;
    }
    execute() {
        return this.personaSedeRepository.getAll();
    }
}
exports.GetPersonasSedesUseCaseImpl = GetPersonasSedesUseCaseImpl;
//# sourceMappingURL=get-personas-sedes.js.map