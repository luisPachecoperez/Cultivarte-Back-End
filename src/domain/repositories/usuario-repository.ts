import { Usuario } from "../";

export interface UsuarioRepository {
    getAll(): Promise<Usuario[]>
    getById( id_usuario: string ): Promise<Usuario | null>
    create( usuario: Usuario ): Promise<Usuario>
    updateById( id_usuario: string, usuario: Usuario ): Promise<Usuario >
    deleteById( id_usuario: string ): Promise<boolean>
}