import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, Matches, MinLength } from 'class-validator';
import { CommonMethods } from 'src/commons/utils/common-methods';

export class CreateUserDto {
  @ApiProperty({
    example: 'xyz@gmail.com',
    description: 'Email of the user',
    required: true,
  })
  @IsString({ message: CommonMethods.getErrorMsgCombinedString('VIS_1017') })
  email: string;

  @ApiProperty({
    example: 'Sunil',
    description: 'Username for the user',
  })
  @IsString({ message: CommonMethods.getErrorMsgCombinedString('USR_1003') })
  @IsNotEmpty({ message: CommonMethods.getErrorMsgCombinedString('USR_1004') })
  username: string;

  @ApiProperty({
    example: '9999999999',
    description: 'Unique phone number of the user',
  })
  @IsString({ message: CommonMethods.getErrorMsgCombinedString('USR_1004') })
  @IsNotEmpty({ message: CommonMethods.getErrorMsgCombinedString('USR_1006') })
  phone?: string;

  @ApiProperty({
    description: 'Password of the user',
    minLength: 8,
    example: 'StrongPass1@',
  })
  @IsString()
  @MinLength(8, {
    message: CommonMethods.getErrorMsgCombinedString('USR_1008'),
  })
  @Matches(
    /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
    { message: CommonMethods.getErrorMsgCombinedString('USR_1010') },
  )
  @IsNotEmpty({ message: CommonMethods.getErrorMsgCombinedString('USR_1009') })
  password: string;

  @ApiProperty()
  @IsNotEmpty({
    message: CommonMethods.getErrorMsgCombinedString('USR_PRMS_1001'),
  })
  role_id: string;
}
