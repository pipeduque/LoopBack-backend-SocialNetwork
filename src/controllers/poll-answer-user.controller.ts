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
  User,
} from '../models';
import {PollAnswerRepository} from '../repositories';

export class PollAnswerUserController {
  constructor(
    @repository(PollAnswerRepository)
    public pollAnswerRepository: PollAnswerRepository,
  ) { }

  @get('/poll-answers/{id}/user', {
    responses: {
      '200': {
        description: 'User belonging to PollAnswer',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(User)},
          },
        },
      },
    },
  })
  async getUser(
    @param.path.string('id') id: typeof PollAnswer.prototype.id,
  ): Promise<User> {
    return this.pollAnswerRepository.user(id);
  }
}
