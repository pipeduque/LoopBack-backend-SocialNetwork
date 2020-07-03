import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
} from '@loopback/rest';
import {
  Message,
  Chat,
} from '../models';
import {MessageRepository} from '../repositories';

export class MessageChatController {
  constructor(
    @repository(MessageRepository)
    public messageRepository: MessageRepository,
  ) { }

  @get('/messages/{id}/chat', {
    responses: {
      '200': {
        description: 'Chat belonging to Message',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Chat)},
          },
        },
      },
    },
  })
  async getChat(
    @param.path.string('id') id: typeof Message.prototype.id,
  ): Promise<Chat> {
    return this.messageRepository.chat(id);
  }
}
