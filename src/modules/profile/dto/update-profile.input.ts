import { CreateProfileInput } from './create-profile.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';
import { IsNotEmpty } from 'class-validator';

@InputType()
export class UpdateProfileInput {
  @IsNotEmpty()
  @Field(() => Int)
  id: number;

  @Field({ nullable: true })
  name: String;

  @Field({ nullable: true })
  surname: string;

  @Field({ nullable: true })
  identificationNumer: string;

  @Field({ nullable: true })
  block: string;

  @Field({ nullable: true })
  field: string;

  @Field({ nullable: true })
  nus: string;
}
