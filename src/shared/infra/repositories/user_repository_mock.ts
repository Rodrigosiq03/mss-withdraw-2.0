import { User } from '../../domain/entities/user'
import { STATE } from '../../domain/enums/state_enum'
import { IUserRepository } from '../../domain/repositories/user_repository_interface'

export class UserRepositoryMock implements IUserRepository {
  private users: User[] = [
    new User({
      id: 1,
      name: 'user1',
      email: 'user1@gmail.com',
      state: STATE.PENDING,
    }),
    new User({
      id: 2,
      name: 'user2',
      email: 'user2@gmail.com',
      state: STATE.PENDING,
    }),
  ]
}
