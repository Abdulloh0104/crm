import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Teacher {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  first_name: string;

  @Column()
  last_name: string;

  @Column()
  phone: string;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @Column({ nullable: true })
  hashed_refresh_token?: string;

  @Column({
    type: "enum",
    enum: ["teacher","head","support"],
    default: 'teacher',
  })
  role: string;

  @Column({ default: true })
  is_active: boolean;
}
