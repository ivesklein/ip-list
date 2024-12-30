import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import { IpEntity } from './ip-entity';

@Injectable()
export class IpEntityService {
    constructor(
        @InjectRepository(IpEntity)
        private readonly ipEntityRepository: Repository<IpEntity>,
    ) {}

    async create(ipEntity: IpEntity): Promise<IpEntity> {
        return this.ipEntityRepository.save(ipEntity);
    }

    async findAll(): Promise<IpEntity[]> {
        return this.ipEntityRepository.find();
    }
}
