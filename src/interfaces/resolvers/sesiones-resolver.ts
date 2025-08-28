import { Sesion,
         GetSesionUseCaseImpl,
         CreateSesionUseCaseImpl,
         UpdateSesionUseCaseImpl,
         DeleteSesionUseCaseImpl,
         UpdateSesiones,  
         EditarSesiones} from "../../domain";
import { SesionesDataSourceImpl } from "../../infrastructure/datasource/sesiones-datasource-impl";
import { SesionesRepositoryImpl } from "../../infrastructure/repositories/sesiones-repository-impl";
import { GetSesionesUseCaseImpl } from "../../domain/use-cases/sesiones/get-sesiones";
import { SesionesController } from "../../aplication/controller/sesiones-controller";



const dataSource = new SesionesDataSourceImpl();
const repository = new SesionesRepositoryImpl( dataSource );
const useCaseGetById = new GetSesionUseCaseImpl( repository );
const useCaseCreate = new CreateSesionUseCaseImpl( repository );
const useCaseUpdate = new UpdateSesionUseCaseImpl( repository );
const useCaseDelete = new DeleteSesionUseCaseImpl ( repository );
const useCaseGetAll = new GetSesionesUseCaseImpl( repository );
const useCaseUpdateSesiones = new UpdateSesiones( repository );
const controller = new SesionesController( useCaseGetAll, useCaseGetById, useCaseCreate, useCaseUpdate, useCaseDelete, useCaseUpdateSesiones );


export const sesionesResolvers = {
    Query: {
        getSesiones: () => controller.getSesiones(),
        getSesion: (_: any, args: { id_sesion:string }) => controller.getSesion( args.id_sesion )
    },
    Mutation: {
        createSesion: (_: any, args: { input:Sesion }) => controller.createSesion( args.input ),
        updateSesion: (_: any, args: { input:Sesion }) => controller.updateSesion( args.input.id_sesion as string, args.input ),
        deleteSesion: (_: any, args: { id_sesion:string }) => controller.deleteSesion( args.id_sesion ),
        updateSesiones: (_: any, args: { input:EditarSesiones }) => controller.updateSesiones( args.input )
    }
}