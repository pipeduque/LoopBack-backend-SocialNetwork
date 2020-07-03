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
import {Ownerhasfollowers} from '../models';
import {OwnerhasfollowersRepository} from '../repositories';

export class OwnerhasfollowersController {
  constructor(
    @repository(OwnerhasfollowersRepository)
    public ownerhasfollowersRepository : OwnerhasfollowersRepository,
  ) {}

  @post('/ownerhasfollower', {
    responses: {
      '200': {
        description: 'Ownerhasfollowers model instance',
        content: {'application/json': {schema: getModelSchemaRef(Ownerhasfollowers)}},
      },
    },
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Ownerhasfollowers, {
            title: 'NewOwnerhasfollowers',
            exclude: ['id'],
          }),
        },
      },
    })
    ownerhasfollowers: Omit<Ownerhasfollowers, 'id'>,
  ): Promise<Ownerhasfollowers> {
    return this.ownerhasfollowersRepository.create(ownerhasfollowers);
  }

  @get('/ownerhasfollower/count', {
    responses: {
      '200': {
        description: 'Ownerhasfollowers model count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async count(
    @param.where(Ownerhasfollowers) where?: Where<Ownerhasfollowers>,
  ): Promise<Count> {
    return this.ownerhasfollowersRepository.count(where);
  }

  @get('/ownerhasfollower', {
    responses: {
      '200': {
        description: 'Array of Ownerhasfollowers model instances',
        content: {
          'application/json': {
            schema: {
              type: 'array',
              items: getModelSchemaRef(Ownerhasfollowers, {includeRelations: true}),
            },
          },
        },
      },
    },
  })
  async find(
    @param.filter(Ownerhasfollowers) filter?: Filter<Ownerhasfollowers>,
  ): Promise<Ownerhasfollowers[]> {
    return this.ownerhasfollowersRepository.find(filter);
  }

  @patch('/ownerhasfollower', {
    responses: {
      '200': {
        description: 'Ownerhasfollowers PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Ownerhasfollowers, {partial: true}),
        },
      },
    })
    ownerhasfollowers: Ownerhasfollowers,
    @param.where(Ownerhasfollowers) where?: Where<Ownerhasfollowers>,
  ): Promise<Count> {
    return this.ownerhasfollowersRepository.updateAll(ownerhasfollowers, where);
  }

  @get('/ownerhasfollower/{id}', {
    responses: {
      '200': {
        description: 'Ownerhasfollowers model instance',
        content: {
          'application/json': {
            schema: getModelSchemaRef(Ownerhasfollowers, {includeRelations: true}),
          },
        },
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.filter(Ownerhasfollowers, {exclude: 'where'}) filter?: FilterExcludingWhere<Ownerhasfollowers>
  ): Promise<Ownerhasfollowers> {
    return this.ownerhasfollowersRepository.findById(id, filter);
  }

  @patch('/ownerhasfollower/{id}', {
    responses: {
      '204': {
        description: 'Ownerhasfollowers PATCH success',
      },
    },
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Ownerhasfollowers, {partial: true}),
        },
      },
    })
    ownerhasfollowers: Ownerhasfollowers,
  ): Promise<void> {
    await this.ownerhasfollowersRepository.updateById(id, ownerhasfollowers);
  }

  @put('/ownerhasfollower/{id}', {
    responses: {
      '204': {
        description: 'Ownerhasfollowers PUT success',
      },
    },
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() ownerhasfollowers: Ownerhasfollowers,
  ): Promise<void> {
    await this.ownerhasfollowersRepository.replaceById(id, ownerhasfollowers);
  }

  @del('/ownerhasfollower/{id}', {
    responses: {
      '204': {
        description: 'Ownerhasfollowers DELETE success',
      },
    },
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.ownerhasfollowersRepository.deleteById(id);
  }
}
