import {
  Count,
  CountSchema,
  Filter,
  repository,
  Where,
} from '@loopback/repository';
import {
  del,
  get,
  getModelSchemaRef,
  getWhereSchemaFor,
  param,
  patch,
  post,
  requestBody,
} from '@loopback/rest';
import {
  User,
  Follower,
} from '../models';
import {UserRepository} from '../repositories';

export class UserFollowerController {
  constructor(
    @repository(UserRepository) protected userRepository: UserRepository,
  ) { }

  @get('/users/{id}/followers', {
    responses: {
      '200': {
        description: 'Array of User has many Follower',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Follower)},
          },
        },
      },
    },
  })
  async find(
    @param.path.string('id') id: string,
    @param.query.object('filter') filter?: Filter<Follower>,
  ): Promise<Follower[]> {
    return this.userRepository.followers(id).find(filter);
  }

  @post('/users/{id}/followers', {
    responses: {
      '200': {
        description: 'User model instance',
        content: {'application/json': {schema: getModelSchemaRef(Follower)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof User.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Follower, {
            title: 'NewFollowerInUser',
            exclude: ['id'],
            optional: ['userId']
          }),
        },
      },
    }) follower: Omit<Follower, 'id'>,
  ): Promise<Follower> {
    return this.userRepository.followers(id).create(follower);
  }

  @patch('/users/{id}/followers', {
    responses: {
      '200': {
        description: 'User.Follower PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Follower, {partial: true}),
        },
      },
    })
    follower: Partial<Follower>,
    @param.query.object('where', getWhereSchemaFor(Follower)) where?: Where<Follower>,
  ): Promise<Count> {
    return this.userRepository.followers(id).patch(follower, where);
  }

  @del('/users/{id}/followers', {
    responses: {
      '200': {
        description: 'User.Follower DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(Follower)) where?: Where<Follower>,
  ): Promise<Count> {
    return this.userRepository.followers(id).delete(where);
  }
}
