import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { InputDummyService } from './input-dummy/input-dummy.service';
import { DataParserService } from './data-parser/data-parser.service';
import { AbuseipdbApiService } from './abuseipdb-api/abuseipdb-api.service';
import { SaveDataService } from './save-data/save-data.service';
import { AlertsService } from './alerts/alerts.service';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { IpEntity } from './ip-entity/ip-entity';
import { IpEntityModule } from './ip-entity/ip-entity.module';
import { IpPipeModule } from './ip-pipe/ip-pipe.module';
import { InputNginxService } from './input-nginx/input-nginx.service';
import { ScheduleModule } from '@nestjs/schedule';
import { IpPipeService } from './ip-pipe/ip-pipe.service';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: 'database.sqlite',
      entities: [IpEntity], // Add your entities here
      synchronize: true,
    }),
    IpEntityModule,
    IpPipeModule,
  ],
  controllers: [AppController],
  providers: [AppService, InputDummyService, DataParserService, AbuseipdbApiService, SaveDataService, AlertsService, InputNginxService, IpPipeService],
})
export class AppModule {}
