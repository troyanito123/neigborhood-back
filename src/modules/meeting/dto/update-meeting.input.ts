import { InputType, Field, Int } from '@nestjs/graphql';
import { IsDate, IsEnum, IsNotEmpty } from 'class-validator';
import { GenericStaus } from 'src/modules/generic-enums';

@InputType()
export class UpdateMeetingInput {
  @Field((type) => Int)
  id: number;

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

  @Field({ nullable: true })
  conclutions?: string;

  @IsNotEmpty()
  @IsEnum(GenericStaus)
  @Field()
  status: GenericStaus;
}
