import { Field, ID, ObjectType } from "@nestjs/graphql";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@ObjectType()
@Entity()
export class Admin {
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
  declare hashed_refresh_token?: string;

  @Field()
  @Column({ default: false })
  is_creator: boolean;

  @Field()
  @Column({ default: true })
  is_active: boolean;
}
