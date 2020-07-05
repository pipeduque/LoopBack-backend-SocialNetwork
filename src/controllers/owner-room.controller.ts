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
  Owner,
  Room,
} from '../models';
import {OwnerRepository} from '../repositories';

export class OwnerRoomController {
  constructor(
    @repository(OwnerRepository) protected ownerRepository: OwnerRepository,
  ) { }

  @get('/owners/{id}/rooms', {
    responses: {
      '200': {
        description: 'Array of Owner has many Room',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Room)},
          },
        },
      },
    },
  })
  async find(
    @param.path.string('id') id: string,
    @param.query.object('filter') filter?: Filter<Room>,
  ): Promise<Room[]> {
    return this.ownerRepository.rooms(id).find(filter);
  }

  @post('/owners/{id}/rooms', {
    responses: {
      '200': {
        description: 'Owner model instance',
        content: {'application/json': {schema: getModelSchemaRef(Room)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof Owner.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Room, {
            title: 'NewRoomInOwner',
            exclude: ['id'],
            optional: ['ownerId']
          }),
        },
      },
    }) room: Omit<Room, 'id'>,
  ): Promise<Room> {
    return this.ownerRepository.rooms(id).create(room);
  }

  @patch('/owners/{id}/rooms', {
    responses: {
      '200': {
        description: 'Owner.Room PATCH success count',
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
    return this.ownerRepository.rooms(id).patch(room, where);
  }

  @del('/owners/{id}/rooms', {
    responses: {
      '200': {
        description: 'Owner.Room DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(Room)) where?: Where<Room>,
  ): Promise<Count> {
    return this.ownerRepository.rooms(id).delete(where);
  }
}
