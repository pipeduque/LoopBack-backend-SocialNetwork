import {inject} from '@loopback/core';
import {repository} from '@loopback/repository';
import {
  get,
  HttpErrors,
  oas,
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
import {Publication, Room, User} from '../models';
import {
  PublicationRepository,
  RoomRepository,
  UserRepository,
} from '../repositories';

export class FileUploadController {
  /**
   *
   * @param UserRepostory
   * @param PublicationRepository
   * @param RoomRepository
   */
  constructor(
    @repository(UserRepository)
    private userRepository: UserRepository,
    @repository(PublicationRepository)
    private publicationRepository: PublicationRepository,
    @repository(RoomRepository)
    private roomRepository: RoomRepository,
  ) {}

// POST PARA ROOM IMAGE ASOCIADO A UN ROOMID

  /**
   * Add or replace the profile photo of a customer by customerId
   * @param request
   * @param roomId
   * @param response
   */
  @post('/roomAssociatedImage', {
    responses: {
      200: {
        content: {
          'application/json': {
            schema: {
              type: 'object',
            },
          },
        },
        description: 'Room Image Path associated to RoomId',
      },
    },
  })
  async roomUpload(
    @inject(RestBindings.Http.RESPONSE) response: Response,
    @param.query.string('roomId') roomId: string,
    @requestBody.file() request: Request,
  ): Promise<object | false> {
    const roomPath = path.join(
      __dirname,
      UploadFilesKeys.ROOM_IMAGE_PATH,
    );
    let res = await this.StoreFileToPath(
      roomPath,
      UploadFilesKeys.ROOM_IMAGE_FIELDNAME,
      request,
      response,
      UploadFilesKeys.IMAGE_ACCEPTED_EXT,
    );
    if (res) {
      const filename = response.req?.file.filename;
      if (filename) {
        let rm: Room = await this.roomRepository.findById(
          roomId,
        );
        if (rm) {
          rm.path = filename;
          this.roomRepository.replaceById(roomId, rm);
          return {filename: filename};
        }
      }
    }
    return res;
  }

  // POST PARA PUBLICATION IMAGE ASOCIADO A UN PUBLICATIONID

  /**
   * Add or replace the profile photo of a customer by customerId
   * @param request
   * @param publicationId
   * @param response
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
        description: 'Publication Image Path associated to PublicationId',
      },
    },
  })
  async publicationUpload(
    @inject(RestBindings.Http.RESPONSE) response: Response,
    @param.query.string('publicationId') publicationId: string,
    @requestBody.file() request: Request,
  ): Promise<object | false> {
    const publicationPath = path.join(
      __dirname,
      UploadFilesKeys.PUBLICATION_IMAGE_PATH,
    );
    let res = await this.StoreFileToPath(
      publicationPath,
      UploadFilesKeys.PUBLICATION_IMAGE_FIELDNAME,
      request,
      response,
      UploadFilesKeys.IMAGE_ACCEPTED_EXT,
    );
    if (res) {
      const filename = response.req?.file.filename;
      if (filename) {
        let pub: Publication = await this.publicationRepository.findById(
          publicationId,
        );
        if (pub) {
          pub.pathImage = filename;
          this.publicationRepository.replaceById(publicationId, pub);
          return {filename: filename};
        }
      }
    }
    return res;
  }

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
  @post('/publicationImg', {
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
  /**
   *
   * @param recordId
   * @param response
   */
  @get('/files/{type}/{recordId}')
  @oas.response.file()
  async downloadFile(
    @param.path.string('type') type: string,
    @param.path.string('recordId') recordId: string,
    @inject(RestBindings.Http.RESPONSE) response: Response,
  ) {
    // let filename
    const folder = this.GetFolderPathByType(type);
    const fileName = await this.GetFilenameById(type, recordId);
    const file = path.resolve(folder, fileName);
    response.download(file, fileName);
    return response;
  }
  /**
   * Get the folder when files are uploaded by type
   * @param type
   */
  private GetFolderPathByType(type: string) {
    let filePath = '';
    switch (type) {
      // publication
      case 'publication':
        filePath = path.join(__dirname, UploadFilesKeys.PUBLICATION_IMAGE_PATH);
        break;
      // room
      case 'room':
        filePath = path.join(__dirname, UploadFilesKeys.ROOM_IMAGE_PATH);
        break;
      // user
      case 'user':
        filePath = path.join(__dirname, UploadFilesKeys.FOTO_PERFIL_IMAGE_PATH);
        break;
    }
    return filePath;
  }
  /**
   *
   * @param type
   */
  private async GetFilenameById(type: string, recordId: string) {
    let fileName = '';
    switch (type) {
      // publication
      case 'publication':
        const publication: Publication = await this.publicationRepository.findById(
          recordId,
        );
        fileName = publication.pathImage ?? '';
        break;
      // room
      case 'room':
        const room: Room = await this.roomRepository.findById(recordId);
        fileName = room.path ?? '';
        break;
      // user
      case 'user':
        const user: User = await this.userRepository.findById(recordId);
        fileName = user.pathPhoto ?? '';
        break;
    }
    return fileName;
  }
}
