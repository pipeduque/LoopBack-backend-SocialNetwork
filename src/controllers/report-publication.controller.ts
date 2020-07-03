import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
} from '@loopback/rest';
import {
  Report,
  Publication,
} from '../models';
import {ReportRepository} from '../repositories';

export class ReportPublicationController {
  constructor(
    @repository(ReportRepository)
    public reportRepository: ReportRepository,
  ) { }

  @get('/reports/{id}/publication', {
    responses: {
      '200': {
        description: 'Publication belonging to Report',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Publication)},
          },
        },
      },
    },
  })
  async getPublication(
    @param.path.string('id') id: typeof Report.prototype.id,
  ): Promise<Publication> {
    return this.reportRepository.publication(id);
  }
}
