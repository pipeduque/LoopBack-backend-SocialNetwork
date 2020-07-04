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
import {Poll} from '../models';
import {PollRepository} from '../repositories';

export class PollController {
  constructor(
    @repository(PollRepository)
    public pollRepository : PollRepository,
  ) {}

  @post('/poll', {
    responses: {
      '200': {
        description: 'Poll model instance',
        content: {'application/json': {schema: getModelSchemaRef(Poll)}},
      },
    },
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Poll, {
            title: 'NewPoll',
            exclude: ['id'],
          }),
        },
      },
    })
    poll: Omit<Poll, 'id'>,
  ): Promise<Poll> {
    return this.pollRepository.create(poll);
  }

  @get('/poll/count', {
    responses: {
      '200': {
        description: 'Poll model count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async count(
    @param.where(Poll) where?: Where<Poll>,
  ): Promise<Count> {
    return this.pollRepository.count(where);
  }

  @get('/poll', {
    responses: {
      '200': {
        description: 'Array of Poll model instances',
        content: {
          'application/json': {
            schema: {
              type: 'array',
              items: getModelSchemaRef(Poll, {includeRelations: true}),
            },
          },
        },
      },
    },
  })
  async find(
    @param.filter(Poll) filter?: Filter<Poll>,
  ): Promise<Poll[]> {
    return this.pollRepository.find(filter);
  }

  @patch('/poll', {
    responses: {
      '200': {
        description: 'Poll PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Poll, {partial: true}),
        },
      },
    })
    poll: Poll,
    @param.where(Poll) where?: Where<Poll>,
  ): Promise<Count> {
    return this.pollRepository.updateAll(poll, where);
  }

  @get('/poll/{id}', {
    responses: {
      '200': {
        description: 'Poll model instance',
        content: {
          'application/json': {
            schema: getModelSchemaRef(Poll, {includeRelations: true}),
          },
        },
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.filter(Poll, {exclude: 'where'}) filter?: FilterExcludingWhere<Poll>
  ): Promise<Poll> {
    return this.pollRepository.findById(id, filter);
  }

  @patch('/poll/{id}', {
    responses: {
      '204': {
        description: 'Poll PATCH success',
      },
    },
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Poll, {partial: true}),
        },
      },
    })
    poll: Poll,
  ): Promise<void> {
    await this.pollRepository.updateById(id, poll);
  }

  @put('/poll/{id}', {
    responses: {
      '204': {
        description: 'Poll PUT success',
      },
    },
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() poll: Poll,
  ): Promise<void> {
    await this.pollRepository.replaceById(id, poll);
  }

  @del('/poll/{id}', {
    responses: {
      '204': {
        description: 'Poll DELETE success',
      },
    },
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.pollRepository.deleteById(id);
  }
}
