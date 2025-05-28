import { Module } from '@nestjs/common';
import { StudentGroupsService } from './student_groups.service';
import { StudentGroupsController } from './student_groups.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { StudentGroup } from './entities/student_group.entity';
import { Group } from '../groups/entities/group.entity';
import { Student } from '../students/entities/student.entity';

@Module({
    imports:[TypeOrmModule.forFeature([StudentGroup,Group,Student])],
  controllers: [StudentGroupsController],
  providers: [StudentGroupsService],
  exports:[StudentGroupsService]
})
export class StudentGroupsModule {}
