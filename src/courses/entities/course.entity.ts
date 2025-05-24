import { Field, ID, ObjectType } from "@nestjs/graphql";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@ObjectType()
@Entity()
export class Course {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column({ unique: true })
  title: string;

  @Field({ nullable: true })
  @Column({ type: "text", nullable: true })
  description: string;

  @Field({ nullable: true })
  @Column({ nullable: true })
  price: string;

  @Field({ nullable: true })
  @Column({ nullable: true })
  duration: string;

  @Field({ nullable: true })
  @Column({ nullable: true })
  lessons_in_a_week: number;

  @Field({ nullable: true })
  @Column({ nullable: true })
  lesson_duration: string;
}
