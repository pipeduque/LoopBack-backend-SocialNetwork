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
import {PublicationReaction} from '../models';
import {PublicationReactionRepository} from '../repositories';

export class PublicationReactionController {
  constructor(
    @repository(PublicationReactionRepository)
    public publicationReactionRepository : PublicationReactionRepository,
  ) {}

  @post('/publicationReaction', {
    responses: {
      '200': {
        description: 'PublicationReaction model instance',
        content: {'application/json': {schema: getModelSchemaRef(PublicationReaction)}},
      },
    },
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(PublicationReaction, {
            title: 'NewPublicationReaction',
            exclude: ['id'],
          }),
        },
      },
    })
    publicationReaction: Omit<PublicationReaction, 'id'>,
  ): Promise<PublicationReaction> {
    return this.publicationReactionRepository.create(publicationReaction);
  }

  @get('/publicationReaction/count', {
    responses: {
      '200': {
        description: 'PublicationReaction model count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async count(
    @param.where(PublicationReaction) where?: Where<PublicationReaction>,
  ): Promise<Count> {
    return this.publicationReactionRepository.count(where);
  }

  @get('/publicationReaction', {
    responses: {
      '200': {
        description: 'Array of PublicationReaction model instances',
        content: {
          'application/json': {
            schema: {
              type: 'array',
              items: getModelSchemaRef(PublicationReaction, {includeRelations: true}),
            },
          },
        },
      },
    },
  })
  async find(
    @param.filter(PublicationReaction) filter?: Filter<PublicationReaction>,
  ): Promise<PublicationReaction[]> {
    return this.publicationReactionRepository.find(filter);
  }

  @patch('/publicationReaction', {
    responses: {
      '200': {
        description: 'PublicationReaction PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(PublicationReaction, {partial: true}),
        },
      },
    })
    publicationReaction: PublicationReaction,
    @param.where(PublicationReaction) where?: Where<PublicationReaction>,
  ): Promise<Count> {
    return this.publicationReactionRepository.updateAll(publicationReaction, where);
  }

  @get('/publicationReaction/{id}', {
    responses: {
      '200': {
        description: 'PublicationReaction model instance',
        content: {
          'application/json': {
            schema: getModelSchemaRef(PublicationReaction, {includeRelations: true}),
          },
        },
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.filter(PublicationReaction, {exclude: 'where'}) filter?: FilterExcludingWhere<PublicationReaction>
  ): Promise<PublicationReaction> {
    return this.publicationReactionRepository.findById(id, filter);
  }

  @patch('/publicationReaction/{id}', {
    responses: {
      '204': {
        description: 'PublicationReaction PATCH success',
      },
    },
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(PublicationReaction, {partial: true}),
        },
      },
    })
    publicationReaction: PublicationReaction,
  ): Promise<void> {
    await this.publicationReactionRepository.updateById(id, publicationReaction);
  }

  @put('/publicationReaction/{id}', {
    responses: {
      '204': {
        description: 'PublicationReaction PUT success',
      },
    },
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() publicationReaction: PublicationReaction,
  ): Promise<void> {
    await this.publicationReactionRepository.replaceById(id, publicationReaction);
  }

  @del('/publicationReaction/{id}', {
    responses: {
      '204': {
        description: 'PublicationReaction DELETE success',
      },
    },
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.publicationReactionRepository.deleteById(id);
  }
}
