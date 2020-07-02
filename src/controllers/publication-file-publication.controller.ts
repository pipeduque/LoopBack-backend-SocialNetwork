import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
} from '@loopback/rest';
import {
  PublicationFile,
  Publication,
} from '../models';
import {PublicationFileRepository} from '../repositories';

export class PublicationFilePublicationController {
  constructor(
    @repository(PublicationFileRepository)
    public publicationFileRepository: PublicationFileRepository,
  ) { }

  @get('/publication-files/{id}/publication', {
    responses: {
      '200': {
        description: 'Publication belonging to PublicationFile',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Publication)},
          },
        },
      },
    },
  })
  async getPublication(
    @param.path.string('id') id: typeof PublicationFile.prototype.id,
  ): Promise<Publication> {
    return this.publicationFileRepository.publication(id);
  }
}
