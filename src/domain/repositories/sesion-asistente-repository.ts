import { SesionAsistente } from "../";

export interface SesionAsistenteRepository {
    create( sesionAsistente: SesionAsistente ): Promise<SesionAsistente>;
    getById( id_sesion_asistente: string ): Promise<SesionAsistente | null>;
    getAll(): Promise<SesionAsistente[] | null>;
    updateById( id_sesion_asistente: string, sesionAsistente: SesionAsistente ): Promise<SesionAsistente>;
    deleteById( id_sesion_asistente: string ): Promise<boolean>;
}