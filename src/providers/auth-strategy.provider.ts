import {
  AuthenticationBindings,
  AuthenticationMetadata
} from '@loopback/authentication';
import {inject, Provider, ValueOrPromise} from '@loopback/context';
import {repository} from '@loopback/repository';
import {Strategy} from 'passport';
import {BasicStrategy} from 'passport-http';
import {Strategy as BearerStrategy} from 'passport-http-bearer';
import {UserRepository} from '../repositories';
import {AuthService} from '../services/auth.service';

export class MyAuthStrategyProvider implements Provider<Strategy | undefined> {
  authService: AuthService;

  constructor(
    @inject(AuthenticationBindings.METADATA)
    private metadata: AuthenticationMetadata,
    @repository(UserRepository)
    public userRepository: UserRepository
  ) {
    this.authService = new AuthService(userRepository);
  }

  value(): ValueOrPromise<Strategy | undefined> {
    // The function was not decorated, so we shouldn't attempt authentication
    if (!this.metadata) {
      return undefined;
    }

    const name = this.metadata.strategy;
    switch (name) {
      case 'BasicStrategy':
        return new BasicStrategy(this.VerifyUser.bind(this));
      case 'TokenUserStrategy':
        return new BearerStrategy(this.VerifyUserToken.bind(this));
      case 'TokenAdminStrategy'://Solo puede ver
        return new BearerStrategy(this.VerifyAdminToken.bind(this));
      case 'TokenSuperAdminStrategy'://Puede hacer todo
        return new BearerStrategy(this.VerifySuperAdminToken.bind(this));
      case 'TokenPublicityStrategy':
        return new BearerStrategy(this.VerifyPublicityToken.bind(this));
      default:
        return Promise.reject(`The strategy ${name} is not available.`);
    }
  }

  VerifyUser(
    username: string,
    password: string,
    cb: (err: Error | null, user?: object | false) => void,
  ) {
    let user = this.authService.identify(username, password);
    return cb(null, user);
  }

  VerifyAdminToken(
    token: string,
    cb: (err: Error | null, user?: object | false) => void,
  ) {
    this.authService.VerifyToken(token).then(data => {
      if (data && data.role === 1) {
        return cb(null, data);
      }
      return cb(null, false);
    });
  }

  VerifySuperAdminToken(
    token: string,
    cb: (err: Error | null, user?: object | false) => void,
  ) {
    this.authService.VerifyToken(token).then(data => {
      if (data && data.role === 2) {
        return cb(null, data);
      }
      return cb(null, false);
    });
  }

  VerifyPublicityToken(
    token: string,
    cb: (err: Error | null, user?: object | false) => void,
  ) {
    this.authService.VerifyToken(token).then(data => {
      if (data && data.role === 3) {
        return cb(null, data);
      }
      return cb(null, false);
    });
  }

  VerifyUserToken(
    token: string,
    cb: (err: Error | null, user?: object | false) => void,
  ) {
    this.authService.VerifyToken(token).then(data => {
      if (data && data.role === 4) {
        return cb(null, data);
      }
      return cb(null, false);
    });
  }

  VerifyOwnerToken(
    token: string,
    cb: (err: Error | null, user?: object | false) => void,
  ) {
    this.authService.VerifyToken(token).then(data => {
      if (data && data.role === 5) {
        return cb(null, data);
      }
      return cb(null, false);
    });
  }
}
