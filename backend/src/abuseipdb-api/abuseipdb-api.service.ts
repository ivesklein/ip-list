import { Injectable } from '@nestjs/common';
import axios from 'axios';

@Injectable()
export class AbuseipdbApiService {
    
    /** get the data from the abuseipdb api
        * @param {String} ip
        * @return {Promise<any>}
        * @throws {Error}
        */
    public static async getAbuseData(ip: string): Promise<any> {
        try {
            // check if the api key is set
            if (!process.env.ABUSEIPDB_API_KEY) {
                throw new Error('ABUSEIPDB_API_KEY is not set');
            }
            
            const response = await axios.get(`https://api.abuseipdb.com/api/v2/check?ipAddress=${ip}`, {
                headers: {
                    'Key': process.env.ABUSEIPDB_API_KEY,
                    'Accept': 'application/json'
                }
            });
        
            return {
                ip: response.data.data.ipAddress,
                abuseConfidenceScore: response.data.data.abuseConfidenceScore,
                country: response.data.data.countryCode,
                usageType: response.data.data.usageType??'',
            };

        } catch (error) {
            throw new Error(error);
        }
    }

}
