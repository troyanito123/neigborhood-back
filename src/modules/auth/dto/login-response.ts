import { Field, ObjectType } from '@nestjs/graphql';
import { User } from '../../users/entities/user.entity';

@ObjectType()
export class LoginResponse {
  @Field()
  accessToken: string;

  @Field()
  user: User;
}
