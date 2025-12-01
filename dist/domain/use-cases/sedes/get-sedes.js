"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetSedesUseCaseImpl = void 0;
class GetSedesUseCaseImpl {
    constructor(sedeRepository) {
        this.sedeRepository = sedeRepository;
    }
    execute() {
        return this.sedeRepository.getAll();
    }
}
exports.GetSedesUseCaseImpl = GetSedesUseCaseImpl;
//# sourceMappingURL=get-sedes.js.map