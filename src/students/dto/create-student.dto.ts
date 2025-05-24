import { Field, InputType } from "@nestjs/graphql";

@InputType()
export class CreateStudentDto {
  @Field({ nullable: true })
  first_name: string;

  @Field({ nullable: true })
  last_name: string;

  @Field({ nullable: true })
  phone: string;

  @Field()
  email: string;

  @Field()
  password: string;

  @Field()
  confirm_password: string;

  @Field({ nullable: true })
  gender: string;

  @Field({ nullable: true })
  date_of_birth: Date;

  @Field({ nullable: true })
  avatar_url: string;
}
