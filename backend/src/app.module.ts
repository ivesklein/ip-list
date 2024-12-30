import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { InputDummyService } from './input-dummy/input-dummy.service';
import { DataParserService } from './data-parser/data-parser.service';
import { AbuseipdbApiService } from './abuseipdb-api/abuseipdb-api.service';
import { SaveDataService } from './save-data/save-data.service';
import { AlertsService } from './alerts/alerts.service';
import { GetIpsResolver } from './get-ips/get-ips.resolver';
import { GetIpsModule } from './get-ips/get-ips.module';

@Module({
  imports: [GetIpsModule],
  controllers: [AppController],
  providers: [AppService, InputDummyService, DataParserService, AbuseipdbApiService, SaveDataService, AlertsService, GetIpsResolver],
})
export class AppModule {}
