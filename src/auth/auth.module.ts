import { Module } from "@nestjs/common";
// import { AuthPatientService } from "./patient/auth.service";
// import { AuthPatientController } from "./patient/auth.controller";
import { JwtModule } from "@nestjs/jwt";
import { AuthAdminController } from "./admin/auth.controller";
import { AuthAdminService } from "./admin/auth.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Admin } from "../admin/entities/admin.entity";
import { AdminModule } from "../admin/admin.module";
import { TeacherModule } from "../teacher/teacher.module";
import { AuthTeacherController } from "./teacher/auth.controller";
import { AuthTeacherService } from "./teacher/auth.service";
import { StudentsModule } from "../students/students.module";
import { AuthStudentController } from "./student/auth.controller";
import { AuthStudentService } from "./student/auth.service";

@Module({
  imports: [
    JwtModule.register({ global: true }),
    AdminModule,
    TeacherModule,
    StudentsModule,
  ],
  controllers: [
    AuthAdminController,
    AuthTeacherController,
    AuthStudentController,
  ],
  providers: [AuthAdminService, AuthTeacherService, AuthStudentService],
})
export class AuthModule {}
