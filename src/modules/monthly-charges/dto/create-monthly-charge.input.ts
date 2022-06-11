import { InputType, Int, Field } from '@nestjs/graphql';
import { IsNotEmpty } from 'class-validator';

@InputType()
export class CreateMonthlyChargeInput {
  @IsNotEmpty()
  @Field(() => Int)
  amount: number;

  @IsNotEmpty()
  @Field()
  month: string;

  @IsNotEmpty()
  @Field()
  year: string;
}
