import { PartialType } from '@nestjs/mapped-types';
import { CreateAdminDto } from './create-admin.dto';
import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class UpdateAdminDto {
  @Field({ nullable: true })
  first_name: string;

  @Field({ nullable: true })
  last_name: string;

  @Field()
  email: string;

  @Field({ nullable: true })
  phone: string;

}

