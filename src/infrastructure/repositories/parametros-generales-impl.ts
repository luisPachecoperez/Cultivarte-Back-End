import { ParametrosGenerales, } from "../../domain";
import {  ParametrosGeneralesRepository } from "../../domain";
import { ParametrosGeneralesDataSource } from "../../domain";

export class ParametrosGeneralesRepositoryImpl implements ParametrosGeneralesRepository {
    
    constructor(
        private parametrosGeneralesDataSource: ParametrosGeneralesDataSource
    ) {}

    async getAll(): Promise<ParametrosGenerales[]> {
        return this.parametrosGeneralesDataSource.getAll();
    }

    async getById( id_parametro_general: string): Promise<ParametrosGenerales | null> {
        return this.parametrosGeneralesDataSource.getById(id_parametro_general);
    }

    async create( data: ParametrosGenerales ): Promise<ParametrosGenerales> {
        return this.parametrosGeneralesDataSource.create(data);
    }

    async updateById( id_parametro_general: string, data: ParametrosGenerales ): Promise<ParametrosGenerales> {
        return this.parametrosGeneralesDataSource.updateById(id_parametro_general, data);
    }

    async deleteById( id_parametro_general: string ): Promise<boolean> {
        return this.parametrosGeneralesDataSource.deleteById(id_parametro_general);
    }
}
    