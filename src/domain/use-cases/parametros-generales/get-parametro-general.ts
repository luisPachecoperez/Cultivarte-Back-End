import { ParametrosGenerales, ParametrosGeneralesRepository } from "../../";

export interface GetParametroGeneralUseCase {
    execute( id_parametro_general: string ): Promise<ParametrosGenerales | null>;
}
    
export class GetParametroGeneralUseCaseImpl implements GetParametroGeneralUseCase {
    constructor(
        private readonly parametroGeneralRepository: ParametrosGeneralesRepository
    ) {}

    execute( id_parametro_general: string ): Promise<ParametrosGenerales | null> {
        return this.parametroGeneralRepository.getById( id_parametro_general );
    }
}