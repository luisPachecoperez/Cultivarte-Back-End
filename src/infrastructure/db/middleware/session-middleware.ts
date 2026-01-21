import { Request, Response, NextFunction } from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken';
import { secretService } from '../../../interfaces/services/secrets.service';

declare module 'express-serve-static-core' {
  interface Request {
    authToken?: string;
    authPayload?: JwtPayload;
  }
}
let cachedVerificationKey: string | undefined;

async function resolveVerificationKey(): Promise<string | undefined> {
  if (cachedVerificationKey) {
    return cachedVerificationKey;
  }

  const publicKey = await secretService.getSecret('fbol_google_public_key');
  if (publicKey) {
    cachedVerificationKey = publicKey.replaceAll(String.raw`\n`, '\n');
    return cachedVerificationKey;
  }

  const privateKey = await secretService.getSecret('fbol_google_private_key');
  if (privateKey) {
    cachedVerificationKey = privateKey.replaceAll(String.raw`\n`, '\n');
    return cachedVerificationKey;
  }

  return undefined;
}

function getCookieValue(req: Request, name: string): unknown {
  if (!req.cookies || typeof req.cookies !== 'object') {
    return undefined;
  }

  const typedCookies = req.cookies as Record<string, unknown>;
  return typedCookies[name];
}

function isJwtPayload(payload: unknown): payload is JwtPayload {
  return typeof payload === 'object' && payload !== null;
}

function extractToken(req: Request): string | undefined {
  const cookieTokenCandidate = getCookieValue(req, '__SESSION_AUTH__');
  if (typeof cookieTokenCandidate === 'string') {
    return cookieTokenCandidate;
  }

  const authHeader = req.headers.authorization;
  if (authHeader?.startsWith('Bearer ')) {
    return authHeader.slice(7);
  }

  return undefined;
}

export async function rs256AuthMiddleware(
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> {
  const token = extractToken(req);

  if (!token) {
    res.status(401).json({ error: 'Token requerido' });
    return;
  }

  try {
    const verificationKey = await resolveVerificationKey();

    if (!verificationKey) {
      throw new Error('Clave de verificación no disponible');
    }

    req.authToken = token;

    const decodedToken: unknown = jwt.verify(token, verificationKey, {
      algorithms: ['RS256'],
    });

    if (!isJwtPayload(decodedToken)) {
      throw new Error('Token sin payload valido');
    }

    req.authPayload = decodedToken;
    next();
  } catch (error) {
    console.error('Error verifying RS256 token:', error);
    res.status(401).json({ error: 'Token inválido o expirado' });
  }
}
