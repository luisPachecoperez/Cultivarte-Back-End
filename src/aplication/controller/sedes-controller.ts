import {
  GetSedesUseCase,
  GetSedeUseCase,
  UpdateSedeUseCase,
  DeleteSedeUseCase,
  CreateSedeUseCase,
  RespuestaGrap,
  Sede,
} from '../../domain';

export class SedesController {
  constructor(
    private readonly getSedesUseCase: GetSedesUseCase,
    private readonly getSedeUseCase: GetSedeUseCase,
    private readonly createSedeUseCase: CreateSedeUseCase,
    private readonly updateSedeUseCase: UpdateSedeUseCase,
    private readonly deleteSedeUseCase: DeleteSedeUseCase,
  ) {}

  async getAll(): Promise<Sede[] | RespuestaGrap> {
    return this.getSedesUseCase.execute();
  }

  async getById(id_sede: string): Promise<Sede | RespuestaGrap> {
    return this.getSedeUseCase.execute(id_sede);
  }

  async create(sede: Sede): Promise<Sede | RespuestaGrap> {
    return this.createSedeUseCase.execute(sede);
  }

  async update(id_sede: string, sede: Sede): Promise<Sede | RespuestaGrap> {
    return this.updateSedeUseCase.execute(id_sede, sede);
  }

  async delete(id_sede: string): Promise<RespuestaGrap> {
    return this.deleteSedeUseCase.execute(id_sede);
  }
}
