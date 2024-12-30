import { PartialType } from '@nestjs/mapped-types';
import { CreateGetIpDto } from './create-get-ip.dto';

export class UpdateGetIpDto extends PartialType(CreateGetIpDto) {}
