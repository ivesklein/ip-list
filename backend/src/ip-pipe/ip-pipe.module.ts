import { Module } from '@nestjs/common';
import { IpPipeService } from './ip-pipe.service';
import { IpEntityModule } from 'src/ip-entity/ip-entity.module';
import { IpCronService } from 'src/ip-cron/ip-cron.service';
import { ScheduleModule } from '@nestjs/schedule';

@Module({
  imports: [IpEntityModule, ScheduleModule.forRoot(),],
  providers: [IpPipeService, IpCronService],
  exports: [IpPipeService],
})
export class IpPipeModule {}
