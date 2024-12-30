import { Injectable } from '@nestjs/common';

@Injectable()
export class DataParserService {

    /** parseData parses into a list of : ip, date, method, url, status, user-agent
        * @param {String} data
        * @return {Array<any>}
        */
    public static parseData(data: string): Array<any> {
        // input example: '191.96.11.228 - - [27/Dec/2024:07:42:33 +0000] "POST /auth/login HTTP/1.1" 301 178 "-" "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36"'
        // output example: ["191.96.11.228", "27/Dec/2024:07:42:33 +0000", "POST", "/auth/login", "301", "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/"]
        const regex = /(\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}) - - \[(.*?)\] "(.*?)" (\d{3}) (\d{1,}) "(.*?)" "(.*?)"/;
        const match = data.match(regex);
        if (match) {
            const date = DataParserService.parseDate(match[2]);
            // check if the params are not empty
            const ip = match[1];
            const method = match[3].split(' ')[0] ? match[3].split(' ')[0] : '-';
            const url = match[3].split(' ')[1] ? match[3].split(' ')[1] : '-';
            const status = match[4] ? match[4] : '-';
            const userAgent = match[7] ? match[7] : '-';


            return [ip, date, method, url, status, userAgent];
        }else{
            //try to matsh only the ip and date, the rest of the data put it in the user-agent
            const regex = /(\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}) - - \[(.*?)\] "(.*?)"/;
            const match = data.match(regex);
            if (match) {
                const date = new Date(match[2]);
                return [match[1], date, "-", "-", "-", match[3]];
            }
        }
        return [];
    }

    public static parseDate(date: string): Date{
        // input example 27/Dec/2024:07:42:33 +0000
        // output Date object
        const months = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
        const dateParts = date.split('/');
        const day = parseInt(dateParts[0]);
        const month = months.indexOf(dateParts[1]);
        const year = parseInt(dateParts[2].split(':')[0]);
        const time = dateParts[2].split(':')[1];
        const hours = parseInt(time);
        const minutes = parseInt(dateParts[2].split(':')[2]);
        const seconds = parseInt(dateParts[2].split(':')[3]);
        return new Date(year,month,day,hours,minutes,seconds);
    }

}
