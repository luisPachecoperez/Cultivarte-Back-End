import { UsuarioRepository,Usuario } from "../../";

export interface CreateUsuarioUseCase {
    execute( usuario: Usuario ): Promise<Usuario>;
}

export class CreateUsuarioUseCaseImpl implements CreateUsuarioUseCase {
    constructor(
        private usuarioRepository: UsuarioRepository
    ) {}
    
    async execute( usuario: Usuario ): Promise<Usuario> {
        return this.usuarioRepository.create( usuario );
    }
}
