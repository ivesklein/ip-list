import { Module } from '@nestjs/common';
import { IpPipeService } from './ip-pipe.service';
import { IpEntityModule } from 'src/ip-entity/ip-entity.module';

@Module({
  imports: [IpEntityModule],
  providers: [IpPipeService],
  exports: [IpPipeService],
})
export class IpPipeModule {}
