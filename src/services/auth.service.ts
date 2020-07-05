import {repository} from '@loopback/repository';
import {Keys} from '../keys/keys';
import {User} from '../models';
import Credentials from '../models/credentials.mode';
import {UserRepository} from '../repositories';
import {Encryption} from './encryption.service';
const jwt = require('jsonwebtoken');

export class AuthService {
  constructor(
    @repository(UserRepository)
    public userRepository: UserRepository
  ) {}

  async identify(credentials: Credentials): Promise<User | false> {
    let user = await this.userRepository.findOne({where: {email: credentials.email}})
    if (user) {
      let pass = new Encryption(Keys.SHA_512).Encrypt(credentials.password);
      if (pass === user.password) {
        return user;
      }
    }
    return false
  }

  async generateToken(user: User): Promise<String> {
    user.password = '';
    let token = jwt.sign({
      exp: Keys.TOKEN_EXP,
      data: {
        id: user.id,
        username: user.firstName,

      }
    }, Keys.JWT_SECRET_KEY);
    return token;
  }
}
