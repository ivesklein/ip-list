import { Injectable } from '@nestjs/common';
import { InputDummyService } from '../input-dummy/input-dummy.service';
import { DataParserService } from '../data-parser/data-parser.service';
import { AbuseipdbApiService } from '../abuseipdb-api/abuseipdb-api.service';
import { IpEntityService } from 'src/ip-entity/ip-entity.service';

@Injectable()
export class IpPipeService {

    constructor(private readonly ipEntityService: IpEntityService) {}
    
    /** getIp
        * @return {null}
        */
    public async getIps() {
        const input = InputDummyService.getLastLog();
        const data = input.map((line) => DataParserService.parseData(line));
        const report = await Promise.all(data.map(async (line) => {
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
        }));

        report.forEach(async (line) => {
            //check if the registry already exists to ignore it, comparing each field
            const exists = (await this.ipEntityService.findAll()).find((entity) => {
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
                // abuseScore: <=5 -> Confiables, >=95 -> Maliciosas , other -> Sospechosas
                category: line.abuseConfidenceScore <= 5 ? 'Confiables' : line.abuseConfidenceScore >= 95 ? 'Maliciosas' : 'Sospechosas'
            });
        });

    }
}
