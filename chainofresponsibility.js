// A way of passing a request between a chain of objects
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
// The Chain of Responsibility pattern is a behavioral design pattern that allows an object to 
// send a command without knowing which object will receive and handle it. 
// It achieves this by passing the command along a chain of potential handlers until one of them handles it.
var LogLevel;
(function (LogLevel) {
    LogLevel[LogLevel["INFO"] = 0] = "INFO";
    LogLevel[LogLevel["DEBUG"] = 1] = "DEBUG";
    LogLevel[LogLevel["ERROR"] = 2] = "ERROR";
})(LogLevel || (LogLevel = {}));
var AbstractLogger = /** @class */ (function () {
    function AbstractLogger(level) {
        this.level = level;
    }
    AbstractLogger.prototype.setNextLogger = function (nextLogger) {
        this.nextLogger = nextLogger;
    };
    AbstractLogger.prototype.handleRequest = function (message, severity) {
        if (this.level <= severity) {
            this.write(message);
        }
        if (this.nextLogger != null) {
            this.nextLogger.handleRequest(message, severity);
        }
    };
    return AbstractLogger;
}());
var InfoLogger = /** @class */ (function (_super) {
    __extends(InfoLogger, _super);
    function InfoLogger() {
        return _super.call(this, LogLevel.INFO) || this;
    }
    InfoLogger.prototype.write = function (message) {
        console.log("INFO: ".concat(message));
    };
    return InfoLogger;
}(AbstractLogger));
var DebugLogger = /** @class */ (function (_super) {
    __extends(DebugLogger, _super);
    function DebugLogger() {
        return _super.call(this, LogLevel.DEBUG) || this;
    }
    DebugLogger.prototype.write = function (message) {
        console.log("DEBUG: ".concat(message));
    };
    return DebugLogger;
}(AbstractLogger));
var ErrorLogger = /** @class */ (function (_super) {
    __extends(ErrorLogger, _super);
    function ErrorLogger() {
        return _super.call(this, LogLevel.ERROR) || this;
    }
    ErrorLogger.prototype.write = function (message) {
        console.log("ERROR: ".concat(message));
    };
    return ErrorLogger;
}(AbstractLogger));
function clientCode() {
    var infoLogger = new InfoLogger();
    var debugLogger = new DebugLogger();
    var errorLogger = new ErrorLogger();
    infoLogger.setNextLogger(debugLogger);
    debugLogger.setNextLogger(errorLogger);
    console.log("Sending an INFO level message:");
    infoLogger.handleRequest("This is an informational message.", LogLevel.INFO);
    console.log("\nSending a DEBUG level message:");
    infoLogger.handleRequest("This is a debug message.", LogLevel.DEBUG);
    console.log("\nSending an ERROR level message:");
    infoLogger.handleRequest("This is an error message.", LogLevel.ERROR);
}
clientCode();
//# sourceMappingURL=chainofresponsibility.js.map