import { UsuariosDataSource } from './../../domain/datasources/usuarios-datasource';
import { pgPool } from "../db/pg-pool";
import { Usuario,  } from "../../domain";


export class UsuarioDataSourceImpl implements UsuariosDataSource {

    private pool = pgPool;
    
    async getAll(): Promise<Usuario[]> {
        const result = await this.pool.query( 'SELECT * FROM usuarios' );
        return result.rows;
    }
    
    async getById( id_usuario: string ): Promise<Usuario | null> {
        const result = await this.pool.query( 'SELECT * FROM usuarios WHERE id_usuario = $1', [id_usuario] );
        return result.rows[0] || null;
    }
    
    async create( usuario: Usuario ): Promise<Usuario> {
        const query = `
        INSERT INTO usuarios (
          id_usuario, id_sede, id_role,
          correo, creado_por, fecha_creacion
        ) VALUES (
          $1,$2,$3,$4,$5,NOW()
        ) RETURNING *
      `;
      const values = [
        usuario.id_usuario,
        usuario.id_sede,
        usuario.id_role,
        usuario.correo,
        usuario.creado_por
      ];
      const result = await this.pool.query( query, values );
      return result.rows[0];
    }
    
    async updateById( id_usuario: string, usuario: Usuario ): Promise<Usuario> {
        const fields = Object.keys(usuario);
        const values = Object.values(usuario);
    
        const set = fields.map((field, i) => `${field} = $${i + 1}`).join(', ');
        const result = await this.pool.query(   
          `UPDATE usuarios SET ${set}, fecha_modificacion = NOW() WHERE id_usuario = $${fields.length + 1} RETURNING *`,
          [...values, id_usuario]
        );
        return result.rows[0];
    }
    
    async deleteById( id_usuario: string ): Promise<boolean> {
        await this.pool.query( 'DELETE FROM usuarios WHERE id_usuario = $1', [id_usuario] );
        return true;
    }
}