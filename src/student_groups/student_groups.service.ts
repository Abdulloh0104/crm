import { Injectable, NotFoundException } from "@nestjs/common";
import { CreateStudentGroupDto } from "./dto/create-student_group.dto";
import { UpdateStudentGroupDto } from "./dto/update-student_group.dto";
import { InjectRepository } from "@nestjs/typeorm";
import { StudentGroup } from "./entities/student_group.entity";
import { Repository } from "typeorm";
import { Group } from "../groups/entities/group.entity";
import { Student } from "../students/entities/student.entity";

@Injectable()
export class StudentGroupsService {
  constructor(
    @InjectRepository(StudentGroup)
    private readonly sgRepo: Repository<StudentGroup>,
    @InjectRepository(Group) private readonly groupRepo: Repository<Group>,
    @InjectRepository(Student) private readonly studentRepo: Repository<Student>
  ) {}
  async create(createStudentGroupDto: CreateStudentGroupDto) {
    const { student_id, group_id, period, is_active } = createStudentGroupDto;
    const student = await this.studentRepo.findOneBy({ id: student_id });
    const group = await this.groupRepo.findOneBy({ id: group_id });

    if (!student || !group) {
      throw new NotFoundException("Student or Group not found");
    }

    const studentGroup = this.sgRepo.create({
      student,
      group,
      period,
      is_active,
    });

    return this.sgRepo.save(studentGroup);
  }

  findAll() {
    return this.sgRepo.find({ relations: ["group", "student"] });
  }

  findOne(id: number) {
    return this.sgRepo.findOneBy({ id });
  }

  async update(id: number, updateStudentGroupDto: UpdateStudentGroupDto) {
    const user = await this.sgRepo.preload({ id, ...updateStudentGroupDto });
    if (!user) {
      throw new NotFoundException(`Course with ${id} id not found`);
    }

    return this.sgRepo.save(user);
  }

  async remove(id: number) {
    await this.sgRepo.delete(id);
    return id;
  }

  async addStudentToGroup(studentId: number, groupId: number, period?: string) {
    const student = await this.studentRepo.findOneBy({ id: studentId });
    if (!student) {
      throw new NotFoundException(`Student with id ${studentId} not found`);
    }

    const group = await this.groupRepo.findOneBy({ id: groupId });
    if (!group) {
      throw new NotFoundException(`Group with id ${groupId} not found`);
    }

    const studentGroup = this.sgRepo.create({
      student,
      group,
      period,
      is_active: true,
    });

    return this.sgRepo.save(studentGroup);
  }

  // ✅ 2. Bitta groupdagi studentlarni olish
  async getStudentsByGroup(groupId: number) {
    const studentGroups = await this.sgRepo.find({
      where: { group: { id: groupId }, is_active: true },
      relations: ["student"],
    });

    return studentGroups.map((sg) => sg.student);
  }

  // ✅ 3. Bitta student tegishli bo‘lgan grouplar
  async getGroupsByStudent(studentId: number) {
    const studentGroups = await this.sgRepo.find({
      where: { student: { id: studentId }, is_active: true },
      relations: ["group"],
    });

    return studentGroups.map((sg) => sg.group);
  }
}
