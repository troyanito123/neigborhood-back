import { Field, InputType } from '@nestjs/graphql';
import { IsNotEmpty } from 'class-validator';

@InputType()
export class CreateRoleInput {
  @IsNotEmpty()
  @Field()
  code: string;

  @IsNotEmpty()
  @Field()
  displayName: string;
}
