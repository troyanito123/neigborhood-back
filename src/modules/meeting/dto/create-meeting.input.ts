import { InputType, Int, Field } from '@nestjs/graphql';
import { IsDate, IsNotEmpty } from 'class-validator';

@InputType()
export class CreateMeetingInput {
  @IsNotEmpty()
  @Field()
  name: string;

  @IsNotEmpty()
  @Field()
  description: string;

  @IsNotEmpty()
  @IsDate()
  @Field()
  date: Date;

  @IsNotEmpty()
  @Field((type) => Int)
  fine: number;
}
