import { Field, InputType } from "@nestjs/graphql";

@InputType()
export class CreateAdminDto {
  @Field({ nullable: true })
  first_name: string;

  @Field({ nullable: true })
  last_name: string;

  @Field()
  email: string;

  @Field({ nullable: true })
  phone: string;

  @Field()
  password: string;

  @Field()
  confirm_password: string;
}
