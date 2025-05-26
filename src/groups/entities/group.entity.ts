import { Field, ID, ObjectType } from "@nestjs/graphql";
import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Course } from "../../courses/entities/course.entity";

@ObjectType()
@Entity()
export class Group {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column()
  name: string;

  @Field({ nullable: true })
  @Column({ nullable: true })
  start_date: Date;

  @Field({ nullable: true })
  @Column({ nullable: true })
  end_date: Date;

  @Field({ nullable: true })
  @Column({
    type: "enum",
    enum: ["ok", "opened","ended"],
    nullable: true,
  })
  status: string;

  @ManyToOne((type) => Course, (author) => author.groups)
  @Field((type) => Course)
  course: Course;
}