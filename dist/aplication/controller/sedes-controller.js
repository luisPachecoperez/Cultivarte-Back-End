"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SedesController = void 0;
class SedesController {
    constructor(getSedesUseCase, getSedeUseCase, createSedeUseCase, updateSedeUseCase, deleteSedeUseCase) {
        this.getSedesUseCase = getSedesUseCase;
        this.getSedeUseCase = getSedeUseCase;
        this.createSedeUseCase = createSedeUseCase;
        this.updateSedeUseCase = updateSedeUseCase;
        this.deleteSedeUseCase = deleteSedeUseCase;
    }
    async getAll() {
        return this.getSedesUseCase.execute();
    }
    async getById(id_sede) {
        return this.getSedeUseCase.execute(id_sede);
    }
    async create(sede) {
        return this.createSedeUseCase.execute(sede);
    }
    async update(id_sede, sede) {
        return this.updateSedeUseCase.execute(id_sede, sede);
    }
    async delete(id_sede) {
        return this.deleteSedeUseCase.execute(id_sede);
    }
}
exports.SedesController = SedesController;
//# sourceMappingURL=sedes-controller.js.map