"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateSedeUseCaseImpl = void 0;
class CreateSedeUseCaseImpl {
    constructor(sedeRepository) {
        this.sedeRepository = sedeRepository;
    }
    execute(sede) {
        return this.sedeRepository.create(sede);
    }
}
exports.CreateSedeUseCaseImpl = CreateSedeUseCaseImpl;
//# sourceMappingURL=create-sede.js.map