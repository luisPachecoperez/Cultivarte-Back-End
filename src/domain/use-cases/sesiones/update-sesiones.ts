import { SesionRepository,
         EditarSesiones, 
         RespuestaGrap } from "../../";

export class UpdateSesiones {

    constructor(
        private readonly sesionRepository: SesionRepository,
    ) {}

    async execute( editarSesiones: EditarSesiones ): Promise<RespuestaGrap> {
        return this.sesionRepository.updateSesiones( editarSesiones );
    }
}