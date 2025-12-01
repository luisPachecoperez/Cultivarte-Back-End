import { RespuestaGrap } from '../../entities/respuesta';
import { SedeRepository } from '../../repositories/sede-repository';
import { Sede } from '../../entities/sede';

export interface GetSedeUseCase {
  execute(id_sede: string): Promise<Sede | RespuestaGrap>;
}

export class GetSedeUseCaseImpl implements GetSedeUseCase {
  constructor(private readonly sedeRepository: SedeRepository) {}

  execute(id_sede: string): Promise<Sede | RespuestaGrap> {
    return this.sedeRepository.getById(id_sede);
  }
}
