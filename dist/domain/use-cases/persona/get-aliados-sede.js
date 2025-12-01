"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetAliadosSedeUseCaseImpl = void 0;
class GetAliadosSedeUseCaseImpl {
    constructor(personasRepository) {
        this.personasRepository = personasRepository;
    }
    async execute(id_usuario) {
        try {
            const result = await this.personasRepository.getAliadosSede(id_usuario);
            return Array.isArray(result) ? result : [];
        }
        catch (error) {
            console.error('Error en GetAliadosSedeUseCase:', error);
            return [];
        }
    }
}
exports.GetAliadosSedeUseCaseImpl = GetAliadosSedeUseCaseImpl;
//# sourceMappingURL=get-aliados-sede.js.map