import { IsEmail, IsEnum, IsNotEmpty, IsString, MinLength } from 'class-validator';
import { Role } from '@prisma/client'; // Import directly from Prisma client

export class RegisterDto {
  @IsString()
  @IsNotEmpty()
  fullName: string;

  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @MinLength(8,{ message: 'Password must be at least 8 characters long' })
  password: string;

  @IsEnum(Role) // Use Prisma's Role enum
  role: Role;
}