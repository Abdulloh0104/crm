import { Injectable, NotFoundException } from "@nestjs/common";
import { CreateCourseDto } from "./dto/create-course.dto";
import { UpdateCourseDto } from "./dto/update-course.dto";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Course } from "./entities/course.entity";

@Injectable()
export class CoursesService {
  constructor(
    @InjectRepository(Course) private readonly courseRepo: Repository<Course>
  ) {}

  create(createCourseDto: CreateCourseDto) {
    return this.courseRepo.save(createCourseDto);
  }

  findAll() {
    return this.courseRepo.find();
  }

  findOne(id: number) {
    return this.courseRepo.findOneBy({ id });
  }

  async update(id: number, updateCourseDto: UpdateCourseDto) {
    const user = await this.courseRepo.preload({ id, ...updateCourseDto });
    if (!user) {
      throw new NotFoundException(`Course with ${id} id not found`);
    }

    return this.courseRepo.save(user);
  }

  async remove(id: number) {
    await this.courseRepo.delete(id);
    return id;
  }
}
