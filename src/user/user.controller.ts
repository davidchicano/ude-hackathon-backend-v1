import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { ApiParam, ApiTags } from '@nestjs/swagger';
import { Family } from 'src/family/entities/family.entity';
import { Expert } from 'src/expert/entities/expert.entity';
import { LoginUserDto } from './dto/login-user.dto';

@ApiTags('Users')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  create(@Body() createUserDto: CreateUserDto): Promise<User> {
    return this.userService.create(createUserDto);
  }

  @Post('login')
  @HttpCode(HttpStatus.ACCEPTED)
  login(@Body() loginUserDto: LoginUserDto): Promise<User> {
    return this.userService.login(loginUserDto);
  }

  @Get()
  @HttpCode(HttpStatus.OK)
  findAll() {
    return this.userService.findAll();
  }

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  @ApiParam({
    name: 'id',
    type: String,
    required: true,
  })
  findOne(@Param('id') id: User['id']): Promise<User> {
    return this.userService.findOne(id);
  }

  @Patch(':id')
  @HttpCode(HttpStatus.OK)
  @ApiParam({
    name: 'id',
    type: String,
    required: true,
  })
  update(
    @Param('id') id: User['id'],
    @Body() updateProfileDto: UpdateUserDto,
  ): Promise<User | null> {
    return this.userService.update(id, updateProfileDto);
  }

  @Patch(':id/family/:familyId')
  @HttpCode(HttpStatus.OK)
  @ApiParam({
    name: 'id',
    type: String,
    required: true,
  })
  @ApiParam({
    name: 'familyId',
    type: String,
    required: true,
  })
  addFamily(
    @Param('id') id: User['id'],
    @Param('familyId') familyId: Family['id'],
  ): Promise<User | null> {
    return this.userService.addFamily(id, familyId);
  }

  @Patch(':id/expert/:expertId')
  @HttpCode(HttpStatus.OK)
  @ApiParam({
    name: 'id',
    type: String,
    required: true,
  })
  @ApiParam({
    name: 'expertId',
    type: String,
    required: true,
  })
  addExpert(
    @Param('id') id: User['id'],
    @Param('expertId') expertId: Expert['id'],
  ): Promise<User | null> {
    return this.userService.addExpert(id, expertId);
  }

  @Delete(':id')
  @ApiParam({
    name: 'id',
    type: String,
    required: true,
  })
  @HttpCode(HttpStatus.NO_CONTENT)
  remove(@Param('id') id: User['id']): Promise<void> {
    return this.userService.delete(id);
  }
}
