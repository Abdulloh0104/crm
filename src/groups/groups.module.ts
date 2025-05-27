import { Module } from '@nestjs/common';
import { GroupsService } from './groups.service';
import { GroupsController } from './groups.controller';
import { Group } from './entities/group.entity';
import { CoursesModule } from '../courses/courses.module';
import { Course } from '../courses/entities/course.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GroupsResolver } from './groups.resolver';
import { Teacher } from '../teacher/entities/teacher.entity';
import { TeacherModule } from '../teacher/teacher.module';

@Module({
  imports:[TypeOrmModule.forFeature([Group,Course,Teacher]),CoursesModule,TeacherModule],
  controllers: [GroupsController],
  providers: [GroupsService,GroupsResolver],
  exports:[GroupsService,]
})
export class GroupsModule {}
