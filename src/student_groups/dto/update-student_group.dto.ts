import { Field, InputType } from "@nestjs/graphql";

@InputType()
export class UpdateStudentGroupDto {
  @Field({ nullable: true })
  period: string;

  @Field({ nullable: true })
  is_active: boolean;

  @Field({ nullable: true })
  group_id?: number;

  @Field({ nullable: true })
  student_id?: number;
}
