import {
  Count,
  CountSchema,
  Filter,
  repository,
  Where,
} from '@loopback/repository';
import {
  del,
  get,
  getModelSchemaRef,
  getWhereSchemaFor,
  param,
  patch,
  post,
  requestBody,
} from '@loopback/rest';
import {
  User,
  Chat,
} from '../models';
import {UserRepository} from '../repositories';

export class UserChatController {
  constructor(
    @repository(UserRepository) protected userRepository: UserRepository,
  ) { }

  @get('/users/{id}/chats', {
    responses: {
      '200': {
        description: 'Array of User has many Chat',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Chat)},
          },
        },
      },
    },
  })
  async find(
    @param.path.string('id') id: string,
    @param.query.object('filter') filter?: Filter<Chat>,
  ): Promise<Chat[]> {
    return this.userRepository.chats(id).find(filter);
  }

  @post('/users/{id}/chats', {
    responses: {
      '200': {
        description: 'User model instance',
        content: {'application/json': {schema: getModelSchemaRef(Chat)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof User.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Chat, {
            title: 'NewChatInUser',
            exclude: ['id'],
            optional: ['userId']
          }),
        },
      },
    }) chat: Omit<Chat, 'id'>,
  ): Promise<Chat> {
    return this.userRepository.chats(id).create(chat);
  }

  @patch('/users/{id}/chats', {
    responses: {
      '200': {
        description: 'User.Chat PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Chat, {partial: true}),
        },
      },
    })
    chat: Partial<Chat>,
    @param.query.object('where', getWhereSchemaFor(Chat)) where?: Where<Chat>,
  ): Promise<Count> {
    return this.userRepository.chats(id).patch(chat, where);
  }

  @del('/users/{id}/chats', {
    responses: {
      '200': {
        description: 'User.Chat DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(Chat)) where?: Where<Chat>,
  ): Promise<Count> {
    return this.userRepository.chats(id).delete(where);
  }
}
