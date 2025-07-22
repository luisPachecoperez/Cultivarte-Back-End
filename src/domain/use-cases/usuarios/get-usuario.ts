import { UsuarioRepository,Usuario } from "../../";

export interface GetUsuarioUseCase {
    execute( id_usuario: string ): Promise<Usuario | null>;
}   

export class GetUsuarioUseCaseImpl implements GetUsuarioUseCase {
    constructor(
        private usuarioRepository: UsuarioRepository
    ) {}
    
    async execute( id_usuario: string ): Promise<Usuario | null> {
        return this.usuarioRepository.getById( id_usuario );
    }
}