"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CalendarioFechaRepositoryImpl = void 0;
class CalendarioFechaRepositoryImpl {
    constructor(calendarioFechaDataSource) {
        this.calendarioFechaDataSource = calendarioFechaDataSource;
    }
    getByDate(calendarioInput) {
        return this.calendarioFechaDataSource.getByDate(calendarioInput);
    }
}
exports.CalendarioFechaRepositoryImpl = CalendarioFechaRepositoryImpl;
//# sourceMappingURL=calendario-fecha-repository-impl.js.map