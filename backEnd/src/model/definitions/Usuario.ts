
import { IDefault, Inject } from './IDefault';
import * as mongoose from 'mongoose';

export interface IUsuarioModel extends IDefault{

    id: string;
    pass: string;
    email: string;
    nome?: string;
    username: string;
    painame: string;
    
}

let schema = {
    email: { type: String, required: true }, //nome de usuário
    pass: {type: String, required: true },//senha
    nome: { type: String }, //Nome Completo
    username: {type:String}, 
    painame: {type:String},
};

Inject(schema);
export const UsuarioMasterSchema = new mongoose.Schema(schema);
export const UsuarioModel = mongoose.model<IUsuarioModel>('Usuario', UsuarioMasterSchema, 'usuario', false);