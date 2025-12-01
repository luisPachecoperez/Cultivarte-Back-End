"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PersonasSedesRepositoryImpl = void 0;
class PersonasSedesRepositoryImpl {
    constructor(personasSedesDataSource) {
        this.personasSedesDataSource = personasSedesDataSource;
    }
    getAll() {
        return this.personasSedesDataSource.getAll();
    }
    getById(id_sede) {
        return this.personasSedesDataSource.getById(id_sede);
    }
    create(personaSede) {
        return this.personasSedesDataSource.create(personaSede);
    }
    updateById(id_sede, personaSede) {
        return this.personasSedesDataSource.updateById(id_sede, personaSede);
    }
    deleteById(id_sede) {
        return this.personasSedesDataSource.deleteById(id_sede);
    }
}
exports.PersonasSedesRepositoryImpl = PersonasSedesRepositoryImpl;
//# sourceMappingURL=personas-sedes-repository-impl.js.map