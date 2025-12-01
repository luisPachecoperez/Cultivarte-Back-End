"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateSedeUseCaseImpl = void 0;
class UpdateSedeUseCaseImpl {
    constructor(sedeRepository) {
        this.sedeRepository = sedeRepository;
    }
    execute(id_sede, sede) {
        return this.sedeRepository.updateById(id_sede, sede);
    }
}
exports.UpdateSedeUseCaseImpl = UpdateSedeUseCaseImpl;
//# sourceMappingURL=update-sede.js.map