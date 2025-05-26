import { Field, ID, ObjectType } from "@nestjs/graphql";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Group } from "../../groups/entities/group.entity";

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

  @OneToMany((type) => Group, (group) => group.course)
  @Field((type) => [Group])
  groups: Group[];
}
