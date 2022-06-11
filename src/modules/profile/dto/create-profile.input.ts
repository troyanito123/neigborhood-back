import { InputType, Int, Field } from '@nestjs/graphql';
import { IsNotEmpty } from 'class-validator';

@InputType()
export class CreateProfileInput {
  @IsNotEmpty()
  @Field(() => Int)
  userId: number;
}
