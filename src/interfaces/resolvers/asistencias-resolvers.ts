import {Asistencia, 
        AsistenciaSesiones,
        GetAsistenciasUseCaseImpl,
        GetAsistenciaUseCaseImpl,
        CreateAsistenciaUseCaseImpl,
        UpdateAsistenciaUseCaseImpl,
        DeleteAsistenciaUseCaseImpl,
        UpdateAsistenciasUseCaseImpl,
        GetPreAsistenciaUseCaseImpl,
        GetAsistenciasSedeUseCaseImpl } from "../../domain";
import { AsistenciasController } from './../../aplication/controller/asistencia-controller';
import { AsistenciaDataSourceImpl } from "../../infrastructure/datasource/asistencias-datasource-impl";
import { AsistenciaRepositoryImpl } from "../../infrastructure/repositories/asistencia-respository-impl";

const datasource = new AsistenciaDataSourceImpl();
const repository = new AsistenciaRepositoryImpl( datasource );
const getAsistenciasUseCase = new GetAsistenciasUseCaseImpl( repository );
const getAsistenciaUseCase = new GetAsistenciaUseCaseImpl( repository );
const getAsistenciasSedeUseCase = new GetAsistenciasSedeUseCaseImpl( repository );
const createAsistenciaUseCase = new CreateAsistenciaUseCaseImpl( repository );
const updateAsistenciaUseCase = new UpdateAsistenciaUseCaseImpl( repository );
const updateAsistenciasUseCase = new UpdateAsistenciasUseCaseImpl( repository );
const deleteAsistenciaUseCase = new DeleteAsistenciaUseCaseImpl ( repository );
const getPreAsistenciaUseCase = new GetPreAsistenciaUseCaseImpl( repository );
const controller = new AsistenciasController( getAsistenciasUseCase, 
                                              getAsistenciaUseCase, 
                                              getAsistenciasSedeUseCase,
                                              getPreAsistenciaUseCase,
                                              createAsistenciaUseCase, 
                                              updateAsistenciaUseCase,  
                                              updateAsistenciasUseCase,
                                              deleteAsistenciaUseCase );

export const asistenciasResolvers = {
    Query: {
        getAsistencias: () => controller.getAsistencias(),
        getAsistencia: (_: any, args: { id:string }) => controller.getAsistencia(args.id),
        getPreAsistencia: (_: any, args: { id_sesion:string }) => controller.getPreAsistencia( args.id_sesion),
        getAsistenciasSede: (_: any, args: { id_usuario:string, fecha_inicio:string, fecha_fin:string }) => controller.getAsistenciasSede( args.id_usuario, args.fecha_inicio, args.fecha_fin ),
    },
    Mutation: {
        createAsistencia: (_: any, args: { data:Asistencia }) => controller.createAsistencia(args.data),
        updateAsistencia: (_: any, args: { id:string, data:Asistencia }) => controller.updateAsistencia(args.id, args.data),
        deleteAsistencia: (_: any, args: { id:string }) => controller.deleteAsistencia(args.id),
        updateAsistencias: (_: any, args: { input:AsistenciaSesiones }) => controller.updateAsistencias(args.input),
    },
}