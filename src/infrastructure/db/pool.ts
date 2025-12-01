import { Pool, QueryResult , PoolClient} from 'pg';
import { SecretService } from '../../interfaces/services/secrets.service';

let realPool: Pool | null = null;
let poolInitializationPromise: Promise<void> | null = null;

async function initializePool(): Promise<void> {
  const secretService = new SecretService();

  const host = await secretService.getSecret('fbol_db_host');
  const port = await secretService.getSecret('fbol_db_port');
  const user = await secretService.getSecret('fbol_db_user');
  const password = await secretService.getSecret('fbol_db_password');
  const dbName = await secretService.getSecret('fbol_db_name');

  realPool = new Pool({
    host: host || 'localhost',
    port: Number(port || '5432'),
    user: user || 'postgres',
    password: password || '',
    database: dbName || 'fbd_db',
  });

  console.log('PG Pool inicializado');
}



async function ensurePoolInitialized(): Promise<void> {
  if (realPool !== null) {
    return;
  }
  poolInitializationPromise ??= initializePool();
  await poolInitializationPromise;
}

// Interfaz explícita
interface CustomPool {
  query<T = any>(text: string, params?: any[]): Promise<QueryResult<T>>;
  connect(): Promise<PoolClient>;
}

// Export con tipado explícito
export const pgPool: CustomPool = {
  async query<T = any>(text: string, params?: any[]): Promise<QueryResult<T>> {
    await ensurePoolInitialized();
    return realPool!.query<T>(text, params);
  },

  async connect(): Promise<any> {
    await ensurePoolInitialized();
    return realPool!.connect();
  }
};

