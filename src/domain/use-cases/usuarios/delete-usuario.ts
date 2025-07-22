import { UsuarioRepository } from "../../";

export interface DeleteUsuarioUseCase {
    execute( id_usuario: string ): Promise<boolean>;
}

export class DeleteUsuarioUseCaseImpl implements DeleteUsuarioUseCase {
    constructor(
        private usuarioRepository: UsuarioRepository
    ) {}
    
    async execute( id_usuario: string ): Promise<boolean> {
        return this.usuarioRepository.deleteById( id_usuario );
    }
}