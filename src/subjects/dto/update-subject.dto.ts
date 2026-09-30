import { Type } from 'class-transformer';
import { IsInt, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class UpdateSubjectDto {
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  code?: string;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  title?: string;

  @IsOptional()
  @Type(() => Number)
  @IsInt()
  units?: number;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  status?: string;

  @IsOptional()
  @Type(() => Number)
  @IsInt()
  yearlevel?: number;

  @IsOptional()
  @Type(() => Number)
  @IsInt()
  sem?: number;

  @IsOptional()
  @Type(() => Number)
  @IsInt()
  programId?: number;
}
