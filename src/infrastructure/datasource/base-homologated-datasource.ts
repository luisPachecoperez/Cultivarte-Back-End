import { inspect } from 'node:util';
import { PoolClient, QueryResult } from 'pg';
import { excepcionesQueries } from '../db/excepciones-queries';

export interface HomologationPool {
  query<T = unknown>(text: string, params?: any[]): Promise<QueryResult<T>>;
  connect(): Promise<PoolClient>;
}

export abstract class BaseHomologatedDataSource {
  protected constructor(protected readonly pool: HomologationPool) {}

  protected getErrorText(error: unknown): string {
    if (error instanceof Error) {
      return error.message;
    }
    if (typeof error === 'string') {
      return error;
    }
    if (
      typeof error === 'number' ||
      typeof error === 'boolean' ||
      typeof error === 'bigint' ||
      typeof error === 'symbol'
    ) {
      return String(error);
    }
    if (error === undefined) {
      return 'undefined';
    }
    if (typeof error === 'object' && error !== null) {
      try {
        return JSON.stringify(error);
      } catch {
        return inspect(error, { depth: 4, maxArrayLength: 20 });
      }
    }
    try {
      return JSON.stringify(error);
    } catch {
      return 'Unknown error';
    }
  }

  protected async resolveHomologatedMessage(
    errorText: string,
    client?: PoolClient,
  ): Promise<string> {
    if (!errorText) {
      return errorText;
    }

    const params = [errorText];

    if (client) {
      try {
        const result = await client.query<{ mensaje?: string }>(
          excepcionesQueries.findMensajeByError,
          params,
        );
        const mensaje = result.rows?.[0]?.mensaje;
        if (mensaje && mensaje.trim().length > 0) {
          return mensaje;
        }
      } catch (lookupError) {
        console.warn('Homologation lookup via client failed:', lookupError);
      }
    }

    try {
      const result = await this.pool.query<{ mensaje?: string }>(
        excepcionesQueries.findMensajeByError,
        params,
      );
      const mensaje = result.rows?.[0]?.mensaje;
      if (mensaje && mensaje.trim().length > 0) {
        return mensaje;
      }
    } catch (lookupError) {
      console.warn('Homologation lookup via pool failed:', lookupError);
    }

    return errorText;
  }

  protected async buildErrorMessage(
    prefix: string,
    error: unknown,
    client?: PoolClient,
  ): Promise<string> {
    const errorText = this.getErrorText(error);
    const homologated = await this.resolveHomologatedMessage(
      errorText,
      client,
    );
    return `${prefix}${homologated}`;
  }
}
