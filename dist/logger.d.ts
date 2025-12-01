import { DaviLogger } from '@npm-davi/davi-coe-tslog-nodejs-lib';
export declare enum LoggerLevel {
    SILLY = "silly",
    DEBUG = "debug",
    INFO = "info",
    WARN = "warn",
    ERROR = "error",
    FATAL = "fatal"
}
export declare class Logger {
    readonly logger: DaviLogger;
    readonly level: LoggerLevel;
    private static instance;
    private constructor();
    static getInstance(loggerEnvironmentVariables: {
        name: string;
        cloudEnv: boolean;
        level: 'silly' | 'debug' | 'info' | 'warn' | 'error' | 'fatal';
    }): Logger;
}
