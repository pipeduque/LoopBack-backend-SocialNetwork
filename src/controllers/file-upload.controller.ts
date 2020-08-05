import {inject} from '@loopback/core';
import {repository} from '@loopback/repository';
import {
  HttpErrors,
  param,
  post,
  Request,
  requestBody,
  Response,
  RestBindings,
} from '@loopback/rest';
import multer from 'multer';
import path from 'path';
import {UploadFilesKeys} from '../keys/upload-files-keys';
import {User} from '../models';
import {
  PublicationFileRepository,
  RoomRepository,
  UserRepository,
} from '../repositories';

export class FileUploadController {
  /**
   *
   * @param UserRepostory
   * @param PublicationFileRepository
   * @param RoomRepository
   */
  constructor(
    @repository(UserRepository)
    private userRepository: UserRepository,
    @repository(PublicationFileRepository)
    private publicationRepository: PublicationFileRepository,
    @repository(RoomRepository)
    private roomRepository: RoomRepository,
  ) {}

  // POST PARA USER IMAGE ASOCIADO A UN USERID

  /**
   * Add or replace the profile photo of a customer by customerId
   * @param request
   * @param userId
   * @param response
   */
  @post('/userProfilePhoto', {
    responses: {
      200: {
        content: {
          'application/json': {
            schema: {
              type: 'object',
            },
          },
        },
        description: 'User Photo Path',
      },
    },
  })
  async customerPhotoUpload(
    @inject(RestBindings.Http.RESPONSE) response: Response,
    @param.query.string('userId') userId: string,
    @requestBody.file() request: Request,
  ): Promise<object | false> {
    const userPhotoPath = path.join(
      __dirname,
      UploadFilesKeys.FOTO_PERFIL_IMAGE_PATH,
    );
    let res = await this.StoreFileToPath(
      userPhotoPath,
      UploadFilesKeys.FOTO_PERFIL_IMAGE_FIELDNAME,
      request,
      response,
      UploadFilesKeys.IMAGE_ACCEPTED_EXT,
    );
    if (res) {
      const filename = response.req?.file.filename;
      if (filename) {
        let us: User = await this.userRepository.findById(userId);
        if (us) {
          us.pathPhoto = filename;
          this.userRepository.replaceById(userId, us);
          return {filename: filename};
        }
      }
    }
    return res;
  }

  // POST PARA ROOM

  /**
   *
   * @param response
   * @param roomId
   * @param request
   */
  @post('/roomImage', {
    responses: {
      200: {
        content: {
          'application/json': {
            schema: {
              type: 'object',
            },
          },
        },
        description: 'Room Image',
      },
    },
  })
  async roomImageUpload(
    @inject(RestBindings.Http.RESPONSE) response: Response,
    @requestBody.file() request: Request,
  ): Promise<object | false> {
    const roomImagePath = path.join(__dirname, UploadFilesKeys.ROOM_IMAGE_PATH);
    let res = await this.StoreFileToPath(
      roomImagePath,
      UploadFilesKeys.ROOM_IMAGE_FIELDNAME,
      request,
      response,
      UploadFilesKeys.IMAGE_ACCEPTED_EXT,
    );
    if (res) {
      const filename = response.req?.file.filename;
      if (filename) {
        return {filename: filename};
      }
    }
    return res;
  }

  //POST PARA PUBLICATION IMAGE

  /**
   *
   * @param response
   * @param publicationId
   * @param request
   */
  @post('/publicationImage', {
    responses: {
      200: {
        content: {
          'application/json': {
            schema: {
              type: 'object',
            },
          },
        },
        description: 'Publication Image',
      },
    },
  })
  async publicationImageUpload(
    @inject(RestBindings.Http.RESPONSE) response: Response,
    @requestBody.file() request: Request,
  ): Promise<object | false> {
    const publicationImagePath = path.join(
      __dirname,
      UploadFilesKeys.PUBLICATION_IMAGE_PATH,
    );
    let res = await this.StoreFileToPath(
      publicationImagePath,
      UploadFilesKeys.PUBLICATION_IMAGE_FIELDNAME,
      request,
      response,
      UploadFilesKeys.IMAGE_ACCEPTED_EXT,
    );
    if (res) {
      const filename = response.req?.file.filename;
      if (filename) {
        return {filename: filename};
      }
    }
    return res;
  }

  // POST PARA USER IMAGE

  /**
   *
   * @param response
   * @param userId
   * @param request
   */
  @post('/userImage', {
    responses: {
      200: {
        content: {
          'application/json': {
            schema: {
              type: 'object',
            },
          },
        },
        description: 'User Image',
      },
    },
  })
  async userImageUpload(
    @inject(RestBindings.Http.RESPONSE) response: Response,
    @requestBody.file() request: Request,
  ): Promise<object | false> {
    const userImagePath = path.join(
      __dirname,
      UploadFilesKeys.FOTO_PERFIL_IMAGE_PATH,
    );
    let res = await this.StoreFileToPath(
      userImagePath,
      UploadFilesKeys.FOTO_PERFIL_IMAGE_FIELDNAME,
      request,
      response,
      UploadFilesKeys.IMAGE_ACCEPTED_EXT,
    );
    if (res) {
      const filename = response.req?.file.filename;
      if (filename) {
        return {filename: filename};
      }
    }
    return res;
  }

  /**
   * store the file in a specific path
   * @param storePath
   * @param request
   * @param response
   */
  private StoreFileToPath(
    storePath: string,
    fieldname: string,
    request: Request,
    response: Response,
    acceptedExt: string[],
  ) {
    return new Promise<object>((resolve, reject) => {
      const storage = this.GetMulterStorageConfig(storePath);
      const upload = multer({
        storage: storage,
        fileFilter: function (req, file, callback) {
          var ext = path.extname(file.originalname).toUpperCase();
          console.log('Extensión del archivo: ' + ext);
          console.log(acceptedExt);
          console.log(acceptedExt.includes(ext));
          if (acceptedExt.includes(ext)) {
            return callback(null, true);
          }
          return callback(
            new HttpErrors[400]('This format file is not supported.'),
          );
        },
        limits: {
          fileSize: UploadFilesKeys.MAX_FILE_SIZE,
        },
      }).single(fieldname);
      upload(request, response, (err: any) => {
        if (err) {
          reject(err);
        }
        resolve(response);
      });
    });
  }

  /**
   * Return a config for multer storage
   * @param path
   */
  // Donde lo voy a guardar y como lo voy a guardar y con que nombre y en que ruta
  private GetMulterStorageConfig(path: string) {
    var filename: string = '';
    const storage = multer.diskStorage({
      destination: function (req, file, cb) {
        cb(null, path);
      },
      filename: function (req, file, cb) {
        filename = `${Date.now()}-${file.originalname}`;
        cb(null, filename);
      },
    });
    return storage;
  }
}
