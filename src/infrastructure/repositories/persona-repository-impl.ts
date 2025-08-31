
import { PersonaRepository,
         Persona,
         RespuestaGrap,
         PersonaDataSource, 
         PersonaSede} from "../../domain";

export class PersonaRepositoryImpl implements PersonaRepository {
    constructor( private personaDataSource:PersonaDataSource ) { } 
    
    async getAll(): Promise<Persona[] | RespuestaGrap> {
        try {
            const result = await this.personaDataSource.getAll();
            return Array.isArray(result) ? result : [];
        } catch (error) {
            console.error('Error en getAll:', error);
            return { exitoso: "N", mensaje: 'No se pudo obtener personas: ' + error };
        }
    }

    async getById(id_persona: string): Promise<Persona | RespuestaGrap> {
        try {
            const result = await this.personaDataSource.getById(id_persona);
            return result;
        } catch (error) {
            console.error('Error en getById:', error);
            return { exitoso: "N", mensaje: 'No se pudo obtener persona: ' + error };
        }
    }

    async getAliadosSede(id_usuario: string): Promise<Persona[] | RespuestaGrap> {
        try {
            const result = await this.personaDataSource.getAliadosSede(id_usuario);
            return Array.isArray(result) ? result : [];
        } catch (error) {
            console.error('Error en getAliadosSede:', error);
            return { exitoso: "N", mensaje: 'No se pudo obtener aliados: ' + error };
        }
    }
    
    async getBeneficiariosSede(): Promise<PersonaSede[] | RespuestaGrap> {
        try {
            const result = await this.personaDataSource.getBeneficiariosSede();
            return Array.isArray(result) ? result : [];
        } catch (error) {
            console.error('Error en getBeneficiariosSede:', error);
            return { exitoso: "N", mensaje: 'No se pudo obtener beneficiarios: ' + error };
        }
    }
    
    async createPersona(persona: Persona): Promise<Persona | RespuestaGrap> {
        try {
            const result = await this.personaDataSource.createPersona(persona);
            return result;
        } catch (error) {
            console.error('Error en createPersona:', error);
            return { exitoso: "N", mensaje: 'No se pudo crear persona: ' + error };
        }
    }
    
    async updatePersona(id_persona: string, persona: Persona): Promise<Persona | RespuestaGrap> {
        try {
            const result = await this.personaDataSource.updatePersona(id_persona, persona);
            return result;
        } catch (error) {
            console.error('Error en updatePersona:', error);
            return { exitoso: "N", mensaje: 'No se pudo actualizar persona: ' + error };
        }
    }
    
    async deletePersona(id_persona: string): Promise<RespuestaGrap> {
        try {
            const result = await this.personaDataSource.deletePersona(id_persona);
            return result;
        } catch (error) {
            console.error('Error en deletePersona:', error);
            return { exitoso: "N", mensaje: 'No se pudo eliminar persona: ' + error };
        }
    }
}