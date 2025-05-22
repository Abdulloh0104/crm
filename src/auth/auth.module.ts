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

@Module({
  imports: [
    JwtModule.register({ global: true }),
  AdminModule,
  TeacherModule
  ],
  controllers: [
    AuthAdminController,
    AuthTeacherController,
  ],
  providers: [
    AuthAdminService,
    AuthTeacherService
  ],
})
export class AuthModule {}
