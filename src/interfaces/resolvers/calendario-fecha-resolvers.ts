import { CalendarioFechaController } from "../../aplication/controller/calendario-fecha-controller";
import { CalendarioFechaDataSourceImpl } from "../../infrastructure/datasource/calendario-fecha-datasource-impl";
import { CalendarioFechaRepositoryImpl } from "../../infrastructure/repositories/calendario-fecha-repository-impl";
import { GetCalendarioFechaUseCaseImpl } from "../../domain/use-cases/calendario/get-calendario-fecha";


const dataSource = new CalendarioFechaDataSourceImpl();
const repository = new CalendarioFechaRepositoryImpl( dataSource );
const useCaseGetByDate = new GetCalendarioFechaUseCaseImpl( repository );
const controller = new CalendarioFechaController( useCaseGetByDate );


export const calendarioFechaResolvers = {
    Query: {
        consultarFechaCalendario: ( _: any, { input }: any) => controller.getByDate( input )
    }
}