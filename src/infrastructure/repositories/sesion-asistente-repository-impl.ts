import { SesionAsistente } from "../../domain";
import { SesionAsistenteDataSource } from "../../domain";
import { SesionAsistenteRepository } from "../../domain";

export class SesionAsistenteRepositoryImpl implements SesionAsistenteRepository {
    
    constructor( 
        private sesionAsistenteDataSource: SesionAsistenteDataSource 
    ) {}
    
    async getAll(): Promise<SesionAsistente[] | null> {
        return this.sesionAsistenteDataSource.getAll();
    }
    
    async getById( id_sesion_asistente: string ): Promise<SesionAsistente | null> {
        return this.sesionAsistenteDataSource.getById(id_sesion_asistente);
    }
    
    async create( sesionAsistente: SesionAsistente ): Promise<SesionAsistente> {
        return this.sesionAsistenteDataSource.create(sesionAsistente);
    }
    
    async updateById( id_sesion_asistente: string, sesionAsistente: SesionAsistente ): Promise<SesionAsistente> {
        return this.sesionAsistenteDataSource.updateById(id_sesion_asistente, sesionAsistente);
    }
    
    async deleteById( id_sesion_asistente: string ): Promise<boolean> {
        return this.sesionAsistenteDataSource.deleteById(id_sesion_asistente);
    }
}