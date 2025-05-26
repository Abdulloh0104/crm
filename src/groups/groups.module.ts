import { Module } from '@nestjs/common';
import { GroupsService } from './groups.service';
import { GroupsController } from './groups.controller';
import { Group } from './entities/group.entity';
import { CoursesModule } from '../courses/courses.module';
import { Course } from '../courses/entities/course.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GroupsResolver } from './groups.resolver';

@Module({
  imports:[TypeOrmModule.forFeature([Group,Course]),CoursesModule],
  controllers: [GroupsController],
  providers: [GroupsService,GroupsResolver],
  exports:[GroupsService,]
})
export class GroupsModule {}
