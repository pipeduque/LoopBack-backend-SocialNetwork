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
  Ownerhasfollowers,
} from '../models';
import {UserRepository} from '../repositories';

export class UserOwnerhasfollowersController {
  constructor(
    @repository(UserRepository) protected userRepository: UserRepository,
  ) { }

  @get('/users/{id}/ownerhasfollowers', {
    responses: {
      '200': {
        description: 'Array of User has many Ownerhasfollowers',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Ownerhasfollowers)},
          },
        },
      },
    },
  })
  async find(
    @param.path.string('id') id: string,
    @param.query.object('filter') filter?: Filter<Ownerhasfollowers>,
  ): Promise<Ownerhasfollowers[]> {
    return this.userRepository.ownerhasfollowers(id).find(filter);
  }

  @post('/users/{id}/ownerhasfollowers', {
    responses: {
      '200': {
        description: 'User model instance',
        content: {'application/json': {schema: getModelSchemaRef(Ownerhasfollowers)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof User.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Ownerhasfollowers, {
            title: 'NewOwnerhasfollowersInUser',
            exclude: ['id'],
            optional: ['userId']
          }),
        },
      },
    }) ownerhasfollowers: Omit<Ownerhasfollowers, 'id'>,
  ): Promise<Ownerhasfollowers> {
    return this.userRepository.ownerhasfollowers(id).create(ownerhasfollowers);
  }

  @patch('/users/{id}/ownerhasfollowers', {
    responses: {
      '200': {
        description: 'User.Ownerhasfollowers PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Ownerhasfollowers, {partial: true}),
        },
      },
    })
    ownerhasfollowers: Partial<Ownerhasfollowers>,
    @param.query.object('where', getWhereSchemaFor(Ownerhasfollowers)) where?: Where<Ownerhasfollowers>,
  ): Promise<Count> {
    return this.userRepository.ownerhasfollowers(id).patch(ownerhasfollowers, where);
  }

  @del('/users/{id}/ownerhasfollowers', {
    responses: {
      '200': {
        description: 'User.Ownerhasfollowers DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(Ownerhasfollowers)) where?: Where<Ownerhasfollowers>,
  ): Promise<Count> {
    return this.userRepository.ownerhasfollowers(id).delete(where);
  }
}
