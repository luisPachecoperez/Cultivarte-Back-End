"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetActividadesUseCaseImpl = void 0;
class GetActividadesUseCaseImpl {
    constructor(actividadRepository) {
        this.actividadRepository = actividadRepository;
    }
    execute(limit, offset) {
        return this.actividadRepository.getAll(limit, offset);
    }
}
exports.GetActividadesUseCaseImpl = GetActividadesUseCaseImpl;
//# sourceMappingURL=get-actividades.js.map