import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
} from '@loopback/rest';
import {
  Occupant,
  User,
} from '../models';
import {OccupantRepository} from '../repositories';

export class OccupantUserController {
  constructor(
    @repository(OccupantRepository)
    public occupantRepository: OccupantRepository,
  ) { }

  @get('/occupants/{id}/user', {
    responses: {
      '200': {
        description: 'User belonging to Occupant',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(User)},
          },
        },
      },
    },
  })
  async getUser(
    @param.path.string('id') id: typeof Occupant.prototype.id,
  ): Promise<User> {
    return this.occupantRepository.user(id);
  }
}
