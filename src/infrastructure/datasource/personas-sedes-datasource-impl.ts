import { PersonasSedesDataSource,
         PersonaSede,
         RespuestaGrap } from "../../domain";
import { pgPool } from "../db/pg-pool";
import { personasSedesQueries } from "../db/personas-sedes-queries";

export class PersonasSedesDataSourceImpl implements PersonasSedesDataSource {
 
    private pool = pgPool;

    async getAll(): Promise<PersonaSede[] | RespuestaGrap> {
        try {
            const getAllRes = await this.pool.query( personasSedesQueries.getAll );
            return getAllRes.rows;
        } catch (error) {
            return { exitoso: 'N', mensaje: 'Error al obtener personas sedes: ' + error };
        }
    }           

    async getById( id_sede: string ): Promise<PersonaSede | RespuestaGrap> {
        try {
            const getByIdRes = await this.pool.query(personasSedesQueries.getById, [id_sede]);
           
            return getByIdRes.rows[0] || null;
        } catch (error) {
            return { exitoso: 'N', mensaje: 'Error al obtener persona sede: ' + error };
        }
    }

    async create( personaSede: PersonaSede ): Promise<RespuestaGrap> {
        try {
            const values = [
                personaSede.id_persona,
                personaSede.id_sede,
                personaSede.id_tipo_persona,
            ];
            await this.pool.query(personasSedesQueries.create, values);
            return { exitoso: 'S', mensaje: 'Persona sede creada correctamente' };
        } catch (error) {
            return { exitoso: 'N', mensaje: 'Error al crear persona sede: ' + error };
        }
    }

    async updateById( id_sede: string, personaSede: PersonaSede ): Promise<RespuestaGrap> {
        try {
            const values = [
                personaSede.id_persona,
                personaSede.id_sede,
                personaSede.id_tipo_persona,
                id_sede,
            ];
            await this.pool.query(personasSedesQueries.updateById, values);
            return { exitoso: 'S', mensaje: 'Persona sede actualizada correctamente' };
        } catch (error) {
            return { exitoso: 'N', mensaje: 'Error al actualizar persona sede: ' + error };
        }
    }

    async deleteById( id_sede: string ): Promise<RespuestaGrap> {
        try {
            await this.pool.query(personasSedesQueries.deleteById, [id_sede]);
            return { exitoso: 'S', mensaje: 'Persona sede eliminada correctamente' };
        } catch (error) {
            return { exitoso: 'N', mensaje: 'Error al eliminar persona sede: ' + error };
        }
    }
}