"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Configuration = void 0;
const zod_1 = require("zod");
class Configuration {
    constructor() {
        this.valuesNodeEnv = [
            'local',
            'production',
            'laboratory',
            'integration',
        ];
        this.valuesLoggerLevel = [
            'silly',
            'debug',
            'info',
            'warn',
            'error',
            'fatal',
        ];
    }
    static getInstance() {
        if (!Configuration.instance) {
            Configuration.instance = new Configuration();
        }
        return Configuration.instance;
    }
    get vars() {
        const envSchema = zod_1.z.object({
            NODE_ENV: zod_1.z.enum(this.valuesNodeEnv),
            PORT: zod_1.z.coerce.number().optional().default(8001),
            PROJECT_JIRA: zod_1.z.string(),
            LOGGER_NAME: zod_1.z.string(),
            LOGGER_LEVEL: zod_1.z.enum(this.valuesLoggerLevel),
            LOGGER_CLOUD_ENV: zod_1.z
                .string()
                .optional()
                .default('true')
                .transform((val) => {
                if (val === 'true' || val === '1' || String(val) === '1') {
                    return true;
                }
                else if (val === 'false' || val === '0') {
                    return false;
                }
                else {
                    throw new Error('LOGGER_CLOUD_ENV must be "true", "false", "1", or "0"');
                }
            }),
        });
        try {
            const envs = envSchema.parse(process.env);
            return {
                port: envs.PORT,
                env: envs.NODE_ENV,
                logger: {
                    name: envs.LOGGER_NAME,
                    level: envs.LOGGER_LEVEL,
                    cloudEnv: envs.LOGGER_CLOUD_ENV,
                },
            };
        }
        catch (error) {
            if (error instanceof zod_1.z.ZodError) {
                console.error('Environment variables validation error:', error.errors);
                throw new Error('Invalid environment variables');
            }
            else {
                throw error;
            }
        }
    }
}
exports.Configuration = Configuration;
Configuration.instance = undefined;
//# sourceMappingURL=configuration.js.map