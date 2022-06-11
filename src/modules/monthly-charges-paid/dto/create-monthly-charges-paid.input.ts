import { InputType, Int, Field } from '@nestjs/graphql';
import { IsDate, IsDateString, IsNotEmpty } from 'class-validator';

@InputType()
export class CreateMonthlyChargesPaidInput {
  @IsDate()
  @Field()
  date: Date;

  @IsNotEmpty()
  @Field()
  amount: number;

  @IsNotEmpty()
  @Field()
  userId: number;

  @IsNotEmpty()
  @Field()
  monthlyChargeId: number;
}
