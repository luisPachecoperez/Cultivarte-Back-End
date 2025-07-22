import { UsuarioRepository,Usuario } from "../../";

export interface UpdateUsuarioUseCase {
    execute( id_usuario: string, usuario: Usuario ): Promise<Usuario>;
}   

export class UpdateUsuarioUseCaseImpl implements UpdateUsuarioUseCase {
    constructor(
        private usuarioRepository: UsuarioRepository
    ) {}
    
    async execute( id_usuario: string, usuario: Usuario ): Promise<Usuario> {
        return this.usuarioRepository.updateById( id_usuario, usuario );
    }
}