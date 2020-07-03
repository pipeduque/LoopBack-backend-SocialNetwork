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
  Reaction,
} from '../models';
import {PublicationReactionRepository} from '../repositories';

export class PublicationReactionReactionController {
  constructor(
    @repository(PublicationReactionRepository)
    public publicationReactionRepository: PublicationReactionRepository,
  ) { }

  @get('/publication-reactions/{id}/reaction', {
    responses: {
      '200': {
        description: 'Reaction belonging to PublicationReaction',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Reaction)},
          },
        },
      },
    },
  })
  async getReaction(
    @param.path.string('id') id: typeof PublicationReaction.prototype.id,
  ): Promise<Reaction> {
    return this.publicationReactionRepository.reaction(id);
  }
}
