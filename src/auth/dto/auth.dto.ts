import { IsString, IsEmail, IsNotEmpty, IsEnum, IsOptional } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class LoginDto {
   @ApiProperty()
   @IsEmail()
   email: string;
   
   @ApiProperty()
   @IsString()
   @IsOptional()
   password: string;
} 

export class RegisterDto {
   @ApiProperty()
   @IsString()
   @IsNotEmpty()
   fullName: string;
   
   @ApiProperty()
   @IsEmail()
   email: string;
   
   @ApiProperty()
   @IsString()
   @IsNotEmpty()
   password: string;
};
