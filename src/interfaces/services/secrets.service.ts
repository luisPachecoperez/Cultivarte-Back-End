import { SecretManagerServiceClient } from '@google-cloud/secret-manager';

import { environment } from '../../environment/environment';
/**
 * Servicio que obtiene secretos desde Secret Manager
 * y crea cookies seguras en la respuesta.
 */
export class SecretService {
  private readonly client: SecretManagerServiceClient;
  private readonly projectId: string;
  private readonly isDev: boolean = process.env.NODE_ENV === 'desarrollo';
  private readonly envLocal: Record<string, string | undefined>;

  constructor() {
    this.client = new SecretManagerServiceClient();
    this.projectId = process.env.GOOGLE_CLOUD_PROJECT || 'cloud-ejemplo';
    if (this.isDev) {
      this.envLocal = environment as Record<string, string | undefined>;
    } else {
      this.envLocal = {};
    }
    // No inicializar secretos aquí
  }

  /**
   * Inicializa los secretos requeridos de forma asíncrona.
   */
  async init(): Promise<void> {
    // Intentionally left empty - reserved for future secret initialization logic
  }

  /**
   * Obtiene un secreto individual por nombre.
   */
  async getSecret(name: string): Promise<string> {
    console.warn('Secreto a leer:', name);

    try {
      if (this.isDev) {
        console.warn('Es desarrollo');
        const localValue = this.envLocal[name];
        return typeof localValue === 'string' && localValue.length > 0
          ? localValue
          : undefined;
      }
      console.warn('Project id:', this.projectId);
      if (!this.projectId) {
        throw new Error('GOOGLE_CLOUD_PROJECT no está definido.');
      }

      const secretPath = `projects/${this.projectId}/secrets/${name}/versions/latest`;
      console.warn('Secretpath:', secretPath);
      const [version] = await this.client.accessSecretVersion({
        name: secretPath,
      });
      console.warn('version:', version);
      // Si no hay payload o data, retorna undefined
      if (!version.payload?.data) return undefined;
      const value = version.payload.data.toString();

      console.warn(name, ' Secreto leido:', value);
      return value === '' ? undefined : value;
    } catch (error) {
      console.error('Error al obtener secreto:', error);
      return undefined;
    }
  }
}

// Exporta instancia lista para usar
export const secretService = new SecretService();
