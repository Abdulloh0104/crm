import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateAdminDto } from './dto/create-admin.dto';
import { UpdateAdminDto } from './dto/update-admin.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Admin } from './entities/admin.entity';
import { Repository } from 'typeorm';
import * as bcrypt from "bcrypt";
import { UpdatePasswordDto } from './dto/update-password.dto';

@Injectable()
export class AdminService {
  constructor(
    @InjectRepository(Admin) private readonly adminRepo: Repository<Admin>
  ) {}
  async create(createAdminDto: CreateAdminDto) {
    const { password, confirm_password } = createAdminDto;
    if (password !== confirm_password) {
      throw new BadRequestException("Parollar mos emas");
    }
    const hashed_password = await bcrypt.hash(password, 7);
    const newUser = await this.adminRepo.save({
      ...createAdminDto,
      password: hashed_password,
    });
    return { message: "New doctor added", newUser };
  }

  findAll() {
    return this.adminRepo.find();
  }

  findOne(id: number) {
    return this.adminRepo.findOneBy({ id });
  }

  findAdminByEmail(email: string) {
    return this.adminRepo.findOneBy({ email });
  }

  update(id: number, updateAdminDto: UpdateAdminDto) {
    return this.adminRepo.update({ id }, updateAdminDto);
  }

  async updateRefreshToken(id: number, hashed_refresh_token: string) {
    const updatedUser = await this.adminRepo.update(
      { id },
      { hashed_refresh_token }
    );
    return updatedUser;
  }
  
  async updatePassword(id: number, updatePasswordDto: UpdatePasswordDto) {
    const user = await this.adminRepo.findOneBy({ id });
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
    await this.adminRepo.update(
      { id },
      {
        ...user,
        password: hashed_password,
      }
    );
    return { message: "Doctor password was changed" };
  }

  remove(id: number) {
    return this.adminRepo.delete(id);
  }
}
