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
import {Request} from '../models';
import {RequestRepository} from '../repositories';

export class RequestController {
  constructor(
    @repository(RequestRepository)
    public requestRepository : RequestRepository,
  ) {}

  @post('/requests', {
    responses: {
      '200': {
        description: 'Request model instance',
        content: {'application/json': {schema: getModelSchemaRef(Request)}},
      },
    },
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Request, {
            title: 'NewRequest',
            
          }),
        },
      },
    })
    request: Request,
  ): Promise<Request> {
    return this.requestRepository.create(request);
  }

  @get('/requests/count', {
    responses: {
      '200': {
        description: 'Request model count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async count(
    @param.where(Request) where?: Where<Request>,
  ): Promise<Count> {
    return this.requestRepository.count(where);
  }

  @get('/requests', {
    responses: {
      '200': {
        description: 'Array of Request model instances',
        content: {
          'application/json': {
            schema: {
              type: 'array',
              items: getModelSchemaRef(Request, {includeRelations: true}),
            },
          },
        },
      },
    },
  })
  async find(
    @param.filter(Request) filter?: Filter<Request>,
  ): Promise<Request[]> {
    return this.requestRepository.find(filter);
  }

  @patch('/requests', {
    responses: {
      '200': {
        description: 'Request PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Request, {partial: true}),
        },
      },
    })
    request: Request,
    @param.where(Request) where?: Where<Request>,
  ): Promise<Count> {
    return this.requestRepository.updateAll(request, where);
  }

  @get('/requests/{id}', {
    responses: {
      '200': {
        description: 'Request model instance',
        content: {
          'application/json': {
            schema: getModelSchemaRef(Request, {includeRelations: true}),
          },
        },
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.filter(Request, {exclude: 'where'}) filter?: FilterExcludingWhere<Request>
  ): Promise<Request> {
    return this.requestRepository.findById(id, filter);
  }

  @patch('/requests/{id}', {
    responses: {
      '204': {
        description: 'Request PATCH success',
      },
    },
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Request, {partial: true}),
        },
      },
    })
    request: Request,
  ): Promise<void> {
    await this.requestRepository.updateById(id, request);
  }

  @put('/requests/{id}', {
    responses: {
      '204': {
        description: 'Request PUT success',
      },
    },
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() request: Request,
  ): Promise<void> {
    await this.requestRepository.replaceById(id, request);
  }

  @del('/requests/{id}', {
    responses: {
      '204': {
        description: 'Request DELETE success',
      },
    },
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.requestRepository.deleteById(id);
  }
}
