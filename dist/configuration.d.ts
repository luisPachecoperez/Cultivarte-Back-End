export type EnvironmentVariables = {
    env: 'local' | 'integration' | 'laboratory' | 'production';
    port: number;
    logger: {
        name: string;
        cloudEnv: boolean;
        level: 'silly' | 'debug' | 'info' | 'warn' | 'error' | 'fatal';
    };
};
export declare class Configuration {
    private readonly valuesNodeEnv;
    private readonly valuesLoggerLevel;
    private static instance;
    private constructor();
    static getInstance(): Configuration;
    get vars(): EnvironmentVariables;
}
