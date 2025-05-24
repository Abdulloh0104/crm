import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from "@nestjs/common";
import { AdminService } from "./admin.service";
import { CreateAdminDto } from "./dto/create-admin.dto";
import { UpdateAdminDto } from "./dto/update-admin.dto";
import { Args, ID, Mutation, Query, Resolver } from "@nestjs/graphql";
import { Admin } from "./entities/admin.entity";
import { UpdatePasswordDto } from "./dto/update-password.dto";
import { UpdatePasswordResponse } from "./dto/update-password.response.ts";

@Resolver("admin")
export class AdminResolver {
  constructor(private readonly adminService: AdminService) {}

  @Query(() => [Admin])
  findAllAdmins() {
    return this.adminService.findAll();
  }

  @Query(() => Admin)
  findOneAdmin(@Args("id", { type: () => ID }) id: number) {
    return this.adminService.findOne(+id);
  }

  @Mutation(() => Admin)
  createAdmin(@Args("createAdmin") createAdminDto: CreateAdminDto) {
    return this.adminService.create(createAdminDto);
  }

  @Mutation(() => UpdatePasswordResponse)
  updatePassword(
    @Args("id", { type: () => ID }) id: number,
    @Args("updatePassword") updatePasswordDto: UpdatePasswordDto
  ) {
    return this.adminService.updatePassword(+id, updatePasswordDto);
  }

  @Mutation(() => Admin)
  updateAdmin(
    @Args("id", { type: () => ID }) id: number,
    @Args("updateAdmin") updateAdminDto: UpdateAdminDto
  ) {
    return this.adminService.update(+id, updateAdminDto);
  }
  @Mutation(() => Admin)
  removeAdmin(@Args("id", { type: () => ID }) id: number) {
    return this.adminService.remove(+id);
  }
}
