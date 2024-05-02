import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from './create-user.dto';
import { IsBoolean, IsOptional } from 'class-validator';

//el extends se usa prara heredar lo que tenga la clase que se entrega despues y el partialType significa que es opcional
export class UpdateUserDto extends PartialType(CreateUserDto) {
  @IsBoolean()
  @IsOptional()
  active?: true;
}
