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
  Publication,
  Room,
} from '../models';
import {PublicationRepository} from '../repositories';

export class PublicationRoomController {
  constructor(
    @repository(PublicationRepository) protected publicationRepository: PublicationRepository,
  ) { }

  @get('/publications/{id}/room', {
    responses: {
      '200': {
        description: 'Publication has one Room',
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
    return this.publicationRepository.room(id).get(filter);
  }

  @post('/publications/{id}/room', {
    responses: {
      '200': {
        description: 'Publication model instance',
        content: {'application/json': {schema: getModelSchemaRef(Room)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof Publication.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Room, {
            title: 'NewRoomInPublication',
            exclude: ['id'],
            optional: ['publicationId']
          }),
        },
      },
    }) room: Omit<Room, 'id'>,
  ): Promise<Room> {
    return this.publicationRepository.room(id).create(room);
  }

  @patch('/publications/{id}/room', {
    responses: {
      '200': {
        description: 'Publication.Room PATCH success count',
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
    return this.publicationRepository.room(id).patch(room, where);
  }

  @del('/publications/{id}/room', {
    responses: {
      '200': {
        description: 'Publication.Room DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(Room)) where?: Where<Room>,
  ): Promise<Count> {
    return this.publicationRepository.room(id).delete(where);
  }
}
