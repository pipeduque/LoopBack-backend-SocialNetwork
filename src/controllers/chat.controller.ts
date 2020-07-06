import {authenticate} from '@loopback/authentication';
import {
  Count,
  CountSchema,
  Filter,
  FilterExcludingWhere,
  repository,
  Where
} from '@loopback/repository';
import {
  del, get,
  getModelSchemaRef, param,


  patch, post,




  put,

  requestBody
} from '@loopback/rest';
import {Chat} from '../models';
import {ChatRepository} from '../repositories';

export class ChatController {
  constructor(
    @repository(ChatRepository)
    public chatRepository: ChatRepository,
  ) {}

  @post('/chat', {
    responses: {
      '200': {
        description: 'Chat model instance',
        content: {'application/json': {schema: getModelSchemaRef(Chat)}},
      },
    },
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Chat, {
            title: 'NewChat',
            exclude: ['id'],
          }),
        },
      },
    })
    chat: Omit<Chat, 'id'>,
  ): Promise<Chat> {
    return this.chatRepository.create(chat);
  }

  @authenticate('TokenStrategy')
  @get('/chat/count', {
    responses: {
      '200': {
        description: 'Chat model count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async count(
    @param.where(Chat) where?: Where<Chat>,
  ): Promise<Count> {
    return this.chatRepository.count(where);
  }

  @get('/chat', {
    responses: {
      '200': {
        description: 'Array of Chat model instances',
        content: {
          'application/json': {
            schema: {
              type: 'array',
              items: getModelSchemaRef(Chat, {includeRelations: true}),
            },
          },
        },
      },
    },
  })
  async find(
    @param.filter(Chat) filter?: Filter<Chat>,
  ): Promise<Chat[]> {
    return this.chatRepository.find(filter);
  }

  @patch('/chat', {
    responses: {
      '200': {
        description: 'Chat PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Chat, {partial: true}),
        },
      },
    })
    chat: Chat,
    @param.where(Chat) where?: Where<Chat>,
  ): Promise<Count> {
    return this.chatRepository.updateAll(chat, where);
  }

  @get('/chat/{id}', {
    responses: {
      '200': {
        description: 'Chat model instance',
        content: {
          'application/json': {
            schema: getModelSchemaRef(Chat, {includeRelations: true}),
          },
        },
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.filter(Chat, {exclude: 'where'}) filter?: FilterExcludingWhere<Chat>
  ): Promise<Chat> {
    return this.chatRepository.findById(id, filter);
  }

  @patch('/chat/{id}', {
    responses: {
      '204': {
        description: 'Chat PATCH success',
      },
    },
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Chat, {partial: true}),
        },
      },
    })
    chat: Chat,
  ): Promise<void> {
    await this.chatRepository.updateById(id, chat);
  }

  @put('/chat/{id}', {
    responses: {
      '204': {
        description: 'Chat PUT success',
      },
    },
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() chat: Chat,
  ): Promise<void> {
    await this.chatRepository.replaceById(id, chat);
  }

  @del('/chat/{id}', {
    responses: {
      '204': {
        description: 'Chat DELETE success',
      },
    },
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.chatRepository.deleteById(id);
  }
}
