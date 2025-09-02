import { PersonasSedesDataSource,
         PersonasSede,
         RespuestaGrap, 
         PersonaSede} from "../../domain";
import { pgPool } from "../db/pg-pool";
import { personasSedesQueries } from "../db/personas-sedes-queries";

export class PersonasSedesDataSourceImpl implements PersonasSedesDataSource {
 
    private pool = pgPool;

    async getAll(): Promise<PersonasSede[] | RespuestaGrap> {
        try {
            const getAllRes = await this.pool.query( personasSedesQueries.getAll );
            return getAllRes.rows;
        } catch (error) {
            return { exitoso: 'N', mensaje: 'Error al obtener personas sedes: ' + error };
        }
    }           

    async getById( id_sede: string ): Promise<PersonasSede | RespuestaGrap> {
        try {
            const getByIdRes = await this.pool.query(personasSedesQueries.getById, [id_sede]);
           
            return getByIdRes.rows[0] || null;
        } catch (error) {
            return { exitoso: 'N', mensaje: 'Error al obtener persona sede: ' + error };
        }
    }

    async create( personaSede: PersonasSede ): Promise<RespuestaGrap> {
        try {
            const values = [
                personaSede.id_personas_sede,
                personaSede.id_persona,
                personaSede.id_sede
            ];
            await this.pool.query(personasSedesQueries.create, values);
            return { exitoso: 'S', mensaje: 'Persona sede creada correctamente' };
        } catch (error) {
            return { exitoso: 'N', mensaje: 'Error al crear persona sede: ' + error };
        }
    }

    async updateById( id_personas_sede: string, personaSede: PersonasSede ): Promise<RespuestaGrap> {
        try {
            const values = [
                personaSede.id_personas_sede,
                personaSede.id_persona,
                personaSede.id_sede,
                id_personas_sede,
            ];
            await this.pool.query(personasSedesQueries.updateById, values);
            return { exitoso: 'S', mensaje: 'Persona sede actualizada correctamente' };
        } catch (error) {
            return { exitoso: 'N', mensaje: 'Error al actualizar persona sede: ' + error };
        }
    }

    async deleteById( id_personas_sede: string ): Promise<RespuestaGrap> {
        try {
            await this.pool.query(personasSedesQueries.deleteById, [id_personas_sede]);
            return { exitoso: 'S', mensaje: 'Persona sede eliminada correctamente' };
        } catch (error) {
            return { exitoso: 'N', mensaje: 'Error al eliminar persona sede: ' + error };
        }
    }
}