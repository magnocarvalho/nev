import { photosModel, IUsuarioPhotos } from "./../model/definitions/Photo";


class PhotoCtlr {
  static create(req, res, next) {
    var obj = req.body;
    photosModel.create(obj, (err, data) => {
      if (err) next(err);
      else res.json(data);
    });
  }
 
  static buscarAlbuns(req, res, next) {
    var obj = req.params.id;
    PhotoCtlr.getByIdUser(obj).then(
      data => {
        res.json(data);
      },
      err => {
        next(err);
      }
    );
  }
  static buscarAlbum(req, res, next) {
    var obj = req.params.id;
    PhotoCtlr.getById(obj).then(
      data => {
        res.json(data);
      },
      err => {
        next(err);
      }
    );
  }
  static deletarFoto(req, res, next) {
    var obj = req.body;
    // console.log(req);
    PhotoCtlr.deleteFoto(obj).then(
      data => {
        res.json(data);
      },
      err => {
        next(err);
      }
    );
  }
  
  private static addFotosArray(obj) {
    return new Promise<IUsuarioPhotos>((resolve, reject) => {
      photosModel.findOneAndUpdate(
        { _id: obj.id },
        { $push: { namePhotos: obj.namePhotos } },
        { safe: true, upsert: true },
        function(err, doc) {
          if (err) {
            console.log(err);
            reject(err);
          } else {
            console.log(doc);
            resolve(doc);
          }
        }
      );
    });
  }
  private static deleteFoto(obj) {
    return new Promise<IUsuarioPhotos>((resolve, reject) => {
      photosModel.findByIdAndUpdate(
        obj._id,
        { $pull: { namePhotos: obj.name } },
        { safe: true, upsert: true },
        function(err, doc) {
          if (err) {
            console.log('erro a deletar a foto' + obj + err);
            reject(err);
          } else {
            console.log('deletou a foto' + obj + doc);
            resolve(doc);
          }
        }
      );
    });
  }
  private static getById(id) {
    return new Promise<IUsuarioPhotos>((resolve, reject) => {
      photosModel.findOne({ isDeleted: false, _id: id }, (err, data) => {
        if (err || data === null) reject(err);
        else {
          resolve(data);
        }
      });
    });
  }

  private static getByIdUser(id) {
    return new Promise<IUsuarioPhotos>((resolve, reject) => {
      photosModel.find({ isDeleted: false, userID: id }, (err, data) => {
        if (err || data === null) reject(err);
        else {
          resolve(data);
        }
      });
    });
  }
}
export default PhotoCtlr;
