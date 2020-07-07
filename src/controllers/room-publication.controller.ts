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
  Publication,
} from '../models';
import {RoomRepository} from '../repositories';

export class RoomPublicationController {
  constructor(
    @repository(RoomRepository) protected roomRepository: RoomRepository,
  ) { }

  @get('/rooms/{id}/publication', {
    responses: {
      '200': {
        description: 'Room has one Publication',
        content: {
          'application/json': {
            schema: getModelSchemaRef(Publication),
          },
        },
      },
    },
  })
  async get(
    @param.path.string('id') id: string,
    @param.query.object('filter') filter?: Filter<Publication>,
  ): Promise<Publication> {
    return this.roomRepository.publication(id).get(filter);
  }

  @post('/rooms/{id}/publication', {
    responses: {
      '200': {
        description: 'Room model instance',
        content: {'application/json': {schema: getModelSchemaRef(Publication)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof Room.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Publication, {
            title: 'NewPublicationInRoom',
            exclude: ['id'],
            optional: ['roomId']
          }),
        },
      },
    }) publication: Omit<Publication, 'id'>,
  ): Promise<Publication> {
    return this.roomRepository.publication(id).create(publication);
  }

  @patch('/rooms/{id}/publication', {
    responses: {
      '200': {
        description: 'Room.Publication PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Publication, {partial: true}),
        },
      },
    })
    publication: Partial<Publication>,
    @param.query.object('where', getWhereSchemaFor(Publication)) where?: Where<Publication>,
  ): Promise<Count> {
    return this.roomRepository.publication(id).patch(publication, where);
  }

  @del('/rooms/{id}/publication', {
    responses: {
      '200': {
        description: 'Room.Publication DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(Publication)) where?: Where<Publication>,
  ): Promise<Count> {
    return this.roomRepository.publication(id).delete(where);
  }
}
