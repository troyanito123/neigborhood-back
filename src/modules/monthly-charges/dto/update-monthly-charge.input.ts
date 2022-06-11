import { InputType, Field, Int } from '@nestjs/graphql';
import { IsNotEmpty } from 'class-validator';

@InputType()
export class UpdateMonthlyChargeInput {
  @Field(() => Int)
  id: number;

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
