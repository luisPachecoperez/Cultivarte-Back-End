import { ParametroDetalle } from "../";

export interface ParametroDetalleRepository {
    getAll(): Promise<ParametroDetalle[]>
    getById( id_parametro_detalle: string ): Promise<ParametroDetalle | null>
    create( parametroDetalle: ParametroDetalle ): Promise<ParametroDetalle>
    updateById( id_parametro_detalle: string, parametroDetalle: ParametroDetalle ): Promise<ParametroDetalle>
    deleteById( id_parametro_detalle: string ): Promise<boolean>
}