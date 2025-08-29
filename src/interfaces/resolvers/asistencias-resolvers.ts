import {Asistencia, 
        GetAsistenciasUseCaseImpl,
        GetAsistenciaUseCaseImpl,
        CreateAsistenciaUseCaseImpl,
        UpdateAsistenciaUseCaseImpl,
        DeleteAsistenciaUseCaseImpl,
        GetPreAsistenciaUseCaseImpl } from "../../domain";
import { AsistenciasController } from './../../aplication/controller/asistencia-controller';
import { AsistenciaDataSourceImpl } from "../../infrastructure/datasource/asistencias-datasource-impl";
import { AsistenciaRepositoryImpl } from "../../infrastructure/repositories/asistencia-respository-impl";

const datasource = new AsistenciaDataSourceImpl();
const repository = new AsistenciaRepositoryImpl( datasource );
const useCaseGetAll = new GetAsistenciasUseCaseImpl( repository );
const useCaseGetById = new GetAsistenciaUseCaseImpl( repository );
const useCaseCreate = new CreateAsistenciaUseCaseImpl( repository );
const useCaseUpdate = new UpdateAsistenciaUseCaseImpl( repository );
const useCaseDelete = new DeleteAsistenciaUseCaseImpl ( repository );
const useCaseGetPreAsistencia = new GetPreAsistenciaUseCaseImpl( repository );
const controller = new AsistenciasController( useCaseGetAll, useCaseGetById, useCaseCreate, useCaseUpdate, useCaseDelete, useCaseGetPreAsistencia );

export const asistenciasResolvers = {
    Query: {
        getAsistencias: () => controller.getAsistencias(),
        getAsistencia: (_: any, args: { id:string }) => controller.getAsistencia(args.id),
        getPreAsistencia: (_: any, args: { id_actividad:string, id_sesion:string }) => controller.getPreAsistencia( args.id_sesion),
    },
    Mutation: {
        createAsistencia: (_: any, args: { data:Asistencia }) => controller.createAsistencia(args.data),
        updateAsistencia: (_: any, args: { id:string, data:Asistencia }) => controller.updateAsistencia(args.id, args.data),
        deleteAsistencia: (_: any, args: { id:string }) => controller.deleteAsistencia(args.id),
    },
}