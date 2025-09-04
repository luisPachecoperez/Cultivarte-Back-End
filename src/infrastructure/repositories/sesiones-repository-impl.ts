import { SesionRepository, 
         SesionesDataSource, 
         Sesion, 
         EditarSesiones,
         RespuestaGrap } from "../../domain";

export class SesionesRepositoryImpl implements SesionRepository {
    
    constructor(
        private sesionesDataSource: SesionesDataSource
    ) {}

    async getAll(): Promise<Sesion[] | RespuestaGrap> {
        return this.sesionesDataSource.getAll();
    }

    async getById( id_sesion: string ): Promise<Sesion | RespuestaGrap> {
        return this.sesionesDataSource.getById( id_sesion );
    }

    async getSesionesSede( id_usuario:string, fecha_inicio:string, fecha_fin:string )  : Promise<Sesion[] | RespuestaGrap> {
        return this.sesionesDataSource.getSesionesSede( id_usuario, fecha_inicio, fecha_fin );
    }
    async createSesion( sesion: Sesion ): Promise<RespuestaGrap> {
        return this.sesionesDataSource.createSesion( sesion );
    }

    async updateById( id_sesion: string, sesion: Sesion ): Promise<RespuestaGrap> {
        return this.sesionesDataSource.updateById( id_sesion, sesion );
    }

    async deleteById( id_sesion: string ): Promise<RespuestaGrap> {
        return this.sesionesDataSource.deleteById( id_sesion );
    }

    async updateSesiones( editarSesiones: EditarSesiones ): Promise<RespuestaGrap> {
        return this.sesionesDataSource.updateSesiones( editarSesiones );
    }
    
}
