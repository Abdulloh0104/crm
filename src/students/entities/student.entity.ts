import { Field, ID, ObjectType } from "@nestjs/graphql";
import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Group } from "../../groups/entities/group.entity";
import { StudentGroup } from "../../student_groups/entities/student_group.entity";

@ObjectType()
@Entity()
export class Student {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id: number;

  @Field({ nullable: true })
  @Column({ nullable: true })
  first_name: string;

  @Field({ nullable: true })
  @Column({ nullable: true })
  last_name: string;

  @Field({ nullable: true })
  @Column({ nullable: true })
  phone: string;

  @Field()
  @Column({ unique: true })
  email: string;

  @Field()
  @Column()
  password: string;

  @Field({ nullable: true })
  @Column({ nullable: true })
  hashed_refresh_token?: string;

  @Field()
  @Column({ default: true })
  is_active: boolean;

  @Field({ nullable: true })
  @Column({
    nullable: true,
    type: "enum",
    enum: ["male", "female"],
  })
  gender: string;

  @Field({ nullable: true })
  @Column({ nullable: true })
  date_of_birth?: Date;

  @Field({ nullable: true })
  @Column({ nullable: true })
  avatar_url?: string;

  @OneToMany((type) => StudentGroup, (sgroup) => sgroup.student)
  @Field((type) => [StudentGroup])
  studentGroups: StudentGroup[];

  @ManyToMany(() => Group, (group) => group.students)
  @JoinTable({
    name: "student_groups",
    joinColumn: { name: "student_id", referencedColumnName: "id" },
    inverseJoinColumn: { name: "group_id", referencedColumnName: "id" },
  })
  groups: Group[];
}
