"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DeleteSedeUseCaseImpl = void 0;
class DeleteSedeUseCaseImpl {
    constructor(sedeRepository) {
        this.sedeRepository = sedeRepository;
    }
    execute(id_sede) {
        return this.sedeRepository.deleteById(id_sede);
    }
}
exports.DeleteSedeUseCaseImpl = DeleteSedeUseCaseImpl;
//# sourceMappingURL=delete-sede.js.map