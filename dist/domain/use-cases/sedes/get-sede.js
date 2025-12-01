"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetSedeUseCaseImpl = void 0;
class GetSedeUseCaseImpl {
    constructor(sedeRepository) {
        this.sedeRepository = sedeRepository;
    }
    execute(id_sede) {
        return this.sedeRepository.getById(id_sede);
    }
}
exports.GetSedeUseCaseImpl = GetSedeUseCaseImpl;
//# sourceMappingURL=get-sede.js.map