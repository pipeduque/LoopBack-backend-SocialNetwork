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
  Occupant,
  User,
} from '../models';
import {OccupantRepository} from '../repositories';

export class OccupantUserController {
  constructor(
    @repository(OccupantRepository) protected occupantRepository: OccupantRepository,
  ) { }

  @get('/occupants/{id}/user', {
    responses: {
      '200': {
        description: 'Occupant has one User',
        content: {
          'application/json': {
            schema: getModelSchemaRef(User),
          },
        },
      },
    },
  })
  async get(
    @param.path.string('id') id: string,
    @param.query.object('filter') filter?: Filter<User>,
  ): Promise<User> {
    return this.occupantRepository.user(id).get(filter);
  }

  @post('/occupants/{id}/user', {
    responses: {
      '200': {
        description: 'Occupant model instance',
        content: {'application/json': {schema: getModelSchemaRef(User)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof Occupant.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(User, {
            title: 'NewUserInOccupant',
            exclude: ['id'],
            optional: ['occupantId']
          }),
        },
      },
    }) user: Omit<User, 'id'>,
  ): Promise<User> {
    return this.occupantRepository.user(id).create(user);
  }

  @patch('/occupants/{id}/user', {
    responses: {
      '200': {
        description: 'Occupant.User PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(User, {partial: true}),
        },
      },
    })
    user: Partial<User>,
    @param.query.object('where', getWhereSchemaFor(User)) where?: Where<User>,
  ): Promise<Count> {
    return this.occupantRepository.user(id).patch(user, where);
  }

  @del('/occupants/{id}/user', {
    responses: {
      '200': {
        description: 'Occupant.User DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(User)) where?: Where<User>,
  ): Promise<Count> {
    return this.occupantRepository.user(id).delete(where);
  }
}
