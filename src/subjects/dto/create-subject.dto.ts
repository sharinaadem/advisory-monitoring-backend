import { Type } from 'class-transformer';
import { IsInt, IsNotEmpty, IsString } from 'class-validator';

export class CreateSubjectDto {
  @IsString()
  @IsNotEmpty()
  code!: string;

  @IsString()
  @IsNotEmpty()
  title!: string;

  @Type(() => Number)
  @IsInt()
  units!: number;

  @IsString()
  @IsNotEmpty()
  status!: string;

  @Type(() => Number)
  @IsInt()
  yearlevel!: number;

  @Type(() => Number)
  @IsInt()
  sem!: number;

  @Type(() => Number)
  @IsInt()
  programId!: number;
}
