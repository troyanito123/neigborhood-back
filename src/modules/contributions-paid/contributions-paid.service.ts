import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ContributionsService } from '../contributions/contributions.service';
import { GenericStaus } from '../generic-enums';
import { UsersService } from '../users/users.service';
import { CreateContributionsPaidInput } from './dto/create-contributions-paid.input';
import { UpdateContributionsPaidInput } from './dto/update-contributions-paid.input';
import { ContributionsPaid } from './entities/contributions-paid.entity';

@Injectable()
export class ContributionsPaidService {
  constructor(
    @InjectRepository(ContributionsPaid)
    private conPaidRespository: Repository<ContributionsPaid>,
    private userService: UsersService,
    private contributionService: ContributionsService,
  ) {}

  create(createContributionsPaidInput: CreateContributionsPaidInput) {
    return this.conPaidRespository.save(createContributionsPaidInput);
  }

  findAll() {
    return this.conPaidRespository.find();
  }

  findOne(id: number) {
    return this.conPaidRespository.findOneOrFail(id);
  }

  async update(id: number, { status }: UpdateContributionsPaidInput) {
    const contrPaid = await this.conPaidRespository.findOneOrFail(id);
    contrPaid.status = status;
    return this.conPaidRespository.save(contrPaid);
  }

  async remove(id: number) {
    const contrPaid = await this.conPaidRespository.findOneOrFail(id);
    contrPaid.status = GenericStaus.DELETED;
    return this.conPaidRespository.save(contrPaid);
  }

  public findAllByUser(userId: number) {
    return this.conPaidRespository.find({ where: { userId } });
  }

  /* FOR FIELD RESOLVERS */

  public getUser(userId: number) {
    return this.userService.findOne(userId);
  }

  public getContribution(contributionId: number) {
    return this.contributionService.findOne(contributionId);
  }
}
