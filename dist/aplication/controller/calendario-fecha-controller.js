"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CalendarioFechaController = void 0;
class CalendarioFechaController {
    constructor(calendarioFechaUseCase) {
        this.calendarioFechaUseCase = calendarioFechaUseCase;
    }
    async getByDate(calendarioInput) {
        return this.calendarioFechaUseCase.execute(calendarioInput);
    }
}
exports.CalendarioFechaController = CalendarioFechaController;
//# sourceMappingURL=calendario-fecha-controller.js.map