
import { GetActividadesUseCaseImpl,
         PreCreateActividadUseCaseImpl,
         DeleteActividadUseCaseImpl,
         UpdateActividadUseCaseImpl,
         CreateActividadUseCaseImpl,
         GetActividadUseCaseImpl,
         Actividad, 
         CreateActividadAndSesionesUseCaseImpl,
         PreEditActividadUseCaseImpl} from "../../domain";
import { ActividadesController } from "../../aplication/controller/actividades-controller";
import { ActividadRepositoryImpl } from "../../infrastructure/repositories/actividad-repository-impl";
import { ActividadDataSourceImpl } from "../../infrastructure/datasource/actividad-datasource-impl";
import { ParametroDetalleRepositoryImpl } from "../../infrastructure/repositories/parametro-detalle-repository-impl";
import { ParametroDetalleDataSourceImpl } from "../../infrastructure/datasource/parametro-detalle-datasource-impl";

const parametroDetalleDataSource = new ParametroDetalleDataSourceImpl();
const actividadDataSource = new ActividadDataSourceImpl();
const actividadRepository = new ActividadRepositoryImpl( actividadDataSource );
const parametroDetalleRepository = new ParametroDetalleRepositoryImpl( parametroDetalleDataSource );
const useCaseGetAll = new GetActividadesUseCaseImpl( actividadRepository );
const useCaseGetById = new GetActividadUseCaseImpl( actividadRepository );
const useCaseCreateAndSesiones = new CreateActividadAndSesionesUseCaseImpl( actividadRepository, parametroDetalleRepository );
const useCaseCreate = new CreateActividadUseCaseImpl( actividadRepository );
const useCaseUpdate = new UpdateActividadUseCaseImpl( actividadRepository );
const useCaseDelete = new DeleteActividadUseCaseImpl ( actividadRepository );
const useCasePreCreate = new PreCreateActividadUseCaseImpl( actividadRepository );
const useCasePreEdit = new PreEditActividadUseCaseImpl( actividadRepository );
const controller = new ActividadesController( useCasePreCreate,
                                              useCasePreEdit,
                                              useCaseCreateAndSesiones,
                                              useCaseCreate,
                                              useCaseGetAll,
                                              useCaseGetById,
                                              useCaseUpdate,
                                              useCaseDelete );


export const actividadesResolvers = {
  Query: {
    getActividades: () => controller.getActividades(),
    getActividad: (_: any, args: { id:string }) => controller.getActividad( args.id ), 
    getPreCreateActividad: (_: any, args: { id_usuario:string }) => controller.preCreateActividad( args.id_usuario ),
    getPreEditActividad: (_: any, args: { id_actividad:string, id_usuario:string }) => controller.preEditActividad( args.id_actividad, args.id_usuario )

  },
  Mutation: {
    createActividadAndSesiones: (_: any, args: { data:Actividad }) => controller.createActividadAndSesiones( args.data ),
    createActividad: (_: any, args: { data:Actividad }) => controller.createActividad( args.data ),
    updateActividad: (_: any, args: { id:string, data:Actividad }) => controller.updateActividad( args.id, args.data ),
    deleteActividad: (_: any, args: { id:string }) => controller.deleteActividad( args.id )
  }
}