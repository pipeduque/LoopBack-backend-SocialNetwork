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
  Owner,
} from '../models';
import {UserRepository} from '../repositories';

export class UserOwnerController {
  constructor(
    @repository(UserRepository) protected userRepository: UserRepository,
  ) { }

  @get('/users/{id}/owners', {
    responses: {
      '200': {
        description: 'Array of User has many Owner',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Owner)},
          },
        },
      },
    },
  })
  async find(
    @param.path.string('id') id: string,
    @param.query.object('filter') filter?: Filter<Owner>,
  ): Promise<Owner[]> {
    return this.userRepository.owners(id).find(filter);
  }

  @post('/users/{id}/owners', {
    responses: {
      '200': {
        description: 'User model instance',
        content: {'application/json': {schema: getModelSchemaRef(Owner)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof User.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Owner, {
            title: 'NewOwnerInUser',
            exclude: ['id'],
            optional: ['userId']
          }),
        },
      },
    }) owner: Omit<Owner, 'id'>,
  ): Promise<Owner> {
    return this.userRepository.owners(id).create(owner);
  }

  @patch('/users/{id}/owners', {
    responses: {
      '200': {
        description: 'User.Owner PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Owner, {partial: true}),
        },
      },
    })
    owner: Partial<Owner>,
    @param.query.object('where', getWhereSchemaFor(Owner)) where?: Where<Owner>,
  ): Promise<Count> {
    return this.userRepository.owners(id).patch(owner, where);
  }

  @del('/users/{id}/owners', {
    responses: {
      '200': {
        description: 'User.Owner DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(Owner)) where?: Where<Owner>,
  ): Promise<Count> {
    return this.userRepository.owners(id).delete(where);
  }
}
