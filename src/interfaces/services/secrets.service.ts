// secret.service.ts
import { Response } from 'express';
import { SecretManagerServiceClient } from '@google-cloud/secret-manager';

import { environment } from '../../environment/environment';
interface JwtPayload {
  [key: string]: any;
  iat?: number;
  exp?: number;
}
/**
 * Servicio que obtiene secretos desde Secret Manager
 * y crea cookies seguras en la respuesta.
 */
export class SecretService {
  private readonly client: SecretManagerServiceClient;
  private readonly projectId: string;
  private readonly isDev: boolean = process.env.NODE_ENV === 'desarrollo';
  private readonly envLocal: any;

  constructor() {
    this.client = new SecretManagerServiceClient();
    this.projectId = process.env.GOOGLE_CLOUD_PROJECT || 'cloud-ejemplo';
    if (this.isDev) {
      this.envLocal = environment;
    } else {
      this.envLocal = {};
    }
    // No inicializar secretos aquí
  }

  /**
   * Inicializa los secretos requeridos de forma asíncrona.
   */
  async init(): Promise<void> {

  }

  
  /**
   * Obtiene un secreto individual por nombre.
   */
  async getSecret(name: string): Promise<string> {
    console.warn("Secreto a leer:",name);

    try {
      if (this.isDev) {
        console.warn("Es desarrollo");
        return this.envLocal[name];
      }
      console.warn("Project id:",this.projectId);
      if (!this.projectId) {
        throw new Error('GOOGLE_CLOUD_PROJECT no está definido.');
      }

      const secretPath = `projects/${this.projectId}/secrets/${name}/versions/latest`;
      console.warn("Secretpath:",secretPath);
      const [version] = await this.client.accessSecretVersion({
        name: secretPath,
      });
      console.warn("version:",version);
      // Si no hay payload o data, retorna undefined
      if (!version.payload?.data) return undefined;
      const value = version.payload.data.toString();
      
      console.warn("Secreto leido:",value);
      return value === '' ? undefined : value;
    } catch {
      return undefined;
    }
  }

 
}

// Exporta instancia lista para usar
export const secretService = new SecretService();
