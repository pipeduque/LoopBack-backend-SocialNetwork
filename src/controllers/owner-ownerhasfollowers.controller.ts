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
import {Owner, Ownerhasfollowers} from '../models';
import {OwnerRepository} from '../repositories';

export class OwnerOwnerhasfollowersController {
  constructor(
    @repository(OwnerRepository) protected ownerRepository: OwnerRepository,
  ) {}

  @get('/owners/{ownerId}/ownerhasfollowers', {
    responses: {
      '200': {
        description: 'Array of Owner has many Ownerhasfollowers',
        content: {
          'application/json': {
            schema: {
              type: 'array',
              items: getModelSchemaRef(Ownerhasfollowers),
            },
          },
        },
      },
    },
  })
  async find(
    @param.path.string('ownerId') id: string,
    @param.query.object('filter') filter?: Filter<Ownerhasfollowers>,
  ): Promise<Ownerhasfollowers[]> {
    return this.ownerRepository.ownerhasfollowers(id).find(filter);
  }

  @post('/owners/{id}/ownerhasfollowers', {
    responses: {
      '200': {
        description: 'Owner model instance',
        content: {
          'application/json': {schema: getModelSchemaRef(Ownerhasfollowers)},
        },
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof Owner.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Ownerhasfollowers, {
            title: 'NewOwnerhasfollowersInOwner',
            exclude: ['id'],
            optional: ['ownerId'],
          }),
        },
      },
    })
    ownerhasfollowers: Omit<Ownerhasfollowers, 'id'>,
  ): Promise<Ownerhasfollowers> {
    return this.ownerRepository.ownerhasfollowers(id).create(ownerhasfollowers);
  }

  @patch('/owners/{id}/ownerhasfollowers', {
    responses: {
      '200': {
        description: 'Owner.Ownerhasfollowers PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Ownerhasfollowers, {partial: true}),
        },
      },
    })
    ownerhasfollowers: Partial<Ownerhasfollowers>,
    @param.query.object('where', getWhereSchemaFor(Ownerhasfollowers))
    where?: Where<Ownerhasfollowers>,
  ): Promise<Count> {
    return this.ownerRepository
      .ownerhasfollowers(id)
      .patch(ownerhasfollowers, where);
  }

  @del('/owners/{id}/ownerhasfollowers', {
    responses: {
      '200': {
        description: 'Owner.Ownerhasfollowers DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(Ownerhasfollowers))
    where?: Where<Ownerhasfollowers>,
  ): Promise<Count> {
    return this.ownerRepository.ownerhasfollowers(id).delete(where);
  }
}
