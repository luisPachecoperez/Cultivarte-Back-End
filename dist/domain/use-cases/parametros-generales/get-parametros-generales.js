"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetParametrosGeneralesUseCaseImpl = void 0;
class GetParametrosGeneralesUseCaseImpl {
    constructor(parametroGeneralRepository) {
        this.parametroGeneralRepository = parametroGeneralRepository;
    }
    execute() {
        return this.parametroGeneralRepository.getAll();
    }
}
exports.GetParametrosGeneralesUseCaseImpl = GetParametrosGeneralesUseCaseImpl;
//# sourceMappingURL=get-parametros-generales.js.map