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
  Request,
  Room,
} from '../models';
import {RequestRepository} from '../repositories';

export class RequestRoomController {
  constructor(
    @repository(RequestRepository) protected requestRepository: RequestRepository,
  ) { }

  @get('/requests/{id}/room', {
    responses: {
      '200': {
        description: 'Request has one Room',
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
    return this.requestRepository.room(id).get(filter);
  }

  @post('/requests/{id}/room', {
    responses: {
      '200': {
        description: 'Request model instance',
        content: {'application/json': {schema: getModelSchemaRef(Room)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof Request.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Room, {
            title: 'NewRoomInRequest',
            exclude: ['id'],
            optional: ['requestId']
          }),
        },
      },
    }) room: Omit<Room, 'id'>,
  ): Promise<Room> {
    return this.requestRepository.room(id).create(room);
  }

  @patch('/requests/{id}/room', {
    responses: {
      '200': {
        description: 'Request.Room PATCH success count',
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
    return this.requestRepository.room(id).patch(room, where);
  }

  @del('/requests/{id}/room', {
    responses: {
      '200': {
        description: 'Request.Room DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(Room)) where?: Where<Room>,
  ): Promise<Count> {
    return this.requestRepository.room(id).delete(where);
  }
}
