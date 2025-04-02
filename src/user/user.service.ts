import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CommonMethods } from 'src/commons/utils/common-methods';
import { RolesRepository } from 'src/roles/repository/roles.repo';
import { UserRolesRepository } from 'src/user-roles/repository/user-roles.repo';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserRepository } from './repository/user.repo';

@Injectable()
export class UserService {
  constructor(
    private readonly userRepo: UserRepository,
    private readonly roleRepo: RolesRepository,
    private readonly userRoleRepo: UserRolesRepository,
  ) {}

  private async validateIfExistingUserByEmail(createUserDto: CreateUserDto) {
    const existingUserEmail = await this.userRepo.findOneByQuery({
      email: createUserDto.email,
    });
    if (existingUserEmail) {
      throw new BadRequestException(CommonMethods.getErrorMsg('USR_1012'));
    }
  }

  async create(createUserDto: CreateUserDto) {
    const role = await this.roleRepo.findOneById(createUserDto.role_id);
    if (!role) {
      throw new NotFoundException(CommonMethods.getErrorMsg('USR_PRMS_1003'));
    }
    await this.validateIfExistingUserByEmail(createUserDto);
    const encryptPassword = await CommonMethods.generatePasswordHash(
      createUserDto.password,
    );
    const user = await this.userRepo.createOne({
      ...createUserDto,
      password: encryptPassword as any,
    });
    const role_id = createUserDto.role_id;
    const createUserRoleData = {
      user_id: user.id,
      role_id,
      permission_entity: {
        user_id: user.id,
      },
    };
    await this.userRoleRepo.createOne(createUserRoleData);
    return user;
  }

  findAll() {
    return `This action returns all user`;
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
