import { BadRequestException, Injectable, NotFoundException } from "@nestjs/common";
import { CreateTeacherDto } from "./dto/create-teacher.dto";
import { UpdateTeacherDto } from "./dto/update-teacher.dto";
import { InjectRepository } from "@nestjs/typeorm";
import { Teacher } from "./entities/teacher.entity";
import { Repository } from "typeorm";
import * as bcrypt from "bcrypt";
import { UpdatePasswordDto } from "../admin/dto/update-password.dto";

@Injectable()
export class TeacherService {
  constructor(
    @InjectRepository(Teacher) private readonly teacherRepo: Repository<Teacher>
  ) {}
  async create(createTeacherDto: CreateTeacherDto) {
    const { password, confirm_password } = createTeacherDto;
    if (password !== confirm_password) {
      throw new BadRequestException("Parollar mos emas");
    }
    const hashed_password = await bcrypt.hash(password, 7);
    const newUser = await this.teacherRepo.save({
      ...createTeacherDto,
      password: hashed_password,
    });
    return { message: "New Teacher added", newUser };
  }

  findAll() {
    return this.teacherRepo.find();
  }

  findOne(id: number) {
    return this.teacherRepo.findOneBy({ id });
  }

  findTeacherByEmail(email: string) {
    return this.teacherRepo.findOneBy({ email });
  }

  update(id: number, updateTeacherDto: UpdateTeacherDto) {
    return this.teacherRepo.update({ id }, updateTeacherDto);
  }

  async updateRefreshToken(id: number, hashed_refresh_token: string) {
    const updatedUser = await this.teacherRepo.update(
      { id },
      { hashed_refresh_token }
    );
    return updatedUser;
  }

  async updatePassword(id: number, updatePasswordDto: UpdatePasswordDto) {
    const user = await this.teacherRepo.findOneBy({ id });
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
    await this.teacherRepo.update(
      { id },
      {
        ...user,
        password: hashed_password,
      }
    );
    return { message: "Doctor password was changed" };
  }

  remove(id: number) {
    return this.teacherRepo.delete(id)
  }
}
