import { Actividad, PreCreateActividad, PreEditActividad, CreateActividadAndSesionesUseCase, GetActividadesUseCase, GetActividadUseCase, GetActividadSedesUseCase, UpdateActividadUseCase, DeleteActividadUseCase, CreateActividadUseCase, RespuestaGrap, GetPreCreateActividadUseCase, GetPreEditActividadUseCase } from '../../domain';
export declare class ActividadesController {
    private readonly getPreCreateActividadUseCase;
    private readonly getPreEditActividadUseCase;
    private readonly getActividadesUseCase;
    private readonly getActividadUseCase;
    private readonly getActividadSedesUseCase;
    private readonly createActividadAndSesionesUseCase;
    private readonly createActividadUseCase;
    private readonly updateActividadUseCase;
    private readonly deleteActividadUseCase;
    constructor(getPreCreateActividadUseCase: GetPreCreateActividadUseCase, getPreEditActividadUseCase: GetPreEditActividadUseCase, getActividadesUseCase: GetActividadesUseCase, getActividadUseCase: GetActividadUseCase, getActividadSedesUseCase: GetActividadSedesUseCase, createActividadAndSesionesUseCase: CreateActividadAndSesionesUseCase, createActividadUseCase: CreateActividadUseCase, updateActividadUseCase: UpdateActividadUseCase, deleteActividadUseCase: DeleteActividadUseCase);
    getPreCreateActividad(id_usuario: string): Promise<PreCreateActividad | RespuestaGrap>;
    getPreEditActividad(id_actividad: string, id_usuario: string): Promise<PreEditActividad | RespuestaGrap>;
    getActividades(limit: number, offset: number): Promise<Actividad[] | RespuestaGrap>;
    getActividad(id_actividad: string): Promise<Actividad | RespuestaGrap>;
    getActividadSedes(id_usuario: string, fecha_inicio: string, fecha_fin: string): Promise<Actividad[] | RespuestaGrap>;
    createActividadAndSesiones(actividad: Actividad): Promise<Actividad | RespuestaGrap>;
    createActividad(actividad: Actividad): Promise<Actividad | RespuestaGrap>;
    updateActividad(id_actividad: string, actividad: Actividad): Promise<Actividad | RespuestaGrap>;
    deleteActividad(id_actividad: string): Promise<RespuestaGrap>;
}
