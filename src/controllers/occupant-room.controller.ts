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
  Room,
} from '../models';
import {OccupantRepository} from '../repositories';

export class OccupantRoomController {
  constructor(
    @repository(OccupantRepository) protected occupantRepository: OccupantRepository,
  ) { }

  @get('/occupants/{id}/room', {
    responses: {
      '200': {
        description: 'Occupant has one Room',
        content: {
          'application/json': {
            schema: getModelSchemaRef(Room),
          },
        },
      },
    },
  })
  async get(
    @param.path.string('id') id: string,
    @param.query.object('filter') filter?: Filter<Room>,
  ): Promise<Room> {
    return this.occupantRepository.room(id).get(filter);
  }

  @post('/occupants/{id}/room', {
    responses: {
      '200': {
        description: 'Occupant model instance',
        content: {'application/json': {schema: getModelSchemaRef(Room)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof Occupant.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Room, {
            title: 'NewRoomInOccupant',
            exclude: ['id'],
            optional: ['occupantId']
          }),
        },
      },
    }) room: Omit<Room, 'id'>,
  ): Promise<Room> {
    return this.occupantRepository.room(id).create(room);
  }

  @patch('/occupants/{id}/room', {
    responses: {
      '200': {
        description: 'Occupant.Room PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Room, {partial: true}),
        },
      },
    })
    room: Partial<Room>,
    @param.query.object('where', getWhereSchemaFor(Room)) where?: Where<Room>,
  ): Promise<Count> {
    return this.occupantRepository.room(id).patch(room, where);
  }

  @del('/occupants/{id}/room', {
    responses: {
      '200': {
        description: 'Occupant.Room DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(Room)) where?: Where<Room>,
  ): Promise<Count> {
    return this.occupantRepository.room(id).delete(where);
  }
}
