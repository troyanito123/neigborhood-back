import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateContributionInput } from './dto/create-contribution.input';
import { UpdateContributionInput } from './dto/update-contribution.input';
import { Contribution } from './entities/contribution.entity';

@Injectable()
export class ContributionsService {
  constructor(
    @InjectRepository(Contribution)
    private contributionRepository: Repository<Contribution>,
  ) {}

  create(createContributionInput: CreateContributionInput) {
    return this.contributionRepository.save(createContributionInput);
  }

  findAll() {
    return this.contributionRepository.find();
  }

  findOne(id: number) {
    return this.contributionRepository.findOneOrFail(id);
  }

  async update(id: number, updateContributionInput: UpdateContributionInput) {
    const contribution = await this.contributionRepository.findOneOrFail(id);
    const { id: other, ...rest } = updateContributionInput;
    this.contributionRepository.merge(contribution, rest);
    return this.contributionRepository.save(contribution);
  }
}
