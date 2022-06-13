import { InputType, Field, Int } from '@nestjs/graphql';
import { GenericStaus } from 'src/modules/generic-enums';
import { IsEnum, IsNotEmpty } from 'class-validator';

@InputType()
export class UpdateContributionsPaidInput {
  @IsNotEmpty()
  @Field(() => Int)
  id: number;

  @IsNotEmpty()
  @IsEnum(GenericStaus)
  @Field()
  status: GenericStaus;
}
