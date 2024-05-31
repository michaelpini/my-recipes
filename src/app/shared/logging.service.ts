import { Injectable } from "@angular/core";

@Injectable({
    providedIn: 'root'
})
export class LoggingService {
    logArr: {
        time: string, 
        logs: any[]
    }[] = [];

    toConsole(...args: any[]) {
        console.log(...args);   // output to console
        this.logArr.push({      // store in array
            time: new Date().toTimeString(), 
            logs:[...args]
        })
    }

    showAllLogs() {
        console.groupCollapsed('All Logs')
        for (let log of this.logArr) {
            console.log(log.time + ':  ', ...log.logs )
        }
        console.groupEnd();
    }
}