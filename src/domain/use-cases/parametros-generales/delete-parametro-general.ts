import { ParametrosGeneralesRepository } from "../../";

export interface DeleteParametroGeneralUseCase {
    execute( id_parametro_general: string ): Promise<boolean>;
}
    
export class DeleteParametroGeneralUseCaseImpl implements DeleteParametroGeneralUseCase {
    
    constructor(
        private readonly parametroGeneralRepository: ParametrosGeneralesRepository
    ) {}

    execute( id_parametro_general: string ): Promise<boolean> {
        return this.parametroGeneralRepository.deleteById( id_parametro_general );
    }
}