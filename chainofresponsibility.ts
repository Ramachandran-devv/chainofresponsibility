// A way of passing a request between a chain of objects



// The Chain of Responsibility pattern is a behavioral design pattern that allows an object to 
// send a command without knowing which object will receive and handle it. 
// It achieves this by passing the command along a chain of potential handlers until one of them handles it.
enum LogLevel {
    INFO,
    DEBUG,
    ERROR
}

abstract class AbstractLogger {
    protected nextLogger?: AbstractLogger;

    constructor(protected level: LogLevel) {}

    setNextLogger(nextLogger: AbstractLogger): void {
        this.nextLogger = nextLogger;
    }

    handleRequest(message: string, severity: LogLevel): void {
        if (this.level <= severity) {
            this.write(message);
        }
        if (this.nextLogger != null) {
            this.nextLogger.handleRequest(message, severity);
        }
    }

    protected abstract write(message: string): void;
}
class InfoLogger extends AbstractLogger {
    constructor() {
        super(LogLevel.INFO);
    }

    protected write(message: string): void {
        console.log(`INFO: ${message}`);
    }
}

class DebugLogger extends AbstractLogger {
    constructor() {
        super(LogLevel.DEBUG);
    }

    protected write(message: string): void {
        console.log(`DEBUG: ${message}`);
    }
}

class ErrorLogger extends AbstractLogger {
    constructor() {
        super(LogLevel.ERROR);
    }

    protected write(message: string): void {
        console.log(`ERROR: ${message}`);
    }
}
function clientCode() {
    const infoLogger = new InfoLogger();
    const debugLogger = new DebugLogger();
    const errorLogger = new ErrorLogger();

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
