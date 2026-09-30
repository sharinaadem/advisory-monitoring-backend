import { IsNotEmpty, IsString } from 'class-validator';

export class UpdateEnrolmentDto {
  @IsString()
  @IsNotEmpty()
  status!: string;
}
