import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
} from '@loopback/rest';
import {
  Poll,
  User,
} from '../models';
import {PollRepository} from '../repositories';

export class PollUserController {
  constructor(
    @repository(PollRepository)
    public pollRepository: PollRepository,
  ) { }

  @get('/polls/{id}/user', {
    responses: {
      '200': {
        description: 'User belonging to Poll',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(User)},
          },
        },
      },
    },
  })
  async getUser(
    @param.path.string('id') id: typeof Poll.prototype.id,
  ): Promise<User> {
    return this.pollRepository.user(id);
  }
}
