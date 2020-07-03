import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
} from '@loopback/rest';
import {
  Comment,
  Publication,
} from '../models';
import {CommentRepository} from '../repositories';

export class CommentPublicationController {
  constructor(
    @repository(CommentRepository)
    public commentRepository: CommentRepository,
  ) { }

  @get('/comments/{id}/publication', {
    responses: {
      '200': {
        description: 'Publication belonging to Comment',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Publication)},
          },
        },
      },
    },
  })
  async getPublication(
    @param.path.string('id') id: typeof Comment.prototype.id,
  ): Promise<Publication> {
    return this.commentRepository.publication(id);
  }
}
