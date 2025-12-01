import { Poblacion, CreatePoblacionUseCase, UpdatePoblacionUseCase, DeletePoblacionUseCase, GetPoblacionUseCase, GetPoblacionesUseCase, RespuestaGrap } from '../../domain';
export declare class PoblacionesController {
    private readonly getPoblacionesUseCase;
    private readonly getPoblacionUseCase;
    private readonly createPoblacionUseCase;
    private readonly updatePoblacionUseCase;
    private readonly deletePoblacionUseCase;
    constructor(getPoblacionesUseCase: GetPoblacionesUseCase, getPoblacionUseCase: GetPoblacionUseCase, createPoblacionUseCase: CreatePoblacionUseCase, updatePoblacionUseCase: UpdatePoblacionUseCase, deletePoblacionUseCase: DeletePoblacionUseCase);
    getPoblaciones(): Promise<Poblacion[] | RespuestaGrap>;
    getPoblacion(id_poblacion: string): Promise<Poblacion | RespuestaGrap>;
    createPoblacion(poblacion: Poblacion): Promise<Poblacion | RespuestaGrap>;
    updatePoblacion(id_poblacion: string, poblacion: Poblacion): Promise<Poblacion | RespuestaGrap>;
    deletePoblacion(id_poblacion: string): Promise<RespuestaGrap>;
}
