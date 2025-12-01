"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetParametroGeneralUseCaseImpl = void 0;
class GetParametroGeneralUseCaseImpl {
    constructor(parametroGeneralRepository) {
        this.parametroGeneralRepository = parametroGeneralRepository;
    }
    execute(id_parametro_general) {
        return this.parametroGeneralRepository.getById(id_parametro_general);
    }
}
exports.GetParametroGeneralUseCaseImpl = GetParametroGeneralUseCaseImpl;
//# sourceMappingURL=get-parametro-general.js.map