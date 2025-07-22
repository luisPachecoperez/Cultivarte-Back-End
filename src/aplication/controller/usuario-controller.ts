import { CreateUsuarioUseCase,
         GetUsuarioUseCase,
         GetUsuariosUseCase,
         UpdateUsuarioUseCase,
         DeleteUsuarioUseCase, 
         Usuario} from "../../domain";

export class UsuarioController {
    constructor(
        private createUsuarioUseCase: CreateUsuarioUseCase,
        private getUsuariosUseCase: GetUsuariosUseCase,
        private getUsuarioUseCase: GetUsuarioUseCase,
        private updateUsuarioUseCase: UpdateUsuarioUseCase,
        private deleteUsuarioUseCase: DeleteUsuarioUseCase
    ) {}

    async createUsuario( usuario: Usuario ): Promise<Usuario> {
        return this.createUsuarioUseCase.execute( usuario );
    }

    async getUsuarios(): Promise<Usuario[] | null> {
        return this.getUsuariosUseCase.execute();
    }

    async getUsuario( id_usuario: string ): Promise<Usuario | null> {
        return this.getUsuarioUseCase.execute( id_usuario );
    }

    async updateUsuario( id_usuario: string, usuario: Usuario ): Promise<Usuario> {
        return this.updateUsuarioUseCase.execute( id_usuario, usuario );
    }

    async deleteUsuario( id_usuario: string ): Promise<boolean> {
        return this.deleteUsuarioUseCase.execute( id_usuario );
    }
}