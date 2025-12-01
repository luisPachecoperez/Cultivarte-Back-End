"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DeleteParametroGeneralUseCaseImpl = void 0;
class DeleteParametroGeneralUseCaseImpl {
    constructor(parametroGeneralRepository) {
        this.parametroGeneralRepository = parametroGeneralRepository;
    }
    execute(id_parametro_general) {
        return this.parametroGeneralRepository.deleteById(id_parametro_general);
    }
}
exports.DeleteParametroGeneralUseCaseImpl = DeleteParametroGeneralUseCaseImpl;
//# sourceMappingURL=delete-parametro-general.js.map