import { Injectable } from '@nestjs/common';
import { CreateGetIpDto } from './dto/create-get-ip.dto';
import { UpdateGetIpDto } from './dto/update-get-ip.dto';

@Injectable()
export class GetIpsService {
  create(createGetIpDto: CreateGetIpDto) {
    return 'This action adds a new getIp';
  }

  findAll() {
    return `This action returns all getIps`;
  }

  findOne(id: number) {
    return `This action returns a #${id} getIp`;
  }

  update(id: number, updateGetIpDto: UpdateGetIpDto) {
    return `This action updates a #${id} getIp`;
  }

  remove(id: number) {
    return `This action removes a #${id} getIp`;
  }
}
