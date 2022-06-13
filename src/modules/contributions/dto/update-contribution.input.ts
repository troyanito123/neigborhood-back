import { InputType, Field, Int } from '@nestjs/graphql';
import { IsNotEmpty } from 'class-validator';

@InputType()
export class UpdateContributionInput {
  @IsNotEmpty()
  @Field((type) => Int)
  id: number;

  @IsNotEmpty()
  @Field()
  name: string;

  @IsNotEmpty()
  @Field()
  description: string;

  @IsNotEmpty()
  @Field((type) => Int)
  amount: number;

  @Field({ nullable: true })
  special?: boolean;
}
