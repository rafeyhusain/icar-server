import { IsInt, IsNumber, IsString } from 'class-validator';
import { Type } from 'class-transformer';

export class CreateCarDto {
  @IsInt()
  public year: number;

  @IsString()
  public make: string;

  @IsNumber()
  public fuel: number;

  @IsNumber()
  public maintenance: number;
}
