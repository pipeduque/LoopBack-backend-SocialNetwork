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
  Occupant,
} from '../models';
import {UserRepository} from '../repositories';

export class UserOccupantController {
  constructor(
    @repository(UserRepository) protected userRepository: UserRepository,
  ) { }

  @get('/users/{id}/occupants', {
    responses: {
      '200': {
        description: 'Array of User has many Occupant',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Occupant)},
          },
        },
      },
    },
  })
  async find(
    @param.path.string('id') id: string,
    @param.query.object('filter') filter?: Filter<Occupant>,
  ): Promise<Occupant[]> {
    return this.userRepository.occupants(id).find(filter);
  }

  @post('/users/{id}/occupants', {
    responses: {
      '200': {
        description: 'User model instance',
        content: {'application/json': {schema: getModelSchemaRef(Occupant)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof User.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Occupant, {
            title: 'NewOccupantInUser',
            exclude: ['id'],
            optional: ['userId']
          }),
        },
      },
    }) occupant: Omit<Occupant, 'id'>,
  ): Promise<Occupant> {
    return this.userRepository.occupants(id).create(occupant);
  }

  @patch('/users/{id}/occupants', {
    responses: {
      '200': {
        description: 'User.Occupant PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Occupant, {partial: true}),
        },
      },
    })
    occupant: Partial<Occupant>,
    @param.query.object('where', getWhereSchemaFor(Occupant)) where?: Where<Occupant>,
  ): Promise<Count> {
    return this.userRepository.occupants(id).patch(occupant, where);
  }

  @del('/users/{id}/occupants', {
    responses: {
      '200': {
        description: 'User.Occupant DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(Occupant)) where?: Where<Occupant>,
  ): Promise<Count> {
    return this.userRepository.occupants(id).delete(where);
  }
}
