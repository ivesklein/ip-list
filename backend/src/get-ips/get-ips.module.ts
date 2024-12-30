import { Module } from '@nestjs/common';
import { GetIpsService } from './get-ips.service';
import { GetIpsController } from './get-ips.controller';

@Module({
  controllers: [GetIpsController],
  providers: [GetIpsService],
})
export class GetIpsModule {}
