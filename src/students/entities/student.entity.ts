
import { Field, ID, ObjectType } from "@nestjs/graphql";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

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
  @Column({ default: true})
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
}
