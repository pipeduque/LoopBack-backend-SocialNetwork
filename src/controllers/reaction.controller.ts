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
import {Reaction} from '../models';
import {ReactionRepository} from '../repositories';

export class ReactionController {
  constructor(
    @repository(ReactionRepository)
    public reactionRepository : ReactionRepository,
  ) {}

  @post('/reaction', {
    responses: {
      '200': {
        description: 'Reaction model instance',
        content: {'application/json': {schema: getModelSchemaRef(Reaction)}},
      },
    },
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Reaction, {
            title: 'NewReaction',
            exclude: ['id'],
          }),
        },
      },
    })
    reaction: Omit<Reaction, 'id'>,
  ): Promise<Reaction> {
    return this.reactionRepository.create(reaction);
  }

  @get('/reaction/count', {
    responses: {
      '200': {
        description: 'Reaction model count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async count(
    @param.where(Reaction) where?: Where<Reaction>,
  ): Promise<Count> {
    return this.reactionRepository.count(where);
  }

  @get('/reaction', {
    responses: {
      '200': {
        description: 'Array of Reaction model instances',
        content: {
          'application/json': {
            schema: {
              type: 'array',
              items: getModelSchemaRef(Reaction, {includeRelations: true}),
            },
          },
        },
      },
    },
  })
  async find(
    @param.filter(Reaction) filter?: Filter<Reaction>,
  ): Promise<Reaction[]> {
    return this.reactionRepository.find(filter);
  }

  @patch('/reaction', {
    responses: {
      '200': {
        description: 'Reaction PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Reaction, {partial: true}),
        },
      },
    })
    reaction: Reaction,
    @param.where(Reaction) where?: Where<Reaction>,
  ): Promise<Count> {
    return this.reactionRepository.updateAll(reaction, where);
  }

  @get('/reaction/{id}', {
    responses: {
      '200': {
        description: 'Reaction model instance',
        content: {
          'application/json': {
            schema: getModelSchemaRef(Reaction, {includeRelations: true}),
          },
        },
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.filter(Reaction, {exclude: 'where'}) filter?: FilterExcludingWhere<Reaction>
  ): Promise<Reaction> {
    return this.reactionRepository.findById(id, filter);
  }

  @patch('/reaction/{id}', {
    responses: {
      '204': {
        description: 'Reaction PATCH success',
      },
    },
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Reaction, {partial: true}),
        },
      },
    })
    reaction: Reaction,
  ): Promise<void> {
    await this.reactionRepository.updateById(id, reaction);
  }

  @put('/reaction/{id}', {
    responses: {
      '204': {
        description: 'Reaction PUT success',
      },
    },
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() reaction: Reaction,
  ): Promise<void> {
    await this.reactionRepository.replaceById(id, reaction);
  }

  @del('/reaction/{id}', {
    responses: {
      '204': {
        description: 'Reaction DELETE success',
      },
    },
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.reactionRepository.deleteById(id);
  }
}
