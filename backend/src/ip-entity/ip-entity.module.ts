import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { IpEntity } from './ip-entity';
import { IpEntityService } from './ip-entity.service';
import { IpEntityController } from './ip-entity.controller';

@Module({
  imports: [TypeOrmModule.forFeature([IpEntity])],
  providers: [IpEntityService],
  exports: [IpEntityService],
  controllers: [IpEntityController],
})
export class IpEntityModule {}