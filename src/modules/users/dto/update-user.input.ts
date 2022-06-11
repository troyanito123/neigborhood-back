import { InputType, Field, Int } from '@nestjs/graphql';
import { IsEnum, IsNotEmpty } from 'class-validator';
import { GenericStaus } from 'src/modules/generic-enums';

@InputType()
export class UpdateUserInput {
  @IsNotEmpty()
  @Field((type) => Int)
  id: number;

  @IsNotEmpty()
  @Field()
  displayName: string;

  @IsEnum(GenericStaus)
  @Field()
  status: GenericStaus;

  @IsNotEmpty()
  @Field((type) => Int)
  roleId: number;
}
