import { Injectable } from '@nestjs/common';
import { InputDummyService } from '../input-dummy/input-dummy.service';
import { DataParserService } from '../data-parser/data-parser.service';
import { AbuseipdbApiService } from '../abuseipdb-api/abuseipdb-api.service';
import { IpEntityService } from 'src/ip-entity/ip-entity.service';
import { InputNginxService } from 'src/input-nginx/input-nginx.service';

@Injectable()
export class IpPipeService {

    constructor(private readonly ipEntityService: IpEntityService) {}
    
    /** getIp
        * @return {null}
        */
    public async getIps() {
        // check if the environment variable INPUT_METHOD is set
        if (!process.env.INPUT_METHOD) {
            console.error('Missing INPUT_METHOD environment variable');
            return;
        }
        // read INPUT_METHOD from env
        let input = [];
        if(process.env.INPUT_METHOD === 'dummy') {
            input = InputDummyService.getLastLog();
        } else if(process.env.INPUT_METHOD === 'nginx') {
            input = InputNginxService.getLastLog();
        }

        const data = input.map((line) => DataParserService.parseData(line));

        const dbIps = await this.ipEntityService.findAll();

        const report = await Promise.all(data.map(async (line) => {

            //check if ip already exist to copy the abuse data
            const exists = dbIps.find((entity) => entity.ip === line[0]);
            if (exists) {
                return {
                    ip: line[0],
                    date: line[1],
                    method: line[2],
                    url: line[3],
                    status: line[4],
                    userAgent: line[5],
                    abuseConfidenceScore: exists.abuseScore,
                    country: exists.country,
                    usageType: exists.usageType
                };
            } else {
                const abuseData = await AbuseipdbApiService.getAbuseData(line[0]);
                return {
                    ip: line[0],
                    date: line[1],
                    method: line[2],
                    url: line[3],
                    status: line[4],
                    userAgent: line[5],
                    abuseConfidenceScore: abuseData.abuseConfidenceScore,
                    country: abuseData.country,
                    usageType: abuseData.usageType
                };
            }
        }));

        report.forEach(async (line) => {

            // check if data is corrupted
            if (line.abuseConfidenceScore === undefined) {
                return;
            }

            //check if the registry already exists to ignore it, comparing each field
            const exists = dbIps.find((entity) => {
                return entity.ip === line.ip && +entity.date === +line.date && entity.method === line.method && entity.endpoint === line.url && entity.status === line.status && entity.userAgent === line.userAgent;
            });
            if (exists) {
                return;
            }

            //save the data
            this.ipEntityService.create({
                id: null, // or generate an id if necessary
                ip: line.ip,
                date: line.date,
                method: line.method,
                endpoint: line.url,
                status: line.status,
                userAgent: line.userAgent,
                abuseScore: line.abuseConfidenceScore,
                country: line.country,
                usageType: line.usageType,
                // abuseScore: <=5 -> Confiable, >=95 -> Maliciosa , other -> Sospechosa
                category: line.abuseConfidenceScore <= 5 ? 'Confiable' : line.abuseConfidenceScore >= 95 ? 'Maliciosa' : 'Sospechosa'
            });
        });

    }
}
