"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PersonasGrupoInteresRepositoryImpl = void 0;
class PersonasGrupoInteresRepositoryImpl {
    constructor(personasGrupoInteresDataSource) {
        this.personasGrupoInteresDataSource = personasGrupoInteresDataSource;
    }
    async getAll() {
        return this.personasGrupoInteresDataSource.getAll();
    }
    async getById(id_persona_grupo_interes) {
        return this.personasGrupoInteresDataSource.getById(id_persona_grupo_interes);
    }
    async create(personaGrupoInteres) {
        return this.personasGrupoInteresDataSource.create(personaGrupoInteres);
    }
    async updateById(id_persona_grupo_interes, personaGrupoInteres) {
        return this.personasGrupoInteresDataSource.updateById(id_persona_grupo_interes, personaGrupoInteres);
    }
    async deleteById(id_persona_grupo_interes) {
        return this.personasGrupoInteresDataSource.deleteById(id_persona_grupo_interes);
    }
}
exports.PersonasGrupoInteresRepositoryImpl = PersonasGrupoInteresRepositoryImpl;
//# sourceMappingURL=personas-grupo-interes-repository-impl.js.map