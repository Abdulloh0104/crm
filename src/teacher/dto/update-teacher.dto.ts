import { PartialType } from "@nestjs/mapped-types";
import { CreateTeacherDto } from "./create-teacher.dto";
import { Field, InputType } from "@nestjs/graphql";

@InputType()
export class UpdateTeacherDto {
  @Field({ nullable: true })
  first_name?: string;

  @Field({ nullable: true })
  last_name?: string;

  @Field({ nullable: true })
  email?: string;

  @Field({ nullable: true })
  phone?: string;

  @Field({ nullable: true })
  role?: string;
}
