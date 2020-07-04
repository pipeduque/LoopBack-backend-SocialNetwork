import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
} from '@loopback/rest';
import {
  PollAnswer,
  Poll,
} from '../models';
import {PollAnswerRepository} from '../repositories';

export class PollAnswerPollController {
  constructor(
    @repository(PollAnswerRepository)
    public pollAnswerRepository: PollAnswerRepository,
  ) { }

  @get('/poll-answers/{id}/poll', {
    responses: {
      '200': {
        description: 'Poll belonging to PollAnswer',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Poll)},
          },
        },
      },
    },
  })
  async getPoll(
    @param.path.string('id') id: typeof PollAnswer.prototype.id,
  ): Promise<Poll> {
    return this.pollAnswerRepository.poll(id);
  }
}
