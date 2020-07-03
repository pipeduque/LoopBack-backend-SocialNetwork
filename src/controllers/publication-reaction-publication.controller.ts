import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
} from '@loopback/rest';
import {
  PublicationReaction,
  Publication,
} from '../models';
import {PublicationReactionRepository} from '../repositories';

export class PublicationReactionPublicationController {
  constructor(
    @repository(PublicationReactionRepository)
    public publicationReactionRepository: PublicationReactionRepository,
  ) { }

  @get('/publication-reactions/{id}/publication', {
    responses: {
      '200': {
        description: 'Publication belonging to PublicationReaction',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Publication)},
          },
        },
      },
    },
  })
  async getPublication(
    @param.path.string('id') id: typeof PublicationReaction.prototype.id,
  ): Promise<Publication> {
    return this.publicationReactionRepository.publication(id);
  }
}
