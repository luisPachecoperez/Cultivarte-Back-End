import { ParametroDetalleRepository } from "../../";

export interface DeleteParametroDetalleUseCase {
    execute( id_parametro_detalle: string ): Promise<boolean>;
}
    
export class DeleteParametroDetalleUseCaseImpl implements DeleteParametroDetalleUseCase {
    
    constructor(
        private readonly parametroDetalleRepository: ParametroDetalleRepository
    ) {}

    execute( id_parametro_detalle: string ): Promise<boolean> {
        return this.parametroDetalleRepository.deleteById( id_parametro_detalle );
    }
}   