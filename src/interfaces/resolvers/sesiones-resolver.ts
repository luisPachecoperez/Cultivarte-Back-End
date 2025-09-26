import { Sesion,
         GetSesionUseCaseImpl,
         CreateSesionUseCaseImpl,
         UpdateSesionUseCaseImpl,
         DeleteSesionUseCaseImpl,  
         EditarSesiones,
         GetSesionesSedesUseCaseImpl,
         UpdateSesionesUseCaseImpl} from "../../domain";
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
const useCaseGetSesionesSede = new GetSesionesSedesUseCaseImpl( repository );
const useCaseUpdateSesiones = new UpdateSesionesUseCaseImpl( repository );
const controller = new SesionesController( useCaseGetAll,
                                           useCaseGetById,
                                           useCaseGetSesionesSede,
                                           useCaseCreate,
                                           useCaseUpdate,
                                           useCaseDelete,
                                           useCaseUpdateSesiones );


export const sesionesResolvers = {
    Query: {
        getSesiones: (_: any, args: { limit:number, offset:number }) => controller.getSesiones( args.limit, args.offset ),
        getSesion: (_: any, args: { id_sesion:string }) => controller.getSesion( args.id_sesion ),
        getSesionesSedes: (_: any, args: { id_usuario:string, fecha_inicio:string, fecha_fin:string }) => controller.getSesionesSedes( args.id_usuario, args.fecha_inicio, args.fecha_fin )
    },
    Mutation: {
        createSesion: (_: any, args: { input:Sesion }) => controller.createSesion( args.input ),
        updateSesion: (_: any, args: { input:Sesion }) => controller.updateSesion( args.input.id_sesion as string, args.input ),
        deleteSesion: (_: any, args: { id_sesion:string }) => controller.deleteSesion( args.id_sesion ),
        updateSesiones: (_: any, args: { input:EditarSesiones }) => controller.updateSesiones( args.input )
    }
}