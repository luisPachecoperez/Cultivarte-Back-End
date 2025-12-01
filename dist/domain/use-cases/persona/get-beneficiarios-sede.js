"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetBeneficiariosSedeUseCaseImpl = void 0;
class GetBeneficiariosSedeUseCaseImpl {
    constructor(personasRepository) {
        this.personasRepository = personasRepository;
    }
    async execute() {
        return this.personasRepository.getBenSedes();
    }
}
exports.GetBeneficiariosSedeUseCaseImpl = GetBeneficiariosSedeUseCaseImpl;
//# sourceMappingURL=get-beneficiarios-sede.js.map