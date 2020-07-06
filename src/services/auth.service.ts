import {repository} from '@loopback/repository';
import {Keys} from '../keys/keys';
import {User} from '../models';
import {UserRepository} from '../repositories';
import {Encryption} from './encryption.service';
const jwt = require('jsonwebtoken');

export class AuthService {
  constructor(
    @repository(UserRepository)
    public userRepository: UserRepository
  ) {}

  async identify(email: string, password: string): Promise<User | false> {
    let user = await this.userRepository.findOne({where: {email: email}})
    if (user) {
      let pass = new Encryption(Keys.SHA_512).Encrypt(password);
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
        username: user.firstName
      }
    }, Keys.JWT_SECRET_KEY);
    return token;
  }

  async VerifyToken(token: string) {
    try {
      let data = jwt.verify(token, Keys.JWT_SECRET_KEY).data;
      return data;
    } catch (error) {
      return false;
    }
  }
}
