import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateUserDto {
  //implementamos las validaciones desde class que debera tener nuesto CreateUSerDto para su creacion
  @IsNumber()
  @IsNotEmpty()
  id: number;
  @IsString()
  name: string;
  @IsString()
  lastname: string;
  @IsNumber()
  age: number;
}
