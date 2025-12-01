"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PersonasProgramaRepositoryImpl = void 0;
class PersonasProgramaRepositoryImpl {
    constructor(dataSource) {
        this.dataSource = dataSource;
    }
    async getById(id_persona_programa) {
        return this.dataSource.getById(id_persona_programa);
    }
    async getAll() {
        return this.dataSource.getAll();
    }
    async create(personaPrograma) {
        return this.dataSource.create(personaPrograma);
    }
    async updateById(id_persona_programa, personaPrograma) {
        return this.dataSource.updateById(id_persona_programa, personaPrograma);
    }
    async deleteById(id_persona_programa) {
        return this.dataSource.deleteById(id_persona_programa);
    }
}
exports.PersonasProgramaRepositoryImpl = PersonasProgramaRepositoryImpl;
//# sourceMappingURL=personas-programa-repository-impl.js.map