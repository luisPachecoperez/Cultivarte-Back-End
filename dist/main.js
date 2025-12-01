"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const server_1 = require("@apollo/server");
const express4_1 = require("@apollo/server/express4");
const cors_1 = __importDefault(require("cors"));
const body_parser_1 = __importDefault(require("body-parser"));
const dotenv_1 = __importDefault(require("dotenv"));
const typeDef_1 = require("./interfaces/graphql/typeDef");
const resolvers_1 = require("./interfaces/graphql/resolvers");
const swagger_ui_express_1 = __importDefault(require("swagger-ui-express"));
const swagger_config_1 = require("./swagger/swagger-config");
const pg_pool_1 = require("./infrastructure/db/pg-pool");
dotenv_1.default.config();
async function startServer() {
    const app = (0, express_1.default)();
    app.use(express_1.default.json({ limit: '10mb' }));
    app.use(express_1.default.urlencoded({ limit: '10mb', extended: true }));
    app.use('/api-docs', swagger_ui_express_1.default.serve, swagger_ui_express_1.default.setup(swagger_config_1.specs));
    const server = new server_1.ApolloServer({ typeDefs: typeDef_1.typeDefs, resolvers: resolvers_1.resolvers });
    await server.start();
    app.use('/graphql', (0, cors_1.default)({
        origin: (origin, callback) => {
            if (!origin || origin.startsWith('http://localhost')) {
                callback(null, true);
            }
            else {
                callback(new Error('Not allowed by CORS'));
            }
        },
    }), body_parser_1.default.json(), (0, express4_1.expressMiddleware)(server));
    const PORT = process.env.PORT || 8001;
    const httpServer = app.listen(Number(PORT), '0.0.0.0', () => {
        void (async () => {
            try {
                await (0, pg_pool_1.initDbPool)();
                console.log('Database Pool initialized successfully');
            }
            catch (err) {
                console.error('Failed to initialize DB Pool:', err);
            }
        })();
    });
    const shutdown = async () => {
        console.log('Shutting down server...');
        await new Promise((resolve) => {
            httpServer.close(() => {
                console.log('HTTP server closed');
                resolve();
            });
        });
        await (0, pg_pool_1.closeDbPool)();
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
//# sourceMappingURL=main.js.map