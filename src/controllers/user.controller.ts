import {
  Count,
  CountSchema,
  Filter,
  FilterExcludingWhere,
  repository,
  Where,
} from '@loopback/repository';
import {
  del,
  get,
  getModelSchemaRef,
  HttpErrors,
  param,
  patch,
  post,
  put,
  requestBody,
} from '@loopback/rest';
import {Keys} from '../keys/keys';
import {User} from '../models';
import Credentials from '../models/credentials.mode';
import PasswordResetData from '../models/password-reset-data.mode';
import {UserRepository} from '../repositories';
import {AuthService} from '../services/auth.service';
import {Encryption} from '../services/encryption.service';

export class UserController {
  authService: AuthService;

  constructor(
    @repository(UserRepository)
    public userRepository: UserRepository,
  ) {
    this.authService = new AuthService(this.userRepository);
  }

  @post('/user', {
    responses: {
      '200': {
        description: 'User model instance',
        content: {'application/json': {schema: getModelSchemaRef(User)}},
      },
    },
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(User, {
            title: 'NewUser',
            exclude: ['id'],
          }),
        },
      },
    })
    user: Omit<User, 'id'>,
  ): Promise<User> {
    let paconstord = new Encryption(Keys.SHA_512).Encrypt(user.password);
    let password1 = new Encryption(Keys.SHA_512).Encrypt(paconstord);
    user.password = password1;
    return this.userRepository.create(user);
  }

  @get('/user/count', {
    responses: {
      '200': {
        description: 'User model count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async count(@param.where(User) where?: Where<User>): Promise<Count> {
    return this.userRepository.count(where);
  }

  @get('/user', {
    responses: {
      '200': {
        description: 'Array of User model instances',
        content: {
          'application/json': {
            schema: {
              type: 'array',
              items: getModelSchemaRef(User, {includeRelations: true}),
            },
          },
        },
      },
    },
  })
  async find(@param.filter(User) filter?: Filter<User>): Promise<User[]> {
    return this.userRepository.find(filter);
  }

  @patch('/user', {
    responses: {
      '200': {
        description: 'User PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(User, {partial: true}),
        },
      },
    })
    user: User,
    @param.where(User) where?: Where<User>,
  ): Promise<Count> {
    return this.userRepository.updateAll(user, where);
  }

  @get('/user/{id}', {
    responses: {
      '200': {
        description: 'User model instance',
        content: {
          'application/json': {
            schema: getModelSchemaRef(User, {includeRelations: true}),
          },
        },
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.filter(User, {exclude: 'where'}) filter?: FilterExcludingWhere<User>,
  ): Promise<User> {
    return this.userRepository.findById(id, filter);
  }

  @patch('/user/{id}', {
    responses: {
      '204': {
        description: 'User PATCH success',
      },
    },
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(User, {partial: true}),
        },
      },
    })
    user: User,
  ): Promise<void> {
    await this.userRepository.updateById(id, user);
  }

  @put('/user/{id}', {
    responses: {
      '204': {
        description: 'User PUT success',
      },
    },
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() user: User,
  ): Promise<void> {
    await this.userRepository.replaceById(id, user);
  }

  @del('/user/{id}', {
    responses: {
      '204': {
        description: 'User DELETE success',
      },
    },
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.userRepository.deleteById(id);
  }

  @post('/login', {
    responses: {
      '200': {
        description: 'Login',
      },
    },
  })
  async login(@requestBody() credentials: Credentials): Promise<Object> {
    let user = await this.authService.identify(
      credentials.email,
      credentials.password,
    );
    if (user) {
      let token = await this.authService.generateToken(user);
      return {
        data: user,
        token: token,
      };
    } else {
      throw new HttpErrors[401]('Usuario o contraseña invalidad');
    }
  }

  @post('/password-reset', {
    responses: {
      '200': {
        description: 'Login',
      },
    },
  })
  async reset(
    @requestBody() passwordResetData: PasswordResetData,
  ): Promise<Object> {
    let randomPassword = this.authService.ResetPassword(
      passwordResetData.email,
    );
    if (randomPassword) {
      // send sms or mail with new password
      // 1. sms
      // 2. email
      switch (passwordResetData.type) {
        case 1:
          //send sms
          console.log('Sending sms: ' + randomPassword);
          return randomPassword;
          break;
        case 2:
          //send mail
          console.log('Sending mail: ' + randomPassword);
          return randomPassword;
          break;

        default:
          break;
      }
    }
    throw new HttpErrors[400]('User not found');
  }
}
