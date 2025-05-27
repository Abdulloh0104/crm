import { Field, ID, ObjectType } from "@nestjs/graphql";
import { Column, Entity,  ManyToMany, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Group } from "../../groups/entities/group.entity";
import { Exclude, Expose } from "class-transformer";

@Exclude() // default: hech narsa ko‘rsatma
@ObjectType()
@Entity()
export class Teacher {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id: number;

  @Expose()
  @Field({ nullable: true })
  @Column({ nullable: true })
  first_name: string;

  @Expose()
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
  @Column({
    type: "enum",
    enum: ["teacher", "head", "support"],
    default: "teacher",
  })
  role: string;

  @Field()
  @Column({ default: true })
  is_active: boolean;

  @ManyToMany(() => Group, (group) => group.teachers, {
    // cascade: true, // grouplar create bo‘lsa, teacherga ham bog‘lanadi
  })
  groups: Group[];
}
