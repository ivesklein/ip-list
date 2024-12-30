import { Injectable } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { IpPipeService } from 'src/ip-pipe/ip-pipe.service';

@Injectable()
export class IpCronService {
    constructor(private readonly ipPipeService: IpPipeService) {}

    @Cron(CronExpression.EVERY_HOUR) // Adjust the cron expression as needed
    handleCron() {
        this.ipPipeService.getIps();
    }
  }
