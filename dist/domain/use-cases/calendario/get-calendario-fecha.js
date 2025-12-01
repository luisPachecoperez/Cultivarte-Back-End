"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetCalendarioFechaUseCaseImpl = void 0;
class GetCalendarioFechaUseCaseImpl {
    constructor(calendarioFechaRepository) {
        this.calendarioFechaRepository = calendarioFechaRepository;
    }
    execute(calendarioInput) {
        return this.calendarioFechaRepository.getByDate(calendarioInput);
    }
}
exports.GetCalendarioFechaUseCaseImpl = GetCalendarioFechaUseCaseImpl;
//# sourceMappingURL=get-calendario-fecha.js.map