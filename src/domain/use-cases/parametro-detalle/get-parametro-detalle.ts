import { ParametroDetalle, ParametroDetalleRepository } from "../../";

export interface GetParametroDetalleUseCase {
    execute( id_parametro_detalle: string ): Promise<ParametroDetalle | null>;
}
    
export class GetParametroDetalleUseCaseImpl implements GetParametroDetalleUseCase {
    
    constructor(
        private readonly parametroDetalleRepository: ParametroDetalleRepository
    ) {}

    execute( id_parametro_detalle: string ): Promise<ParametroDetalle | null> {
        return this.parametroDetalleRepository.getById( id_parametro_detalle );
    }
}