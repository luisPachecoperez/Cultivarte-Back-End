import { RespuestaGrap } from '../../entities/respuesta';
import { SedeRepository } from '../../';

export interface DeleteSedeUseCase {
  execute(id_sede: string): Promise<RespuestaGrap>;
}

export class DeleteSedeUseCaseImpl implements DeleteSedeUseCase {
  constructor(private readonly sedeRepository: SedeRepository) {}

  execute(id_sede: string): Promise<RespuestaGrap> {
    return this.sedeRepository.deleteById(id_sede);
  }
}
