import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from "@nestjs/common";
import { StudentsService } from "./students.service";
import { CreateStudentDto } from "./dto/create-student.dto";
import { UpdateStudentDto } from "./dto/update-student.dto";

import { Args, ID, Mutation, Query, Resolver } from "@nestjs/graphql";
import { Student } from "./entities/student.entity";
import { UpdatePasswordResponse } from "../admin/dto/update-password.response.ts";
import { UpdatePasswordDto } from "../admin/dto/update-password.dto";

@Resolver("student")
export class StudentsResolver {
  constructor(private readonly studentsService: StudentsService) {}

  @Query(() => [Student])
  findAllStudents() {
    return this.studentsService.findAll();
  }

  @Query(() => Student)
  findOneStudent(@Args("id", { type: () => ID }) id: number) {
    return this.studentsService.findOne(+id);
  }

  @Mutation(() => Student)
  createStudent(@Args("createStudent") createStudentDto: CreateStudentDto) {
    return this.studentsService.create(createStudentDto);
  }

  @Mutation(() => Student)
  updateStudent(
    @Args("id", { type: () => ID }) id: number,
    @Args("updateStudent") updateStudentDto: UpdateStudentDto
  ) {
    return this.studentsService.update(+id, updateStudentDto);
  }

  @Mutation(() => UpdatePasswordResponse)
  updateStudentPassword(
    @Args("id", { type: () => ID }) id: number,
    @Args("updatePassword") updatePasswordDto: UpdatePasswordDto
  ) {
    return this.studentsService.updatePassword(+id, updatePasswordDto);
  }

  @Mutation(() => Number)
  removeStudent(@Args("id", { type: () => ID }) id: number) {
    return this.studentsService.remove(+id);
  }
}
