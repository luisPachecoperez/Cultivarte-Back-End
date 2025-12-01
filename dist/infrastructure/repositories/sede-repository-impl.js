"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SedeRepositoryImpl = void 0;
class SedeRepositoryImpl {
    constructor(sedeDataSource) {
        this.sedeDataSource = sedeDataSource;
    }
    getAll() {
        return this.sedeDataSource.getAll();
    }
    getById(id_sede) {
        return this.sedeDataSource.getById(id_sede);
    }
    create(sede) {
        return this.sedeDataSource.create(sede);
    }
    updateById(id_sede, sede) {
        return this.sedeDataSource.updateById(id_sede, sede);
    }
    deleteById(id_sede) {
        return this.sedeDataSource.deleteById(id_sede);
    }
}
exports.SedeRepositoryImpl = SedeRepositoryImpl;
//# sourceMappingURL=sede-repository-impl.js.map