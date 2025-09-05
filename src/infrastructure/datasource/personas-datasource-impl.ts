import { Persona, PersonaDataSource, PersonaSede, RespuestaGrap } from "../../domain";
import { pgPool } from "../db/pg-pool";
import { personaQueries } from "../db/personas-queries";

    export class PersonaDataSourceImpl implements PersonaDataSource {
    
    private pool = pgPool;
    
    async getAll(): Promise<Persona[] | RespuestaGrap> {
        try {
            const res = await this.pool.query(personaQueries.getAll);
            return res.rows;
        } catch (error) {
            return { exitoso: "N", mensaje: 'No se pudo obtener personas: ' + error };
        }
    }
    
    async getById( id_persona: string ): Promise<Persona | RespuestaGrap> {
        try {
            const res = await this.pool.query(personaQueries.getById, [id_persona]);
            return res.rows[0] || null ;
        } catch (error) {
            return { exitoso: "N", mensaje: 'No se pudo obtener persona: ' + error };
        }
    }
    
    async createPersona( persona: Persona ): Promise<Persona | RespuestaGrap> {
        try {
            const res = await this.pool.query(personaQueries.createPersona, [persona]);
            return res.rows[0] || null;
        } catch (error) {
            return { exitoso: "N", mensaje: 'No se pudo crear persona: ' + error };
        }
    }
    
    async updatePersona( id_persona: string, persona:Persona ): Promise<Persona | RespuestaGrap> {
        try {
            const res = await this.pool.query(personaQueries.updatePersona, [id_persona, persona]);
            return res.rows[0] || null;
        } catch (error) {
            return { exitoso: "N", mensaje: 'No se pudo actualizar persona: ' + error };
        }
    }
    
    async deletePersona( id_persona: string ): Promise<RespuestaGrap> {
        try {
            const res = await this.pool.query(personaQueries.deletePersona, [id_persona]);
            return res.rows[0] || null;
        } catch (error) {
            return { exitoso: "N", mensaje: 'No se pudo eliminar persona: ' + error };
        }
    }
    
    async getAliadosSede(id_usuario: string): Promise<Persona[] | RespuestaGrap> {
        try {
            const res = await this.pool.query(personaQueries.getAliadosSede, [id_usuario]);
            return res.rows || [];
        } catch (error) {
            console.error('Error en getAliadosSede:', error);
            return { exitoso: "N", mensaje: 'No se pudo obtener aliados: ' + error };
        }
    }
    
    async getBeneficiariosSede(): Promise<PersonaSede[] | RespuestaGrap> {
        try {
            const res = await this.pool.query(personaQueries.getBeneficiariosSede);
            return res.rows;
        } catch (error) {
            return { exitoso: "N", mensaje: 'No se pudo obtener beneficiarios: ' + error };
        }
    }
    async getBeneficiarios(): Promise<Persona[] | RespuestaGrap> {
        try {
            const res = await this.pool.query(personaQueries.getBeneficiarios);
            return res.rows;
        } catch (error) {
            return { exitoso: "N", mensaje: 'No se pudo obtener beneficiarios: ' + error };
        }
    }
   
}
