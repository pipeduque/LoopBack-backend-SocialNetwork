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
  Owner,
} from '../models';
import {RoomRepository} from '../repositories';

export class RoomOwnerController {
  constructor(
    @repository(RoomRepository) protected roomRepository: RoomRepository,
  ) { }

  @get('/rooms/{id}/owner', {
    responses: {
      '200': {
        description: 'Room has one Owner',
        content: {
          'application/json': {
            schema: getModelSchemaRef(Owner),
          },
        },
      },
    },
  })
  async get(
    @param.path.string('id') id: string,
    @param.query.object('filter') filter?: Filter<Owner>,
  ): Promise<Owner> {
    return this.roomRepository.owner(id).get(filter);
  }

  @post('/rooms/{id}/owner', {
    responses: {
      '200': {
        description: 'Room model instance',
        content: {'application/json': {schema: getModelSchemaRef(Owner)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof Room.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Owner, {
            title: 'NewOwnerInRoom',
            exclude: ['id'],
            optional: ['roomId']
          }),
        },
      },
    }) owner: Omit<Owner, 'id'>,
  ): Promise<Owner> {
    return this.roomRepository.owner(id).create(owner);
  }

  @patch('/rooms/{id}/owner', {
    responses: {
      '200': {
        description: 'Room.Owner PATCH success count',
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
    return this.roomRepository.owner(id).patch(owner, where);
  }

  @del('/rooms/{id}/owner', {
    responses: {
      '200': {
        description: 'Room.Owner DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(Owner)) where?: Where<Owner>,
  ): Promise<Count> {
    return this.roomRepository.owner(id).delete(where);
  }
}
