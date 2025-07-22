import { SesionAsistente, SesionAsistenteRepository } from "../../";

export interface GetSesionesAsistentesUseCase {
    execute(): Promise<SesionAsistente[] | null>;
}

export class GetSesionesAsistentesUseCaseImpl implements GetSesionesAsistentesUseCase {
    constructor(
        private repository: SesionAsistenteRepository 
    ) {}

    async execute(): Promise<SesionAsistente[] | null> {
        return this.repository.getAll();
    }
}