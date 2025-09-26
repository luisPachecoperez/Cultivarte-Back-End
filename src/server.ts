import express from 'express';
import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@apollo/server/express4';
import cors from 'cors';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import { typeDefs } from './interfaces/graphql/typeDef';
import { resolvers } from './interfaces/graphql/resolvers';
import { BaseContext } from '@apollo/server';
import swaggerUi from 'swagger-ui-express';
import { specs } from './../swagger/swagger-config';
import { initDbPool, closeDbPool } from './infrastructure/db/pg-pool';

dotenv.config();

async function startServer() {
    // Initialize database pool
    await initDbPool();
    
    const app = express();
    const server = new ApolloServer<BaseContext>({ typeDefs, resolvers });
    await server.start();
  
    // Configurar Swagger UI
    app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));
    
    app.use('/graphql', cors({
        origin:(origin, callback) =>{
          if(!origin || origin.startsWith('http://localhost')){
            callback(null, true);
          }else{
            callback(new Error('Not allowed by CORS'));
          }
        }
    }), bodyParser.json(), expressMiddleware(server));
    
    const PORT = process.env.PORT || 5000;
    const httpServer = app.listen(PORT, () => {
      console.log(`🚀 Server ready at http://localhost:${PORT}/graphql`);
      console.log(`📚 API Documentation available at http://localhost:${PORT}/api-docs`);
    });

    // Handle graceful shutdown
    const shutdown = async () => {
      console.log('Shutting down server...');
      
      // Close the HTTP server
      await new Promise<void>((resolve) => {
        httpServer.close(() => {
          console.log('HTTP server closed');
          resolve();
        });
      });
      
      // Close the database pool
      await closeDbPool();
      
      console.log('Server shutdown complete');
      process.exit(0);
    };

    // Handle termination signals
    process.on('SIGTERM', shutdown);
    process.on('SIGINT', shutdown);
}

startServer().catch(err => {
  console.error('Failed to start server:', err);
  process.exit(1);
});
