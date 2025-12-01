import { GetSedesUseCase, GetSedeUseCase, UpdateSedeUseCase, DeleteSedeUseCase, CreateSedeUseCase, RespuestaGrap, Sede } from '../../domain';
export declare class SedesController {
    private readonly getSedesUseCase;
    private readonly getSedeUseCase;
    private readonly createSedeUseCase;
    private readonly updateSedeUseCase;
    private readonly deleteSedeUseCase;
    constructor(getSedesUseCase: GetSedesUseCase, getSedeUseCase: GetSedeUseCase, createSedeUseCase: CreateSedeUseCase, updateSedeUseCase: UpdateSedeUseCase, deleteSedeUseCase: DeleteSedeUseCase);
    getAll(): Promise<Sede[] | RespuestaGrap>;
    getById(id_sede: string): Promise<Sede | RespuestaGrap>;
    create(sede: Sede): Promise<Sede | RespuestaGrap>;
    update(id_sede: string, sede: Sede): Promise<Sede | RespuestaGrap>;
    delete(id_sede: string): Promise<RespuestaGrap>;
}
