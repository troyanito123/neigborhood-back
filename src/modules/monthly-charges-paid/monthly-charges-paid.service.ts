import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { GenericStaus } from '../generic-enums';
import { MonthlyChargesService } from '../monthly-charges/monthly-charges.service';
import { UsersService } from '../users/users.service';
import { CreateMonthlyChargesPaidInput } from './dto/create-monthly-charges-paid.input';
import { MonthlyChargesPaid } from './entities/monthly-charges-paid.entity';

@Injectable()
export class MonthlyChargesPaidService {
  constructor(
    @InjectRepository(MonthlyChargesPaid)
    private monthlyCPR: Repository<MonthlyChargesPaid>,
    private userService: UsersService,
    private monthlyChargeService: MonthlyChargesService,
  ) {}

  create(createMonthlyChargesPaidInput: CreateMonthlyChargesPaidInput) {
    return this.monthlyCPR.save(createMonthlyChargesPaidInput);
  }

  findAll() {
    return this.monthlyCPR.find({ where: { status: GenericStaus.ACTIVE } });
  }

  findOne(id: number) {
    return this.monthlyCPR.findOneOrFail(id, {
      where: { status: GenericStaus.ACTIVE },
    });
  }

  async remove(id: number) {
    const monthlyPaid = await this.monthlyCPR.findOne(id);
    monthlyPaid.status = GenericStaus.DELETED;
    return this.monthlyCPR.save(monthlyPaid);
  }

  async findAllByUser(userId: number) {
    return this.monthlyCPR.find({
      where: { userId, status: GenericStaus.ACTIVE },
    });
  }

  public getUser(userId: number) {
    return this.userService.findOne(userId);
  }

  public getMonthlyCharge(monthlyChargeId: number) {
    return this.monthlyChargeService.findOne(monthlyChargeId);
  }
}
