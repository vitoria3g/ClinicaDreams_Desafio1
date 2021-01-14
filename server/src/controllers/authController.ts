import {Request, Response, NextFunction} from 'express';
import knex                              from '../database/connection';
import bcrypt                            from 'bcrypt';
import jwt                               from 'jsonwebtoken';
import * as auth                         from '../config/auth.json'

interface User{
  idUser: number;
  name: string;
  email:string;
  password:string;
  typeUser:string;
}


class authControllers {

  //Função para validação de TOKEN (em desenvolvimento)
  async validateAuthUser(req: Request, resp: Response, next:NextFunction){
  
    const authHeader = req.headers.authorization;
    if(!authHeader){
      return resp.status(401).json({"message": "Fail Token"});
    }
    if(authHeader.split(" ").length !== 2){
      return resp.status(401).json({"message": "Error Token"});
    }
     
    return next(); //próximo middware
  
  }

  async index(req: Request, resp: Response){
    const users = await knex('users')
                       .select('*')
    return resp.json(users);
  }

  async show(req: Request, resp: Response){
    const {email, password} = req.body; 
    
    const user:Array<User> = await knex('users')
                                  .where('email', email)
                                  .select('idUser', 'email','password', 'typeUser')
    
    if(user.length == 0){
      return resp.status(400).json({"message": "User not found!"});
    }

    //Validação de senha enviada pelo usuário e a senha cadastrada para o e-mail informado
    if(!await bcrypt.compare(password, user[0].password)){
      return resp.status(400).json({"message": "Invalid password"})
    }
    /*
    O item abaixo cria validação de um dia para o Token de autenticação do usuário
    const token = jwt.sign({id: user[0].idUser}, auth.secret,{
      expiresIn: 86400 //1 dia de validação
    });
    */

    const token = generateToken(user[0].idUser);
    
    return resp.status(200).json({user, token})
  }

}

//Gera o TOKEN de autenticação 
function generateToken(idUser:number){
  return jwt.sign({id: idUser}, auth.secret,{
    expiresIn: 86400 //1 dia de validação
  });
}

export default new authControllers();