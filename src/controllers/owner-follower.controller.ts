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
  Follower,
} from '../models';
import {OwnerRepository} from '../repositories';

export class OwnerFollowerController {
  constructor(
    @repository(OwnerRepository) protected ownerRepository: OwnerRepository,
  ) { }

  @get('/owners/{id}/followers', {
    responses: {
      '200': {
        description: 'Array of Owner has many Follower',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Follower)},
          },
        },
      },
    },
  })
  async find(
    @param.path.string('id') id: string,
    @param.query.object('filter') filter?: Filter<Follower>,
  ): Promise<Follower[]> {
    return this.ownerRepository.followers(id).find(filter);
  }

  @post('/owners/{id}/followers', {
    responses: {
      '200': {
        description: 'Owner model instance',
        content: {'application/json': {schema: getModelSchemaRef(Follower)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof Owner.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Follower, {
            title: 'NewFollowerInOwner',
            exclude: ['id'],
            optional: ['ownerId']
          }),
        },
      },
    }) follower: Omit<Follower, 'id'>,
  ): Promise<Follower> {
    return this.ownerRepository.followers(id).create(follower);
  }

  @patch('/owners/{id}/followers', {
    responses: {
      '200': {
        description: 'Owner.Follower PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Follower, {partial: true}),
        },
      },
    })
    follower: Partial<Follower>,
    @param.query.object('where', getWhereSchemaFor(Follower)) where?: Where<Follower>,
  ): Promise<Count> {
    return this.ownerRepository.followers(id).patch(follower, where);
  }

  @del('/owners/{id}/followers', {
    responses: {
      '200': {
        description: 'Owner.Follower DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(Follower)) where?: Where<Follower>,
  ): Promise<Count> {
    return this.ownerRepository.followers(id).delete(where);
  }
}
