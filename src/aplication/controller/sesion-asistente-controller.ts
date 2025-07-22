import { SesionAsistente,
         GetSesionAsistenteUseCase,
         GetSesionesAsistentesUseCase,
         UpdateSesionAsistenteUseCase,
         DeleteSesionAsistenteUseCase,
         CreateSesionAsistenteUseCase } from "../../domain";

export class SesionAsistenteController {
    constructor(
        private createSesionAsistenteUseCase: CreateSesionAsistenteUseCase,
        private getSesionesAsistentesUseCase: GetSesionesAsistentesUseCase,
        private getSesionAsistenteUseCase: GetSesionAsistenteUseCase,
        private updateSesionAsistenteUseCase: UpdateSesionAsistenteUseCase,
        private deleteSesionAsistenteUseCase: DeleteSesionAsistenteUseCase
    ) {}

    async createSesionAsistente( sesionAsistente: SesionAsistente ): Promise<SesionAsistente> {
        return this.createSesionAsistenteUseCase.execute( sesionAsistente );
    }

    async getSesionesAsistentes(): Promise<SesionAsistente[] | null> {
        return this.getSesionesAsistentesUseCase.execute();
    }

    async getSesionAsistente( id_sesion_asistente: string ): Promise<SesionAsistente | null> {
        return this.getSesionAsistenteUseCase.execute( id_sesion_asistente );
    }

    async updateSesionAsistente( id_sesion_asistente: string, sesionAsistente: SesionAsistente ): Promise<SesionAsistente> {
        return this.updateSesionAsistenteUseCase.execute( id_sesion_asistente, sesionAsistente );
    }

    async deleteSesionAsistente( id_sesion_asistente: string ): Promise<boolean> {
        return this.deleteSesionAsistenteUseCase.execute( id_sesion_asistente );
    }
}