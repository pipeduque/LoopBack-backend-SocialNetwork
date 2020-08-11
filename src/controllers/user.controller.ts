import {authenticate} from '@loopback/authentication';
import {
  Count,
  CountSchema,
  Filter,
  FilterExcludingWhere,
  repository,
  Where
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
  requestBody
} from '@loopback/rest';
import {Keys} from '../keys/keys';
import {User} from '../models';
import changePasswordData from '../models/change-password.model';
import Credentials from '../models/credentials.mode';
import {EmailNotification} from '../models/email-notification.model';
import PasswordResetData from '../models/password-reset-data.mode';
import {SmsNotification} from '../models/sms-notification.model';
import {UserRepository} from '../repositories';
import {AuthService} from '../services/auth.service';
import {Encryption} from '../services/encryption.service';
import {NotificationService} from '../services/notification.service';

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
    // let randomPassword = generate({
    //   length: PasswordKeys.LENGTH,
    //   numbers: PasswordKeys.NUMBERS,
    //   lowercase: PasswordKeys.LOWERCASE,
    //   uppercase: PasswordKeys.UPPERCASE,
    // });
    let password = new Encryption(Keys.SHA_512).Encrypt(user.password);
    user.password = password;
    return this.userRepository.create(user);
  }

  @authenticate('TokenAdminStrategy')
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

  @authenticate('TokenUserStrategy')
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

  @authenticate('TokenUserStrategy')
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

  @authenticate('TokenUserStrategy')
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

  @authenticate('TokenUserStrategy')
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

  @authenticate('TokenUserStrategy')
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

  @authenticate('TokenUserStrategy')
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
      throw new HttpErrors[401]('Usuario o contraseña invalida');
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
  ): Promise<boolean> {
    let randomPassword = await this.authService.ResetPassword(
      passwordResetData.email,
    );

    if (randomPassword) {
      // send sms or mail with new password
      // 1. sms
      // 2. email
      let user = await this.userRepository.findOne({
        where: {email: passwordResetData.email},
      });

      console.log('password: ' + randomPassword);
      // console.log('phone number is: ' + user?.cellphone);

      switch (passwordResetData.type) {
        case 1:
          //send sms
          if (user) {
            let notification = new SmsNotification({
              body: `Su nueva contraseña es: ${randomPassword}`,
              to: `${user.cellphone}`,
            });
            // console.log(
            //   `El usuario es ${user} y la notificacion es: ${notification}`,
            // );
            let sms = await new NotificationService().SmsNotification(
              notification,
            );
            console.log(`el sms es ${sms}`);
            if (sms) {
              console.log('sms message send');
              return true;
            }
            throw new HttpErrors[400]('Phone is not found');
            // console.log('Sending sms: ' + randomPassword);
            // return randomPassword;
          }
          throw new HttpErrors[400]('user not found');
          break;
        case 2:
          //send mail
          if (user) {
            let notification = new EmailNotification({
              textBody: `Su nueva contraseña es: ${randomPassword}`,
              htmlBody: `Su nueva contraseña es: ${randomPassword}`,
              to: user.email,
              subject: 'Nueva contraseña',
            });
            let mail = await new NotificationService().MailNotification(
              notification,
            );
            console.log(`mail is : ${mail}`);
            if (mail) {
              console.log('mail message send');
              return true;
            }
            throw new HttpErrors[400]('Email is not found');
            // console.log('Sending sms: ' + randomPassword);
            // return randomPassword;
          }
          throw new HttpErrors[400]('user not found');
          break;
      }
    }
    throw new HttpErrors[401]('User not found');
  }

  @post('/change-password', {
    responses: {
      '200': {
        description: 'Change password',
      },
    },
  })
  async changePassword(
    @requestBody() data: changePasswordData): Promise<boolean> {
    let user = await this.authService.VerifyUserToChangePassword(
      data.id,
      data.userPassword
    );
    if (user) {
      return await this.authService.ChangePassword(user, data.newPassword);

    } else {
      throw new HttpErrors[401]('Usuario o contraseña invalida');
    }
  }
}
