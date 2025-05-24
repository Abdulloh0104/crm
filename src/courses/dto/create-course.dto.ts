import { Field, InputType } from "@nestjs/graphql";

@InputType()
export class CreateCourseDto {
  @Field()
  title: string;

  @Field({ nullable: true })
  description: string;

  @Field({ nullable: true })
  price: string;

  @Field({ nullable: true })
  duration: string;

  @Field({ nullable: true })
  lessons_in_a_week: number;

  @Field({ nullable: true })
  lesson_duration: string;
}
