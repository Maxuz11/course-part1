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
    { id: 1, name: 'mx', lastname: 'mx', age: 10, active: true },
    { id: 2, name: 'jav', lastname: 'jav', age: 20, active: false },
  ];

  create(createUserDto: CreateUserDto): number {
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
    const { lastname, active } = updateUserDto;
    //llamo a la funcion para econtrar el usuario
    const user = this.findOne(id);
    //aqui indico que si active y lastname son distinto de undefined que tomen el valor de las columnas señaladas.
    if (lastname !== undefined) user.lastname = lastname;
    if (active !== undefined) user.active = active;
    //aqui mapeamos para alterar lo que se tiene en la bda o en el storage
    this.users = this.users.map((dbUser) => {
      if (dbUser.id === id) return user;
      return dbUser;
    });
    return `Update correct the #${id} user`;
  }

  remove(id: number): string {
    this.findOne(id);
    //aqui indicamos que el array de User sera el cual no tenga el objeto con el id señalado
    this.users = this.users.filter((user) => user.id !== id);
    return `Removes the #${id} user was succed`;
  }
}
