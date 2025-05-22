import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Admin {
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
  declare hashed_refresh_token?: string;

  @Column({ default: false })
  is_creator: boolean;

  @Column({ default: true })
  is_active: boolean;
}
