"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const parametria_eventos_impl_1 = require("../parametria-eventos-impl");
describe('ParametriaEventosRepositoryImpl', () => {
    let repo;
    let mockDataSource;
    beforeEach(() => {
        mockDataSource = {
            getAll: jest.fn(),
        };
        repo = new parametria_eventos_impl_1.ParametriaEventosRepositoryImpl(mockDataSource);
    });
    it('getAll agrupa correctamente los parámetros por grupo', async () => {
        const rows = [
            { grupo: 'A', id: '1', nombre: 'Uno' },
            { grupo: 'A', id: '2', nombre: 'Dos' },
            { grupo: 'B', id: '3', nombre: 'Tres' },
        ];
        mockDataSource.getAll.mockResolvedValue(rows);
        const result = await repo.getAll();
        expect(result).toEqual({
            A: [
                { id: '1', nombre: 'Uno' },
                { id: '2', nombre: 'Dos' },
            ],
            B: [
                { id: '3', nombre: 'Tres' },
            ],
        });
    });
    it('getAll retorna objeto vacío si no hay filas', async () => {
        mockDataSource.getAll.mockResolvedValue([]);
        const result = await repo.getAll();
        expect(result).toEqual({});
    });
});
//# sourceMappingURL=parametria-eventos-impl.spec.js.map