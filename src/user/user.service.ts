import {
  Injectable,
  NotFoundException,
  NotImplementedException,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';

@Injectable()
export class UserService {
  private users: User[] = [
    { id: 1, name: 'mx', lastname: 'mx', age: 10 },
    { id: 2, name: 'jav', lastname: 'jav', age: 20 },
  ];

  create(createUserDto: CreateUserDto): number {
    console.log(createUserDto);
    let user = new User();
    user = createUserDto;
    if (!user)
      throw new NotImplementedException(`No se econtro datos para insertar`);
    this.users.push(user);
    return user.id;
  }

  //indicamos que debera regresar un array de usuarios
  findAll(): User[] {
    return this.users;
  }

  findOne(id: number): User {
    const user = this.users.find((user) => user.id === id);
    //utilizamos las funcion NotFou... de commond nest para trabajar en caso de que no encuentre ID asociado
    if (!user) throw new NotFoundException(`Este id no existe ${id}`);
    //retornamos en caso de caer en el error el user
    return user;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
