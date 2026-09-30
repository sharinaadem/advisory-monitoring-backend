import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class UpdateRemarkDto {
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  content?: string;

  @IsOptional()
  @IsString()
  category?: string;
}
