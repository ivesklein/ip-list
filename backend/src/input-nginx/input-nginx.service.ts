import { Injectable } from '@nestjs/common';
import * as fs from 'fs';

@Injectable()
export class InputNginxService {

    /** static getLastLog
        * @return {List<String>}
        */
    public static getLastLog(): Array<string> {

        // check if the environment variable LOG_PATH is set
        if (!process.env.LOG_PATH) {
            console.error('Missing LOG_PATH environment variable');
            return [];
        }

        // get the last log file from system
        const file = fs.readFileSync(`${process.env.LOG_PATH}/access.log` , 'utf8');
        return file.split('\n');

    }

}
