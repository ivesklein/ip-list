import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { GetIpsService } from './get-ips.service';
import { CreateGetIpDto } from './dto/create-get-ip.dto';
import { UpdateGetIpDto } from './dto/update-get-ip.dto';

@Controller('get-ips')
export class GetIpsController {
  constructor(private readonly getIpsService: GetIpsService) {}

  @Post()
  create(@Body() createGetIpDto: CreateGetIpDto) {
    return this.getIpsService.create(createGetIpDto);
  }

  @Get()
  findAll() {
    return this.getIpsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.getIpsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateGetIpDto: UpdateGetIpDto) {
    return this.getIpsService.update(+id, updateGetIpDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.getIpsService.remove(+id);
  }
}
