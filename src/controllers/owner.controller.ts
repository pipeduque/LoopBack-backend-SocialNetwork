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
import {Owner} from '../models';
import {OwnerRepository} from '../repositories';

export class OwnerController {
  constructor(
    @repository(OwnerRepository)
    public ownerRepository : OwnerRepository,
  ) {}

  @post('/owner', {
    responses: {
      '200': {
        description: 'Owner model instance',
        content: {'application/json': {schema: getModelSchemaRef(Owner)}},
      },
    },
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Owner, {
            title: 'NewOwner',
            exclude: ['id'],
          }),
        },
      },
    })
    owner: Omit<Owner, 'id'>,
  ): Promise<Owner> {
    return this.ownerRepository.create(owner);
  }

  @get('/owner/count', {
    responses: {
      '200': {
        description: 'Owner model count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async count(
    @param.where(Owner) where?: Where<Owner>,
  ): Promise<Count> {
    return this.ownerRepository.count(where);
  }

  @get('/owner', {
    responses: {
      '200': {
        description: 'Array of Owner model instances',
        content: {
          'application/json': {
            schema: {
              type: 'array',
              items: getModelSchemaRef(Owner, {includeRelations: true}),
            },
          },
        },
      },
    },
  })
  async find(
    @param.filter(Owner) filter?: Filter<Owner>,
  ): Promise<Owner[]> {
    return this.ownerRepository.find(filter);
  }

  @patch('/owner', {
    responses: {
      '200': {
        description: 'Owner PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Owner, {partial: true}),
        },
      },
    })
    owner: Owner,
    @param.where(Owner) where?: Where<Owner>,
  ): Promise<Count> {
    return this.ownerRepository.updateAll(owner, where);
  }

  @get('/owner/{id}', {
    responses: {
      '200': {
        description: 'Owner model instance',
        content: {
          'application/json': {
            schema: getModelSchemaRef(Owner, {includeRelations: true}),
          },
        },
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.filter(Owner, {exclude: 'where'}) filter?: FilterExcludingWhere<Owner>
  ): Promise<Owner> {
    return this.ownerRepository.findById(id, filter);
  }

  @patch('/owner/{id}', {
    responses: {
      '204': {
        description: 'Owner PATCH success',
      },
    },
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Owner, {partial: true}),
        },
      },
    })
    owner: Owner,
  ): Promise<void> {
    await this.ownerRepository.updateById(id, owner);
  }

  @put('/owner/{id}', {
    responses: {
      '204': {
        description: 'Owner PUT success',
      },
    },
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() owner: Owner,
  ): Promise<void> {
    await this.ownerRepository.replaceById(id, owner);
  }

  @del('/owner/{id}', {
    responses: {
      '204': {
        description: 'Owner DELETE success',
      },
    },
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.ownerRepository.deleteById(id);
  }
}
