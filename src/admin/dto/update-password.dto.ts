import { Field, InputType } from "@nestjs/graphql";
import { IsString } from "class-validator";

@InputType()
export class UpdatePasswordDto {
  @Field()
  @IsString()
  password: string;

  @Field()
  @IsString()
  newPassword: string;

  @Field()
  @IsString()
  confirm_password: string;
}
