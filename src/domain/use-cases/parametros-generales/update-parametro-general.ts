import { ParametrosGenerales, ParametrosGeneralesRepository, RespuestaGrap } from "../../";

export interface UpdateParametroGeneralUseCase {
    execute( id_parametro_general: string, data: ParametrosGenerales ): Promise<RespuestaGrap>;
}
    
export class UpdateParametroGeneralUseCaseImpl implements UpdateParametroGeneralUseCase {
    
    constructor(
        private readonly parametroGeneralRepository: ParametrosGeneralesRepository
    ) {}

    execute( id_parametro_general: string, data: ParametrosGenerales ): Promise<RespuestaGrap> {
        return this.parametroGeneralRepository.updateById( id_parametro_general, data );
    }
}