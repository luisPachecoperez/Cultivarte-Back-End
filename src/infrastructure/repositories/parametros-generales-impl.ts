import {
  ParametrosGenerales,
  ParametrosGeneralesRepository,
  ParametrosGeneralesDataSource,
  RespuestaGrap,
} from "../../domain";

export class ParametrosGeneralesRepositoryImpl
  implements ParametrosGeneralesRepository
{
  constructor(
    private parametrosGeneralesDataSource: ParametrosGeneralesDataSource,
  ) {}

  async getAll(): Promise<ParametrosGenerales[] | RespuestaGrap> {
    return this.parametrosGeneralesDataSource.getAll();
  }

  async getById(
    id_parametro_general: string,
  ): Promise<ParametrosGenerales | RespuestaGrap> {
    return this.parametrosGeneralesDataSource.getById(id_parametro_general);
  }

  async create(data: ParametrosGenerales): Promise<RespuestaGrap> {
    return this.parametrosGeneralesDataSource.create(data);
  }

  async updateById(
    id_parametro_general: string,
    data: ParametrosGenerales,
  ): Promise<RespuestaGrap> {
    return this.parametrosGeneralesDataSource.updateById(
      id_parametro_general,
      data,
    );
  }

  async deleteById(id_parametro_general: string): Promise<RespuestaGrap> {
    return this.parametrosGeneralesDataSource.deleteById(id_parametro_general);
  }
}
