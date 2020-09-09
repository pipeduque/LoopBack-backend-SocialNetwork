import {
  Count,
  CountSchema,
  Filter,
  repository,
  Where
} from '@loopback/repository';
import {
  del,
  get,
  getModelSchemaRef,
  getWhereSchemaFor,
  param,
  patch,
  post,
  requestBody
} from '@loopback/rest';
import {Publication, User} from '../models';
import {UserRepository} from '../repositories';

export class UserPublicationController {
  constructor(
    @repository(UserRepository) protected userRepository: UserRepository,
  ) {}

  @get('/users/{id}/publications', {
    responses: {
      '200': {
        description: 'Array of User has many Publication',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Publication)},
          },
        },
      },
    },
  })
  async find(
    @param.path.string('id') id: string,
    @param.query.object('filter') filter?: Filter<Publication>,
  ): Promise<Publication[]> {
    return this.userRepository.publications(id).find(filter);
  }

  @post('/users/{id}/publications', {
    responses: {
      '200': {
        description: 'User model instance',
        content: {'application/json': {schema: getModelSchemaRef(Publication)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof User.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Publication, {
            title: 'NewPublicationInUser',
            exclude: ['id'],
            optional: ['userId']
          }),
        },
      },
    }) publication: Omit<Publication, 'id'>,
  ): Promise<Publication> {
    return this.userRepository.publications(id).create(publication);
  }

  @patch('/users/{id}/publications', {
    responses: {
      '200': {
        description: 'User.Publication PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Publication, {partial: true}),
        },
      },
    })
    publication: Partial<Publication>,
    @param.query.object('where', getWhereSchemaFor(Publication)) where?: Where<Publication>,
  ): Promise<Count> {
    return this.userRepository.publications(id).patch(publication, where);
  }

  @del('/users/{id}/publications', {
    responses: {
      '200': {
        description: 'User.Publication DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(Publication)) where?: Where<Publication>,
  ): Promise<Count> {
    return this.userRepository.publications(id).delete(where);
  }
}
