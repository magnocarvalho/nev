import { UsuarioModel, IUsuarioModel } from "../model/definitions/Usuario";

class UsuarioCtrl {
  static create(req, res, next) {
    var obj = req.body;
    UsuarioModel.create(obj, (err, data) => {
      if (err) next(err);
      else res.json(data);
    });
  }
 
  static login(req, res, next) {
      var obj = req.body;
      var email = obj.email;
      var pass = obj.pass;
      UsuarioCtrl.getByLogin(email, pass).then( data => {
        if(data)
        {
            res.json(data);
        }
      },
      err => {
        next(err);
      });
      
  }
 

  static getDadosUsuario(req, res, next) {
    console.log(req);
    UsuarioCtrl.getAllUsuarios().then(
      data => {
        res.json(data);
      },
      err => {
        next(err);
      }
    );
  }
  static getUsuarios(req, res, next) {
    var pai = req.params.user;
    UsuarioCtrl.getUsuariosFilhos(pai).then(
      data => {
        res.json(data);
      },
      err => {
        next(err);
      }
    );
  }

  private static getById(id) {
    return new Promise<IUsuarioModel>((resolve, reject) => {
      UsuarioModel.findOne({ isDeleted: false, id: id }, (err, data) => {
        if (err || data === null) reject(err);
        else {
          resolve(data);
        }
      });
    });
  }
  private static getByLogin(email, pass) {
    return new Promise<IUsuarioModel>((resolve, reject) => {
      UsuarioModel.findOne({ isDeleted: false, email: email, pass: pass }, {pass:0}, (err, data) => {
        if (err || data === null) reject(err);
        else {
          resolve(data);
        }
      });
    });
  }
  private static getUsuariosFilhos(painome)
  {
    return new Promise<IUsuarioModel>((resolve, reject) => {
      UsuarioModel.find({ isDeleted: false, painame: painome }, {pass:0}, (err, data) => {
        if (err || data === null) reject(err);
        else {
          resolve(data);
        }
      });
    });
  }
  private static getAllUsuarios()
  {
    return new Promise<IUsuarioModel>((resolve, reject) => {
      UsuarioModel.find({ isDeleted: false }, {pass:0}, (err, data) => {
        if (err || data === null) reject(err);
        else {
          resolve(data);
        }
      });
    });
  }
}
export default UsuarioCtrl;
