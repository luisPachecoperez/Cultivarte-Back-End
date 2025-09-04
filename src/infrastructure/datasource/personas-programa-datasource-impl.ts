import { pgPool } from './../db/pg-pool';
import { PersonaPrograma, PersonasProgramaDataSource, RespuestaGrap } from "../../domain";
import { personasProgramaQueries } from "../db/personas-programa-queries";

export class PersonasProgramaDataSourceImpl implements PersonasProgramaDataSource {

    private pool = pgPool;

    async getAll(): Promise<PersonaPrograma[] | RespuestaGrap> {
        try {
            const result = await this.pool.query(personasProgramaQueries.getAll);
            return result.rows;
        } catch (error) {
            return {
                exitoso: "N",
                mensaje: 'No se pudo obtener personas: ' + error
            };
        }
    }

    async getById(id_persona_programa: string): Promise<PersonaPrograma | RespuestaGrap> {
        try {
            const result = await this.pool.query(personasProgramaQueries.getById, [id_persona_programa]);
            return result.rows[0] || null;
        } catch (error) {
            return {
                exitoso: "N",
                mensaje: 'No se pudo obtener persona: ' + error
            };
        }
    }
    
    async create(personaPrograma: PersonaPrograma): Promise<RespuestaGrap> {
        try {
            const result = await this.pool.query(personasProgramaQueries.create, [personaPrograma.id_persona_programa, personaPrograma.id_persona, personaPrograma.id_programa]);
            return result.rows[0] || null;
        } catch (error) {
            return {
                exitoso: "N",
                mensaje: 'No se pudo crear persona: ' + error
            };
        }
    }
    
    async updateById(id_persona_programa: string, personaPrograma: PersonaPrograma): Promise<RespuestaGrap> {
        try {
            const result = await this.pool.query(personasProgramaQueries.updateById, [id_persona_programa, personaPrograma.id_persona, personaPrograma.id_programa]);
            return result.rows[0] || null;
        } catch (error) {
            return {
                exitoso: "N",
                mensaje: 'No se pudo actualizar persona: ' + error
            };
        }
    }
    
    async deleteById(id_persona_programa: string): Promise<RespuestaGrap> {
        try {
            const result = await this.pool.query(personasProgramaQueries.deleteById, [id_persona_programa]);
            return result.rows[0] || null;
        } catch (error) {
            return {
                exitoso: "N",
                mensaje: 'No se pudo eliminar persona: ' + error
            };
        }
    }
  

}
