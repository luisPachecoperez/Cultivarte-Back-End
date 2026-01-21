import express from 'express';
import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@apollo/server/express4';
import cors from 'cors';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import dotenv from 'dotenv';
import { BaseContext } from '@apollo/server';
import { typeDefs } from './interfaces/graphql/typeDef';
import { resolvers } from './interfaces/graphql/resolvers';
import { rs256AuthMiddleware } from './infrastructure/db/middleware/session-middleware';
import { pgPool } from './infrastructure/db/pool';

dotenv.config();

async function startServer() {
  const app = express();
  app.use(express.json({ limit: '10mb' }));
  app.use(express.urlencoded({ limit: '10mb', extended: true }));
  app.use(cookieParser());

  const server = new ApolloServer<BaseContext>({ typeDefs, resolvers });
  await server.start();

  app.use(
    '/backend/culti/graphql',
    cors({
      origin: (origin, callback) => {
        if (
          !origin ||
          origin.startsWith('http') ||
          origin.startsWith('https')
        ) {
          callback(null, true);
        } else {
          callback(new Error('Not allowed by CORS'));
        }
      },
      credentials: true,
    }),
    bodyParser.json(),
    (req, res, next) => {
      void rs256AuthMiddleware(req, res, next).catch(next);
    },
    expressMiddleware(server, {
      context: ({ req }) =>
        Promise.resolve({
          authToken: req.authToken,
          authPayload: req.authPayload,
        }),
    }),
  );

  const PORT = process.env.PORT || 8001;

  // 🔥 Arranca primero el servidor (Cloud Run necesita esto rápido)
  const httpServer = app.listen(Number(PORT), '0.0.0.0', () => {
    const pool = pgPool;

    // 🔥 Luego inicializa la base de datos
    void (async () => {
      try {
        await pool.connect();
        console.log('Database Pool initialized successfully');
      } catch (err) {
        console.error('Failed to initialize DB Pool:', err);
      }
    })();
  });

  // Graceful shutdown
  const shutdown = async () => {
    console.log('Shutting down server...');
    await new Promise<void>((resolve) => {
      httpServer.close(() => {
        console.log('HTTP server closed');
        resolve();
      });
    });

    //await closeDbPool();
    console.log('Server shutdown complete');
    process.exit(0);
  };

  process.on('SIGTERM', () => {
    void shutdown().catch(console.error);
  });
  process.on('SIGINT', () => {
    void shutdown().catch(console.error);
  });
}

startServer().catch((err) => {
  console.error('Failed to start server:', err);
  process.exit(1);
});
