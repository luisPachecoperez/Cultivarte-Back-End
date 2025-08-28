import { ParametriaEventos, 
         ParametriaEventosRepository, 
         ParametroItem,
         ParametriaEventosDataSource } from "../../domain";

export class ParametriaEventosRepositoryImpl implements ParametriaEventosRepository {

    constructor(
        private readonly parametriaEventosDataSource: ParametriaEventosDataSource
    ) {}

    
    async getAll(): Promise<ParametriaEventos> {

        const rows: Array<{ grupo: string; id: string; nombre: string }> =
        await this.parametriaEventosDataSource.getAll();
        const temp: { [key: string]: ParametroItem[] } = {};


        rows.forEach(( row ) => {
          if ( !temp[row.grupo] ) {
            temp[row.grupo] = [];
          }
          temp[row.grupo].push({
            id: row.id,
            nombre: row.nombre
          });
        });

        return temp;
    } 

}