import { ParametrosGenerales } from "../";

export interface ParametrosGeneralesRepository {
    getAll(): Promise<ParametrosGenerales[]>;
    getById( id_parametro_general: string ): Promise<ParametrosGenerales | null>;
    create( parametrosGenerales: ParametrosGenerales ): Promise<ParametrosGenerales>;
    updateById( id_parametro_general: string, parametrosGenerales: ParametrosGenerales ): Promise<ParametrosGenerales>;
    deleteById( id_parametro_general: string ): Promise<boolean>;
}