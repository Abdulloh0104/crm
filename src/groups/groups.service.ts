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

@Injectable()
export class GroupsService {
  constructor(
    @InjectRepository(Group) private readonly groupRepo: Repository<Group>,
    @InjectRepository(Course) private readonly courseRepo: Repository<Course>
  ) {}
  async create(createGroupDto: CreateGroupDto) {
    const { course_id, ...rest } = createGroupDto;
    const course = await this.courseRepo.findOneBy({ id: course_id });

    if (!course) {
      throw new BadRequestException("Course not found");
    }

    // const newGroup = this.groupRepo.create({ ...rest, course });
    // return this.groupRepo.save(newGroup);
    return this.groupRepo.save({ ...rest, course });
  }

  findAll() {
    return this.groupRepo.find({ relations: ["course"] });
  }

  findOne(id: number) {
    return this.groupRepo.findOneBy({ id });
  }

  async update(id: number, updateGroupDto: UpdateGroupDto) {
    const group = await this.groupRepo.findOne({
      where: { id },
      relations: ["course"],
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
