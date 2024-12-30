import { Controller, Get } from '@nestjs/common';
import { IpEntityService } from './ip-entity.service';
import { IpEntity } from './ip-entity';

@Controller('ips')
export class IpEntityController {
    
    constructor(private readonly ipEntityService: IpEntityService) {}

    @Get()
    async findAll(): Promise<IpEntity[]> {
        return this.ipEntityService.findAll();
    }
    
}
