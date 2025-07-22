import { UsuarioRepository } from "../../domain/repositories/usuario-repository";
import { Usuario, UsuariosDataSource } from "../../domain";

export class UsuarioRepositoryImpl implements UsuarioRepository {
    constructor(
        private dataSource: UsuariosDataSource
    ) {}
    
    async getAll(): Promise<Usuario[]> {
        return this.dataSource.getAll();
    }
    
    async getById( id_usuario: string ): Promise<Usuario | null> {
        return this.dataSource.getById( id_usuario );
    }
    
    async create( usuario: Usuario ): Promise<Usuario> {
        return this.dataSource.create( usuario );
    }
    
    async updateById( id_usuario: string, usuario: Usuario ): Promise<Usuario> {
        return this.dataSource.updateById( id_usuario, usuario );
    }
    
    async deleteById( id_usuario: string ): Promise<boolean> {
        return this.dataSource.deleteById( id_usuario );
    }
}   