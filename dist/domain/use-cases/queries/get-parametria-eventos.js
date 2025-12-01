"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetParametriaEventosUseCaseImpl = void 0;
class GetParametriaEventosUseCaseImpl {
    constructor(repository) {
        this.repository = repository;
    }
    async execute() {
        return this.repository.getAll();
    }
}
exports.GetParametriaEventosUseCaseImpl = GetParametriaEventosUseCaseImpl;
//# sourceMappingURL=get-parametria-eventos.js.map