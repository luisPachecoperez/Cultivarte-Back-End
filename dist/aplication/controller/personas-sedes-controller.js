"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PersonasSedesController = void 0;
class PersonasSedesController {
    constructor(getPersonaSedeUseCase, getPersonasSedesUseCase, createPersonaSedeUseCase, updatePersonaSedeUseCase, deletePersonaSedeUseCase) {
        this.getPersonaSedeUseCase = getPersonaSedeUseCase;
        this.getPersonasSedesUseCase = getPersonasSedesUseCase;
        this.createPersonaSedeUseCase = createPersonaSedeUseCase;
        this.updatePersonaSedeUseCase = updatePersonaSedeUseCase;
        this.deletePersonaSedeUseCase = deletePersonaSedeUseCase;
    }
    async getAll() {
        return this.getPersonasSedesUseCase.execute();
    }
    async getById(id_sede) {
        return this.getPersonaSedeUseCase.execute(id_sede);
    }
    async create(personaSede) {
        return this.createPersonaSedeUseCase.execute(personaSede);
    }
    async update(id_sede, personaSede) {
        return this.updatePersonaSedeUseCase.execute(id_sede, personaSede);
    }
    async delete(id_sede) {
        return this.deletePersonaSedeUseCase.execute(id_sede);
    }
}
exports.PersonasSedesController = PersonasSedesController;
//# sourceMappingURL=personas-sedes-controller.js.map