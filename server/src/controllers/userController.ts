import {Request, Response} from 'express';
import knex from '../database/connection';
import { uuid } from 'uuidv4';
import bcrypt from 'bcrypt';

import Service from './servicesController';

class usersControllers {

  async index(req: Request, resp: Response){
    const {typeuser} = req.headers;
    console.log(typeuser)
    const users = await knex('users')
                        .where('typeUser', typeuser)
                        .select('idUser','name', 'email','typeUser','active', 'createAt').orderBy('createAt','typeUser')
    console.log(users)
    return resp.json(users);
  }

  async create(req: Request, resp: Response) {

    const {name,email, password, typeUser} = req.body;

    if(await knex('users').where('email', email).select('idUser').first()){
      return resp.status(400).json({"message": "User already exists"})
    }
    
    //Criptografia de senha
    const passwordHash = await bcrypt.hash(password,10);

    const data = {
                  idUser: uuid(),
                  name,
                  email, 
                  password: passwordHash, 
                  typeUser,
                  active: "S"
                 }

    try{
      const user = await knex('users').insert(data, 'idUser');

      if(!user){
        return resp.status(500).json({"message": "Error registering user!"})
      }
      const retorno = await knex('users').where('idUser', user[0]).select('idUser', 'typeUser').first()

      return resp.status(200).json(retorno);
    }
    catch(error){
      return resp.status(400).json({"message": `${error.message}`})
    }
  }

  async update(req: Request, resp: Response) {

    const {typeusersend} = req.headers; //Nível de permissão do usuário requisitante
    const {id} = req.params;
    const {name, email, password, typeUser, active} = req.body;

    //Verifica se há um usuário cadastrado com o email enviado caso ele seja um usuário comum
    if(typeusersend !== "A"){
      //Verificar se há um email cadastrado
      if(await knex('users').where('email', email).select('idUser').first()){
        //Verificar se o email pertence ao usuário
        if((await knex('users').where('email', email).where('idUser', id).select('idUser')).length == 0){
          return resp.status(500).json({"message": "The user does not have permission to change"});
        }
      }
    }
  
    //Criptografia de senha
    const passwordHash = await bcrypt.hash(password,10);
    const data = {
                  name,
                  email, 
                  password: passwordHash, 
                  typeUser,
                  active
                 }
   
    const user = await knex('users')
                      .where('idUser', id)
                      .update(data);

    if(!user){
      return resp.status(500).json({"message": "Error update user!"})
    }
    if(typeUser === "R" && active === "N"){
      Service.removeAssociatePerson(id);
    }
    return resp.json({"message": "Sucess"});
  }
}

export default new usersControllers();