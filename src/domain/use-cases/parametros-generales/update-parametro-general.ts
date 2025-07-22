import { ParametrosGenerales, ParametrosGeneralesRepository } from "../../";

export interface UpdateParametroGeneralUseCase {
    execute( id_parametro_general: string, data: ParametrosGenerales ): Promise<ParametrosGenerales>;
}
    
export class UpdateParametroGeneralUseCaseImpl implements UpdateParametroGeneralUseCase {
    constructor(
        private readonly parametroGeneralRepository: ParametrosGeneralesRepository
    ) {}

    execute( id_parametro_general: string, data: ParametrosGenerales ): Promise<ParametrosGenerales> {
        return this.parametroGeneralRepository.updateById( id_parametro_general, data );
    }
}