import { Sesion, 
         CreateSesionUseCase,
         DeleteSesionUseCase,
         GetSesionUseCase,
         GetSesionesUseCase,
         UpdateSesionUseCase } from "../../domain";

export class SesionController {
    constructor(
        private createSesionUseCase: CreateSesionUseCase,
        private getSesionesUseCase: GetSesionesUseCase,
        private getSesionUseCase: GetSesionUseCase,
        private updateSesionUseCase: UpdateSesionUseCase,
        private deleteSesionUseCase: DeleteSesionUseCase
    ) {}

    async createSesion( sesion: Sesion ): Promise<Sesion> {
        return this.createSesionUseCase.execute( sesion );
    }

    async getSesiones(): Promise<Sesion[] | null> {
        return this.getSesionesUseCase.execute();
    }

    async getSesion( id_sesion: string ): Promise<Sesion | null> {
        return this.getSesionUseCase.execute( id_sesion );
    }

    async updateSesion( id_sesion: string, sesion: Sesion ): Promise<Sesion> {
        return this.updateSesionUseCase.execute( id_sesion, sesion );
    }

    async deleteSesion( id_sesion: string ): Promise<boolean> {
        return this.deleteSesionUseCase.execute( id_sesion );
    }
}