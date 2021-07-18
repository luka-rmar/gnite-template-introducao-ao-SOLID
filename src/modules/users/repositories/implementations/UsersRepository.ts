/* eslint-disable no-param-reassign */
import { User } from "../../model/User";
import { IUsersRepository, ICreateUserDTO } from "../IUsersRepository";

class UsersRepository implements IUsersRepository {
  private users: User[];

  private static INSTANCE: UsersRepository;

  private constructor() {
    this.users = [];
  }

  public static getInstance(): UsersRepository {
    if (!UsersRepository.INSTANCE) {
      UsersRepository.INSTANCE = new UsersRepository();
    }

    return UsersRepository.INSTANCE;
  }

  create({ name, email }: ICreateUserDTO): User {
    const userModel = new User();

    const newUser = {
      name,
      email,
    };

    Object.assign(userModel, newUser);

    this.users.push(userModel);

    return userModel;
  }

  findById(id: string): User | undefined {
    const findUser = this.users.find((user) => user.id === id);

    return findUser;
  }

  findByEmail(email: string): User | undefined {
    const findUser = this.users.find((user) => user.email === email);

    return findUser;
  }

  turnAdmin(receivedUser: User): User {
    if (!receivedUser.admin) {
      receivedUser.admin = true;
      receivedUser.updated_at = new Date();
    }

    return receivedUser;
  }

  list(): User[] {
    const allUsers = this.users;

    return allUsers;
  }
}

export { UsersRepository };
