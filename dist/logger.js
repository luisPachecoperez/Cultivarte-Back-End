"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Logger = exports.LoggerLevel = void 0;
const davi_coe_tslog_nodejs_lib_1 = require("@npm-davi/davi-coe-tslog-nodejs-lib");
var LoggerLevel;
(function (LoggerLevel) {
    LoggerLevel["SILLY"] = "silly";
    LoggerLevel["DEBUG"] = "debug";
    LoggerLevel["INFO"] = "info";
    LoggerLevel["WARN"] = "warn";
    LoggerLevel["ERROR"] = "error";
    LoggerLevel["FATAL"] = "fatal";
})(LoggerLevel || (exports.LoggerLevel = LoggerLevel = {}));
class Logger {
    constructor(name, cloudEnv, level, maskOptions) {
        this.level = level ?? LoggerLevel.INFO;
        this.logger = new davi_coe_tslog_nodejs_lib_1.DaviLogger(cloudEnv ?? true, name, this.level, maskOptions, { colorized: true, type: 'pretty' }, { uuidVersion: 4, maxSizeMsg: 15000 });
    }
    static getInstance(loggerEnvironmentVariables) {
        if (!Logger.instance) {
            const { name, cloudEnv, level } = loggerEnvironmentVariables;
            Logger.instance = new Logger(name, cloudEnv, level);
        }
        return Logger.instance;
    }
}
exports.Logger = Logger;
Logger.instance = undefined;
//# sourceMappingURL=logger.js.map