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
import {PublicationFile} from '../models';
import {PublicationFileRepository} from '../repositories';

export class PublicationFileController {
  constructor(
    @repository(PublicationFileRepository)
    public publicationFileRepository : PublicationFileRepository,
  ) {}

  @post('/publicationFile', {
    responses: {
      '200': {
        description: 'PublicationFile model instance',
        content: {'application/json': {schema: getModelSchemaRef(PublicationFile)}},
      },
    },
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(PublicationFile, {
            title: 'NewPublicationFile',
            exclude: ['id'],
          }),
        },
      },
    })
    publicationFile: Omit<PublicationFile, 'id'>,
  ): Promise<PublicationFile> {
    return this.publicationFileRepository.create(publicationFile);
  }

  @get('/publicationFile/count', {
    responses: {
      '200': {
        description: 'PublicationFile model count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async count(
    @param.where(PublicationFile) where?: Where<PublicationFile>,
  ): Promise<Count> {
    return this.publicationFileRepository.count(where);
  }

  @get('/publicationFile', {
    responses: {
      '200': {
        description: 'Array of PublicationFile model instances',
        content: {
          'application/json': {
            schema: {
              type: 'array',
              items: getModelSchemaRef(PublicationFile, {includeRelations: true}),
            },
          },
        },
      },
    },
  })
  async find(
    @param.filter(PublicationFile) filter?: Filter<PublicationFile>,
  ): Promise<PublicationFile[]> {
    return this.publicationFileRepository.find(filter);
  }

  @patch('/publicationFile', {
    responses: {
      '200': {
        description: 'PublicationFile PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(PublicationFile, {partial: true}),
        },
      },
    })
    publicationFile: PublicationFile,
    @param.where(PublicationFile) where?: Where<PublicationFile>,
  ): Promise<Count> {
    return this.publicationFileRepository.updateAll(publicationFile, where);
  }

  @get('/publicationFile/{id}', {
    responses: {
      '200': {
        description: 'PublicationFile model instance',
        content: {
          'application/json': {
            schema: getModelSchemaRef(PublicationFile, {includeRelations: true}),
          },
        },
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.filter(PublicationFile, {exclude: 'where'}) filter?: FilterExcludingWhere<PublicationFile>
  ): Promise<PublicationFile> {
    return this.publicationFileRepository.findById(id, filter);
  }

  @patch('/publicationFile/{id}', {
    responses: {
      '204': {
        description: 'PublicationFile PATCH success',
      },
    },
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(PublicationFile, {partial: true}),
        },
      },
    })
    publicationFile: PublicationFile,
  ): Promise<void> {
    await this.publicationFileRepository.updateById(id, publicationFile);
  }

  @put('/publicationFile/{id}', {
    responses: {
      '204': {
        description: 'PublicationFile PUT success',
      },
    },
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() publicationFile: PublicationFile,
  ): Promise<void> {
    await this.publicationFileRepository.replaceById(id, publicationFile);
  }

  @del('/publicationFile/{id}', {
    responses: {
      '204': {
        description: 'PublicationFile DELETE success',
      },
    },
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.publicationFileRepository.deleteById(id);
  }
}
