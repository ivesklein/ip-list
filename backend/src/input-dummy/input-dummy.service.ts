import { Injectable } from '@nestjs/common';

@Injectable()
export class InputDummyService {

    /** static getLastLog
        * @return {List<String>}
        */
    public static getLastLog(): Array<string> {
        const log = process.env.LAST_LOG;
        return log ? log.split('\\n') : [];
    }

}
