import { InputType, Field, Int } from '@nestjs/graphql';

@InputType()
export class CreateUserInput {
  @Field()
  email: string;

  @Field()
  displayName: string;

  @Field()
  password: string;

  @Field((type) => Int, { nullable: true })
  roleId?: number;
}
