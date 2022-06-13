import { InputType, Int, Field } from '@nestjs/graphql';
import { IsDate, IsNotEmpty } from 'class-validator';

@InputType()
export class CreateContributionsPaidInput {
  @IsNotEmpty()
  @Field((type) => Int)
  amount: number;

  @IsNotEmpty()
  @Field((type) => Int)
  userId: number;

  @IsNotEmpty()
  @Field((type) => Int)
  contributionId: number;

  @IsDate()
  @Field()
  date: Date;
}
