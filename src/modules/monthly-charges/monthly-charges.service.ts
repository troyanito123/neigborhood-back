import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateMonthlyChargeInput } from './dto/create-monthly-charge.input';
import { UpdateMonthlyChargeInput } from './dto/update-monthly-charge.input';
import { MonthlyCharge } from './entities/monthly-charge.entity';

@Injectable()
export class MonthlyChargesService {
  constructor(
    @InjectRepository(MonthlyCharge)
    private monthlyChargeRepository: Repository<MonthlyCharge>,
  ) {}

  create(createMonthlyChargeInput: CreateMonthlyChargeInput) {
    return this.monthlyChargeRepository.save(createMonthlyChargeInput);
  }

  findAll() {
    return this.monthlyChargeRepository.find();
  }

  findOne(id: number) {
    return this.monthlyChargeRepository.findOneOrFail(id);
  }

  async update(id: number, updateMonthlyChargeInput: UpdateMonthlyChargeInput) {
    const monthlyCharge = await this.monthlyChargeRepository.findOne(id);
    const { id: upMc, ...rest } = updateMonthlyChargeInput;
    this.monthlyChargeRepository.merge(monthlyCharge, rest);
    return this.monthlyChargeRepository.save(monthlyCharge);
  }
}
