import { SesionRepository } from "../../domain";
import { SesionDataSource } from "../../domain";
import { Sesion } from "../../domain";

export class SesionRepositoryImpl implements SesionRepository {
    constructor(
        private sesionDataSource: SesionDataSource
    ) {}

    async getAll(): Promise<Sesion[]> {
        return this.sesionDataSource.getAll();
    }

    async getById( id: string ): Promise<Sesion | null> {
        return this.sesionDataSource.getById( id );
    }

    async create( data: Sesion ): Promise<Sesion> {
        return this.sesionDataSource.create( data );
    }

    async updateById( id: string, data: Sesion ): Promise<Sesion> {
        return this.sesionDataSource.updateById( id, data );
    }

    async deleteById( id: string ): Promise<boolean> {
        return this.sesionDataSource.deleteById( id );
    }
}
