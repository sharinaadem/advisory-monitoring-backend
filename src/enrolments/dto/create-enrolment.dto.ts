import { Type } from 'class-transformer';
import { IsInt, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateEnrolmentDto {
  @Type(() => Number)
  @IsInt()
  studentId!: number;

  @IsString()
  @IsNotEmpty()
  academicYear!: string;

  @IsString()
  @IsNotEmpty()
  semester!: string;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  status?: string;
}
