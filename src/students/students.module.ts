import { Module } from "@nestjs/common";
import { StudentsService } from "./students.service";
import { StudentsController } from "./students.controller";
import { StudentsResolver } from "./students.resolver";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Student } from "./entities/student.entity";
import { StudentGroup } from "../student_groups/entities/student_group.entity";

@Module({
  imports: [TypeOrmModule.forFeature([Student,StudentGroup])],
  controllers: [StudentsController],
  providers: [StudentsService, StudentsResolver],
  exports: [StudentsService],
})
export class StudentsModule {}
