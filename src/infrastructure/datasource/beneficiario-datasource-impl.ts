
import { Beneficiario,BeneficiarioDataSource } from "../../domain";
import { pgPool } from "../db/pg-pool";

export class BeneficiarioDataSourceImpl implements BeneficiarioDataSource {

    private pool = pgPool;

    async getAll(): Promise<Beneficiario[]> {
        const result = await this.pool.query( 'SELECT * FROM beneficiarios' );
        return result.rows;
    }

    async getById( id_beneficiario: string ): Promise<Beneficiario | null> {
        const result = await this.pool.query( 'SELECT * FROM beneficiarios WHERE id_beneficiario = $1', [id_beneficiario]);
        return result.rows[0] || null;
    }

    async create( beneficiario: Beneficiario ): Promise<Beneficiario> {
        const query = `
        INSERT INTO beneficiarios (
          id_colegio, nombre, primer_apellido, segundo_apellido,
          fecha_nacimiento, identificacion, genero, ubicacion,
          nombre_acudiente, primer_apellido_acudiente, segundo_apellido_acudiente,
          correo_acudiente, celular_acudiente, habeas_data,
          creado_por, fecha_creacion
        ) VALUES (
          $1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14,$15,NOW()
        ) RETURNING *
      `;
      const values = [
        beneficiario.id_colegio,
        beneficiario.nombre,
        beneficiario.primer_apellido, 
        beneficiario.segundo_apellido,
        beneficiario.fecha_nacimiento, 
        beneficiario.identificacion, 
        beneficiario.genero, 
        beneficiario.ubicacion,
        beneficiario.nombre_acudiente, 
        beneficiario.primer_apellido_acudiente,
        beneficiario.segundo_apellido_acudiente,
        beneficiario.correo_acudiente, 
        beneficiario.celular_acudiente, 
        beneficiario.habeas_data,
         beneficiario.creado_por
      ];
      const result = await this.pool.query( query, values );
      return result.rows[0];
    }

    async updateById( id_beneficiario: string, beneficiario: Beneficiario ): Promise<Beneficiario> {
        const fields = Object.keys(beneficiario);
        const values = Object.values(beneficiario);
    
        const set = fields.map((field, i) => `${field} = $${i + 1}`).join(', ');
        const result = await this.pool.query(
          `UPDATE beneficiarios SET ${set}, fecha_modificacion = NOW() WHERE id_beneficiario = $${fields.length + 1} RETURNING *`,
          [...values, id_beneficiario]
        );
        return result.rows[0];
    }

    async deleteById( id_beneficiario: string ): Promise<boolean> {
        await this.pool.query( 'DELETE FROM beneficiarios WHERE id_beneficiario = $1', [id_beneficiario] );
        return true;
    }
}