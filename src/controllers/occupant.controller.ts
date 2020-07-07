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
import {Occupant} from '../models';
import {OccupantRepository} from '../repositories';

export class OccupantController {
  constructor(
    @repository(OccupantRepository)
    public occupantRepository : OccupantRepository,
  ) {}

  @post('/occupants', {
    responses: {
      '200': {
        description: 'Occupant model instance',
        content: {'application/json': {schema: getModelSchemaRef(Occupant)}},
      },
    },
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Occupant, {
            title: 'NewOccupant',
            
          }),
        },
      },
    })
    occupant: Occupant,
  ): Promise<Occupant> {
    return this.occupantRepository.create(occupant);
  }

  @get('/occupants/count', {
    responses: {
      '200': {
        description: 'Occupant model count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async count(
    @param.where(Occupant) where?: Where<Occupant>,
  ): Promise<Count> {
    return this.occupantRepository.count(where);
  }

  @get('/occupants', {
    responses: {
      '200': {
        description: 'Array of Occupant model instances',
        content: {
          'application/json': {
            schema: {
              type: 'array',
              items: getModelSchemaRef(Occupant, {includeRelations: true}),
            },
          },
        },
      },
    },
  })
  async find(
    @param.filter(Occupant) filter?: Filter<Occupant>,
  ): Promise<Occupant[]> {
    return this.occupantRepository.find(filter);
  }

  @patch('/occupants', {
    responses: {
      '200': {
        description: 'Occupant PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Occupant, {partial: true}),
        },
      },
    })
    occupant: Occupant,
    @param.where(Occupant) where?: Where<Occupant>,
  ): Promise<Count> {
    return this.occupantRepository.updateAll(occupant, where);
  }

  @get('/occupants/{id}', {
    responses: {
      '200': {
        description: 'Occupant model instance',
        content: {
          'application/json': {
            schema: getModelSchemaRef(Occupant, {includeRelations: true}),
          },
        },
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.filter(Occupant, {exclude: 'where'}) filter?: FilterExcludingWhere<Occupant>
  ): Promise<Occupant> {
    return this.occupantRepository.findById(id, filter);
  }

  @patch('/occupants/{id}', {
    responses: {
      '204': {
        description: 'Occupant PATCH success',
      },
    },
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Occupant, {partial: true}),
        },
      },
    })
    occupant: Occupant,
  ): Promise<void> {
    await this.occupantRepository.updateById(id, occupant);
  }

  @put('/occupants/{id}', {
    responses: {
      '204': {
        description: 'Occupant PUT success',
      },
    },
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() occupant: Occupant,
  ): Promise<void> {
    await this.occupantRepository.replaceById(id, occupant);
  }

  @del('/occupants/{id}', {
    responses: {
      '204': {
        description: 'Occupant DELETE success',
      },
    },
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.occupantRepository.deleteById(id);
  }
}
