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
  Room,
  Occupant,
} from '../models';
import {RoomRepository} from '../repositories';

export class RoomOccupantController {
  constructor(
    @repository(RoomRepository) protected roomRepository: RoomRepository,
  ) { }

  @get('/rooms/{id}/occupants', {
    responses: {
      '200': {
        description: 'Array of Room has many Occupant',
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
    return this.roomRepository.occupants(id).find(filter);
  }

  @post('/rooms/{id}/occupants', {
    responses: {
      '200': {
        description: 'Room model instance',
        content: {'application/json': {schema: getModelSchemaRef(Occupant)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof Room.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Occupant, {
            title: 'NewOccupantInRoom',
            exclude: ['id'],
            optional: ['roomId']
          }),
        },
      },
    }) occupant: Omit<Occupant, 'id'>,
  ): Promise<Occupant> {
    return this.roomRepository.occupants(id).create(occupant);
  }

  @patch('/rooms/{id}/occupants', {
    responses: {
      '200': {
        description: 'Room.Occupant PATCH success count',
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
    return this.roomRepository.occupants(id).patch(occupant, where);
  }

  @del('/rooms/{id}/occupants', {
    responses: {
      '200': {
        description: 'Room.Occupant DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(Occupant)) where?: Where<Occupant>,
  ): Promise<Count> {
    return this.roomRepository.occupants(id).delete(where);
  }
}
