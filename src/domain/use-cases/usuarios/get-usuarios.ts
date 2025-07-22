import { UsuarioRepository,Usuario } from "../../";

export interface GetUsuariosUseCase {
    execute(): Promise<Usuario[]>;
}

export class GetUsuariosUseCaseImpl implements GetUsuariosUseCase {
    constructor(
        private usuarioRepository: UsuarioRepository
    ) {}
    
    async execute(): Promise<Usuario[]> {
        return this.usuarioRepository.getAll();
    }
}