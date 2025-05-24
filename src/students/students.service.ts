import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from "@nestjs/common";
import { CreateStudentDto } from "./dto/create-student.dto";
import { UpdateStudentDto } from "./dto/update-student.dto";
import { Student } from "./entities/student.entity";
import { Repository } from "typeorm";
import * as bcrypt from "bcrypt";

import { InjectRepository } from "@nestjs/typeorm";
import { UpdatePasswordDto } from "../admin/dto/update-password.dto";

@Injectable()
export class StudentsService {
  constructor(
    @InjectRepository(Student) private readonly studentRepo: Repository<Student>
  ) {}
  async create(createStudentDto: CreateStudentDto) {
    const { password, confirm_password } = createStudentDto;
    if (password !== confirm_password) {
      throw new BadRequestException("Parollar mos emas");
    }
    const hashed_password = await bcrypt.hash(password, 7);
    return this.studentRepo.save({
      ...createStudentDto,
      password: hashed_password,
    });
  }

  findAll() {
   return this.studentRepo.find();
  }

  findOne(id: number) {
    return this.studentRepo.findOneBy({ id });
  }

  findStudentByEmail(email: string) {
    return this.studentRepo.findOneBy({ email });
  }

  async update(id: number, updateStudentDto: UpdateStudentDto) {
    const user = await this.studentRepo.preload({ id, ...updateStudentDto });
    if (!user) {
      throw new NotFoundException(`User with ${id} id not found`);
    }

    return this.studentRepo.save(user);
  }

  async updateRefreshToken(id: number, hashed_refresh_token: string) {
    const updatedUser = await this.studentRepo.update(
      { id },
      { hashed_refresh_token }
    );
    return updatedUser;
  }

  async updatePassword(id: number, updatePasswordDto: UpdatePasswordDto) {
    const user = await this.studentRepo.findOneBy({ id });
    if (!user || !user.password) {
      throw new NotFoundException("user not found");
    }

    const { password, newPassword, confirm_password } = updatePasswordDto;
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      throw new BadRequestException("Forbidden");
    }

    if (newPassword !== confirm_password) {
      throw new BadRequestException("Parollar mos emas");
    }
    const hashed_password = await bcrypt.hash(newPassword, 7);
    await this.studentRepo.update(
      { id },
      {
        ...user,
        password: hashed_password,
      }
    );
    return { message: "Student password was changed" };
  }

  async remove(id: number) {
    await this.studentRepo.delete({ id });
    return id;
  }
}
