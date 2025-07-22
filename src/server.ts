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

dotenv.config();

async function startServer() {
    const app = express();
    const server = new ApolloServer<BaseContext>({ typeDefs, resolvers });
    await server.start();
  
    // Configurar Swagger UI
    app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));
    
    app.use('/graphql', cors(), bodyParser.json(), expressMiddleware(server));
    const PORT = process.env.PORT || 4000;
    app.listen(PORT, () => {
      console.log(`🚀 Server ready at http://localhost:${PORT}/graphql`);
      console.log(`📚 API Documentation available at http://localhost:${PORT}/api-docs`);
    });
}

startServer();
