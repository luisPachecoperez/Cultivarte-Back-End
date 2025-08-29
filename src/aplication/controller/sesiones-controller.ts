import { RespuestaGrap,
         Sesion,
         GetSesionUseCase,
         GetSesionesUseCase,
         CreateSesionUseCase,
         UpdateSesionUseCase,
         DeleteSesionUseCase,
         EditarSesiones,
         UpdateSesiones } from "../../domain";

export class SesionesController {
    
    constructor(
        private readonly getSesionesUseCase: GetSesionesUseCase,
        private readonly getSesionUseCase: GetSesionUseCase,
        private readonly createSesionUseCase: CreateSesionUseCase,
        private readonly updateSesionUseCase: UpdateSesionUseCase,
        private readonly deleteSesionUseCase: DeleteSesionUseCase,
        private readonly updateSesionesUseCase: UpdateSesiones
    ) {}

    async getSesiones(): Promise<Sesion[]> {
        return this.getSesionesUseCase.execute();
    }

    async getSesion( id_sesion: string ): Promise<Sesion | null> {
        return this.getSesionUseCase.execute( id_sesion );
    }

    async createSesion( sesion: Sesion ): Promise<Sesion> {
        return this.createSesionUseCase.execute( sesion );
    }

    async updateSesion( id_sesion: string, sesion: Sesion ): Promise<RespuestaGrap> {
        return this.updateSesionUseCase.execute( id_sesion, sesion );
    }

    async deleteSesion( id_sesion: string ): Promise<boolean> {
        return this.deleteSesionUseCase.execute( id_sesion );
    }

    async updateSesiones( data: EditarSesiones ): Promise<RespuestaGrap> {
        return this.updateSesionesUseCase.execute(data);
    }
}