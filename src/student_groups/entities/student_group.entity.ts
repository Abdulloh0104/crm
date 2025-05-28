import { Field, ID, ObjectType } from "@nestjs/graphql";
import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Group } from "../../groups/entities/group.entity";
import { Student } from "../../students/entities/student.entity";

@ObjectType()
@Entity()
export class StudentGroup {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id: number;

  @Field({ nullable: true })
  @Column({ nullable: true })
  period: string;

  @Field({ nullable: true })
  @Column({ nullable: true, default: true })
  is_active: boolean;

  // // MANY TO ONE -> Student
  // @ManyToOne(() => Student, (student) => student.studentGroups, {
  //   onDelete: "CASCADE",
  // })
  // @JoinColumn({ name: "student_id" })
  // student: Student;

  // // MANY TO ONE -> Group
  // @ManyToOne(() => Group, (group) => group.studentGroups, {
  //   onDelete: "CASCADE",
  // })
  // @JoinColumn({ name: "group_id" })
  // group: Group;

  @ManyToOne(() => Student, (student) => student.id, { onDelete: "CASCADE" })
  student: Student;

  @ManyToOne(() => Group, (group) => group.id, { onDelete: "CASCADE" })
  group: Group;
}
