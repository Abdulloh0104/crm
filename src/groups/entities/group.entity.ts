import { Field, ID, ObjectType } from "@nestjs/graphql";
import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Course } from "../../courses/entities/course.entity";
import { Teacher } from "../../teacher/entities/teacher.entity";
import { Student } from "../../students/entities/student.entity";
import { StudentGroup } from "../../student_groups/entities/student_group.entity";

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
    enum: ["ok", "opened", "ended"],
    nullable: true,
  })
  status: string;

  @ManyToOne((type) => Course, (author) => author.groups)
  @Field((type) => Course)
  course: Course;

  @ManyToMany(() => Teacher, (teacher) => teacher.groups, {
    cascade: true,
    onDelete: "CASCADE", // group o‘chsa, teacher.groups[] dan ham o‘chadi
  })
  @JoinTable({
    name: "teacher_groups", // Join table nomi
    joinColumn: { name: "group_id", referencedColumnName: "id" },
    inverseJoinColumn: { name: "teacher_id", referencedColumnName: "id" },
  })
  teachers: Teacher[];

  
  @OneToMany((type) => StudentGroup, (studentg) => studentg.group)
  @Field((type) => [StudentGroup])
  studentGroups: StudentGroup[];

  @ManyToMany(() => Student, (student) => student.groups)
  students: Student[];
}
