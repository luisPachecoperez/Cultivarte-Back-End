import { RespuestaGrap,PersonaSede} from "../";


export interface PersonasSedesDataSource {
    getAll(): Promise<PersonaSede[] | RespuestaGrap>;
    getById( id_sede: string ): Promise<PersonaSede | RespuestaGrap>;
    create( personaSede: PersonaSede ): Promise<RespuestaGrap>;
    updateById( id_sede: string, personaSede: PersonaSede ): Promise<RespuestaGrap>;
    deleteById( id_sede: string ): Promise<RespuestaGrap>;
}