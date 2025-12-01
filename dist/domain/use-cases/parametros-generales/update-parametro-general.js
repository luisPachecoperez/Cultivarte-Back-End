"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateParametroGeneralUseCaseImpl = void 0;
class UpdateParametroGeneralUseCaseImpl {
    constructor(parametroGeneralRepository) {
        this.parametroGeneralRepository = parametroGeneralRepository;
    }
    execute(id_parametro_general, data) {
        return this.parametroGeneralRepository.updateById(id_parametro_general, data);
    }
}
exports.UpdateParametroGeneralUseCaseImpl = UpdateParametroGeneralUseCaseImpl;
//# sourceMappingURL=update-parametro-general.js.map