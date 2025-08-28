import { SesionRepository,EditarSesiones} from "../../";

export class UpdateSesiones {

    constructor(
        private readonly sesionRepository: SesionRepository,
    ) {}

    async execute( editarSesiones: EditarSesiones ): Promise<boolean> {
        return this.sesionRepository.updateSesiones( editarSesiones );
    }
}