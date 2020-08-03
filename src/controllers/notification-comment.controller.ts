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
  Notification,
  Comment,
} from '../models';
import {NotificationRepository} from '../repositories';

export class NotificationCommentController {
  constructor(
    @repository(NotificationRepository) protected notificationRepository: NotificationRepository,
  ) { }

  @get('/notifications/{id}/comment', {
    responses: {
      '200': {
        description: 'Notification has one Comment',
        content: {
          'application/json': {
            schema: getModelSchemaRef(Comment),
          },
        },
      },
    },
  })
  async get(
    @param.path.string('id') id: string,
    @param.query.object('filter') filter?: Filter<Comment>,
  ): Promise<Comment> {
    return this.notificationRepository.comment(id).get(filter);
  }

  @post('/notifications/{id}/comment', {
    responses: {
      '200': {
        description: 'Notification model instance',
        content: {'application/json': {schema: getModelSchemaRef(Comment)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof Notification.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Comment, {
            title: 'NewCommentInNotification',
            exclude: ['id'],
            optional: ['notificationId']
          }),
        },
      },
    }) comment: Omit<Comment, 'id'>,
  ): Promise<Comment> {
    return this.notificationRepository.comment(id).create(comment);
  }

  @patch('/notifications/{id}/comment', {
    responses: {
      '200': {
        description: 'Notification.Comment PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Comment, {partial: true}),
        },
      },
    })
    comment: Partial<Comment>,
    @param.query.object('where', getWhereSchemaFor(Comment)) where?: Where<Comment>,
  ): Promise<Count> {
    return this.notificationRepository.comment(id).patch(comment, where);
  }

  @del('/notifications/{id}/comment', {
    responses: {
      '200': {
        description: 'Notification.Comment DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(Comment)) where?: Where<Comment>,
  ): Promise<Count> {
    return this.notificationRepository.comment(id).delete(where);
  }
}
