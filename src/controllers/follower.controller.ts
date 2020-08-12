import {
  Count,
  CountSchema,
  Filter,
  FilterExcludingWhere,
  repository,
  Where,
} from '@loopback/repository';
import {
  post,
  param,
  get,
  getModelSchemaRef,
  patch,
  put,
  del,
  requestBody,
} from '@loopback/rest';
import {Follower} from '../models';
import {FollowerRepository} from '../repositories';

export class FollowerController {
  constructor(
    @repository(FollowerRepository)
    public followerRepository : FollowerRepository,
  ) {}

  @post('/followers', {
    responses: {
      '200': {
        description: 'Follower model instance',
        content: {'application/json': {schema: getModelSchemaRef(Follower)}},
      },
    },
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Follower, {
            title: 'NewFollower',
            exclude: ['id'],
          }),
        },
      },
    })
    follower: Omit<Follower, 'id'>,
  ): Promise<Follower> {
    return this.followerRepository.create(follower);
  }

  @get('/followers/count', {
    responses: {
      '200': {
        description: 'Follower model count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async count(
    @param.where(Follower) where?: Where<Follower>,
  ): Promise<Count> {
    return this.followerRepository.count(where);
  }

  @get('/followers', {
    responses: {
      '200': {
        description: 'Array of Follower model instances',
        content: {
          'application/json': {
            schema: {
              type: 'array',
              items: getModelSchemaRef(Follower, {includeRelations: true}),
            },
          },
        },
      },
    },
  })
  async find(
    @param.filter(Follower) filter?: Filter<Follower>,
  ): Promise<Follower[]> {
    return this.followerRepository.find(filter);
  }

  @patch('/followers', {
    responses: {
      '200': {
        description: 'Follower PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Follower, {partial: true}),
        },
      },
    })
    follower: Follower,
    @param.where(Follower) where?: Where<Follower>,
  ): Promise<Count> {
    return this.followerRepository.updateAll(follower, where);
  }

  @get('/followers/{id}', {
    responses: {
      '200': {
        description: 'Follower model instance',
        content: {
          'application/json': {
            schema: getModelSchemaRef(Follower, {includeRelations: true}),
          },
        },
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.filter(Follower, {exclude: 'where'}) filter?: FilterExcludingWhere<Follower>
  ): Promise<Follower> {
    return this.followerRepository.findById(id, filter);
  }

  @patch('/followers/{id}', {
    responses: {
      '204': {
        description: 'Follower PATCH success',
      },
    },
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Follower, {partial: true}),
        },
      },
    })
    follower: Follower,
  ): Promise<void> {
    await this.followerRepository.updateById(id, follower);
  }

  @put('/followers/{id}', {
    responses: {
      '204': {
        description: 'Follower PUT success',
      },
    },
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() follower: Follower,
  ): Promise<void> {
    await this.followerRepository.replaceById(id, follower);
  }

  @del('/followers/{id}', {
    responses: {
      '204': {
        description: 'Follower DELETE success',
      },
    },
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.followerRepository.deleteById(id);
  }
}
