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
import {PollAnswer} from '../models';
import {PollAnswerRepository} from '../repositories';

export class PollAnswerController {
  constructor(
    @repository(PollAnswerRepository)
    public pollAnswerRepository : PollAnswerRepository,
  ) {}

  @post('/pollAnswer', {
    responses: {
      '200': {
        description: 'PollAnswer model instance',
        content: {'application/json': {schema: getModelSchemaRef(PollAnswer)}},
      },
    },
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(PollAnswer, {
            title: 'NewPollAnswer',
            exclude: ['id'],
          }),
        },
      },
    })
    pollAnswer: Omit<PollAnswer, 'id'>,
  ): Promise<PollAnswer> {
    return this.pollAnswerRepository.create(pollAnswer);
  }

  @get('/pollAnswer/count', {
    responses: {
      '200': {
        description: 'PollAnswer model count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async count(
    @param.where(PollAnswer) where?: Where<PollAnswer>,
  ): Promise<Count> {
    return this.pollAnswerRepository.count(where);
  }

  @get('/pollAnswer', {
    responses: {
      '200': {
        description: 'Array of PollAnswer model instances',
        content: {
          'application/json': {
            schema: {
              type: 'array',
              items: getModelSchemaRef(PollAnswer, {includeRelations: true}),
            },
          },
        },
      },
    },
  })
  async find(
    @param.filter(PollAnswer) filter?: Filter<PollAnswer>,
  ): Promise<PollAnswer[]> {
    return this.pollAnswerRepository.find(filter);
  }

  @patch('/pollAnswer', {
    responses: {
      '200': {
        description: 'PollAnswer PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(PollAnswer, {partial: true}),
        },
      },
    })
    pollAnswer: PollAnswer,
    @param.where(PollAnswer) where?: Where<PollAnswer>,
  ): Promise<Count> {
    return this.pollAnswerRepository.updateAll(pollAnswer, where);
  }

  @get('/pollAnswer/{id}', {
    responses: {
      '200': {
        description: 'PollAnswer model instance',
        content: {
          'application/json': {
            schema: getModelSchemaRef(PollAnswer, {includeRelations: true}),
          },
        },
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.filter(PollAnswer, {exclude: 'where'}) filter?: FilterExcludingWhere<PollAnswer>
  ): Promise<PollAnswer> {
    return this.pollAnswerRepository.findById(id, filter);
  }

  @patch('/pollAnswer/{id}', {
    responses: {
      '204': {
        description: 'PollAnswer PATCH success',
      },
    },
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(PollAnswer, {partial: true}),
        },
      },
    })
    pollAnswer: PollAnswer,
  ): Promise<void> {
    await this.pollAnswerRepository.updateById(id, pollAnswer);
  }

  @put('/pollAnswer/{id}', {
    responses: {
      '204': {
        description: 'PollAnswer PUT success',
      },
    },
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() pollAnswer: PollAnswer,
  ): Promise<void> {
    await this.pollAnswerRepository.replaceById(id, pollAnswer);
  }

  @del('/pollAnswer/{id}', {
    responses: {
      '204': {
        description: 'PollAnswer DELETE success',
      },
    },
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.pollAnswerRepository.deleteById(id);
  }
}
