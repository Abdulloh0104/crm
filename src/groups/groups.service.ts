import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from "@nestjs/common";
import { CreateGroupDto } from "./dto/create-group.dto";
import { UpdateGroupDto } from "./dto/update-group.dto";
import { Group } from "./entities/group.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Course } from "../courses/entities/course.entity";
import { Teacher } from "../teacher/entities/teacher.entity";

@Injectable()
export class GroupsService {
  constructor(
    @InjectRepository(Group) private readonly groupRepo: Repository<Group>,
    @InjectRepository(Course) private readonly courseRepo: Repository<Course>,
    @InjectRepository(Teacher) private readonly teacherRepo: Repository<Teacher>
  ) {}
  async create(createGroupDto: CreateGroupDto) {
    const { course_id, teacher_id, ...rest } = createGroupDto;
    const course = await this.courseRepo.findOneBy({ id: course_id });

    if (!course) {
      throw new BadRequestException("Course not found");
    }

   let teachers: Teacher[] = [];
    if (teacher_id) {
      const teacher = await this.teacherRepo.findOneBy({ id: teacher_id });
      if (!teacher) {
        throw new BadRequestException("Teacher not found");
      }

      teachers.push(teacher);
    }
    // const newGroup = this.groupRepo.create({ ...rest, course });
    // return this.groupRepo.save(newGroup);
    
    const group = this.groupRepo.create({
      ...rest,
      course,
      teachers
    });
    return await this.groupRepo.save(group);
    
  }

  findAll() {
    return this.groupRepo.find({ relations: ["course", "teachers"] });
  }

  findOne(id: number) {
    return this.groupRepo.findOneBy({ id });
  }

  async update(id: number, updateGroupDto: UpdateGroupDto) {
    const group = await this.groupRepo.findOne({
      where: { id },
      relations: ["course","teachers"],
    });

    if (!group) {
      throw new NotFoundException(`Group with id ${id} not found`);
    }

    const { course_id, ...rest } = updateGroupDto;

    // Fix is here:
    let courseToAssign: Course | null = group.course;

    if (course_id !== undefined) {
      if (course_id === null) {
        courseToAssign = null;
      } else {
        const newCourse = await this.courseRepo.findOneBy({ id: course_id });
        if (!newCourse) {
          throw new BadRequestException(
            `Course with id ${course_id} not found`
          );
        }
        courseToAssign = newCourse;
      }
    }

    const updatedGroup = this.groupRepo.merge(group, {
      ...rest,
      course: courseToAssign ?? undefined, // Fix is here
    });

    return this.groupRepo.save(updatedGroup);
  }
  async remove(id: number) {
    const group = await this.groupRepo.findOneBy({ id });
    if (!group) {
      throw new NotFoundException(`Group with id not found`);
    }
    await this.groupRepo.delete(id);
    return id;
  }
}
