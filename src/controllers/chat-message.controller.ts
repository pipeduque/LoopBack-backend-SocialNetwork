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
  Chat,
  Message,
} from '../models';
import {ChatRepository} from '../repositories';

export class ChatMessageController {
  constructor(
    @repository(ChatRepository) protected chatRepository: ChatRepository,
  ) { }

  @get('/chats/{id}/messages', {
    responses: {
      '200': {
        description: 'Array of Chat has many Message',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Message)},
          },
        },
      },
    },
  })
  async find(
    @param.path.string('id') id: string,
    @param.query.object('filter') filter?: Filter<Message>,
  ): Promise<Message[]> {
    return this.chatRepository.chats(id).find(filter);
  }

  @post('/chats/{id}/messages', {
    responses: {
      '200': {
        description: 'Chat model instance',
        content: {'application/json': {schema: getModelSchemaRef(Message)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof Chat.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Message, {
            title: 'NewMessageInChat',
            exclude: ['id'],
            optional: ['chatId']
          }),
        },
      },
    }) message: Omit<Message, 'id'>,
  ): Promise<Message> {
    return this.chatRepository.chats(id).create(message);
  }

  @patch('/chats/{id}/messages', {
    responses: {
      '200': {
        description: 'Chat.Message PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Message, {partial: true}),
        },
      },
    })
    message: Partial<Message>,
    @param.query.object('where', getWhereSchemaFor(Message)) where?: Where<Message>,
  ): Promise<Count> {
    return this.chatRepository.chats(id).patch(message, where);
  }

  @del('/chats/{id}/messages', {
    responses: {
      '200': {
        description: 'Chat.Message DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(Message)) where?: Where<Message>,
  ): Promise<Count> {
    return this.chatRepository.chats(id).delete(where);
  }
}
