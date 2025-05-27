import { Field, InputType } from "@nestjs/graphql";

@InputType()
export class UpdateGroupDto {
  @Field({ nullable: true })
  name?: string;

  @Field({ nullable: true })
  start_date?: Date;

  @Field({ nullable: true })
  end_date?: Date;

  @Field({ nullable: true })
  status?: string;

  @Field({ nullable: true })
  course_id?: number;

  @Field({ nullable: true })
  teacher_id?: number;
}
