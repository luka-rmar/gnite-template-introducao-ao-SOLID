import { User } from "../../model/User";
import { IUsersRepository } from "../../repositories/IUsersRepository";

interface IRequest {
  user_id: string;
}

class ListAllUsersUseCase {
  constructor(private usersRepository: IUsersRepository) {}

  execute({ user_id }: IRequest): User[] {
    const userAdmin = this.usersRepository.findById(user_id);

    if (!userAdmin) throw new Error("User is not found");
    if (!userAdmin.admin) throw new Error("User is not admin");

    const allUser = this.usersRepository.list();

    return allUser;
  }
}

export { ListAllUsersUseCase };
