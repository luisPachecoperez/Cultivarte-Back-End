"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateParametroGeneralUseCaseImpl = void 0;
class CreateParametroGeneralUseCaseImpl {
    constructor(repository) {
        this.repository = repository;
    }
    async execute(parametrosGenerales) {
        return this.repository.create(parametrosGenerales);
    }
}
exports.CreateParametroGeneralUseCaseImpl = CreateParametroGeneralUseCaseImpl;
//# sourceMappingURL=create-parametro-general.js.map