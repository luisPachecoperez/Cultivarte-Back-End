"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const calendario_fecha_repository_impl_1 = require("../calendario-fecha-repository-impl");
describe('CalendarioFechaRepositoryImpl', () => {
    let repo;
    let mockDataSource;
    beforeEach(() => {
        mockDataSource = {
            getByDate: jest.fn().mockResolvedValue('result'),
        };
        repo = new calendario_fecha_repository_impl_1.CalendarioFechaRepositoryImpl(mockDataSource);
    });
    it('getByDate retorna resultado del datasource', async () => {
        const input = { fecha: '2023-01-01' };
        const result = await repo.getByDate(input);
        expect(result).toBe('result');
        expect(mockDataSource.getByDate).toHaveBeenCalledWith(input);
    });
});
//# sourceMappingURL=calendario-fecha-repository-impl.spec.js.map