import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from "@nestjs/common";
import { GroupsService } from "./groups.service";
import { CreateGroupDto } from "./dto/create-group.dto";
import { UpdateGroupDto } from "./dto/update-group.dto";
import { plainToInstance } from "class-transformer";
import { Teacher } from "../teacher/entities/teacher.entity";

@Controller("groups")
export class GroupsController {
  constructor(private readonly groupsService: GroupsService) {}

  @Post()
  create(@Body() createGroupDto: CreateGroupDto) {
    return this.groupsService.create(createGroupDto);
  }

  @Get()
  async findAll() {
    const groups = await this.groupsService.findAll();
    return groups.map((group) => ({
      ...group,
      teachers: plainToInstance(Teacher, group.teachers),
    }));
  }

  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.groupsService.findOne(+id);
  }

  @Patch(":id")
  update(@Param("id") id: string, @Body() updateGroupDto: UpdateGroupDto) {
    return this.groupsService.update(+id, updateGroupDto);
  }

  @Delete(":id")
  remove(@Param("id") id: string) {
    return this.groupsService.remove(+id);
  }
}
