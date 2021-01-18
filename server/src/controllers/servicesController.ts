import {Request, Response} from 'express';
import knex                from '../database/connection';

class servicesController {
  async findServiceCustomer(req: Request, resp: Response){
    const {iduser, typeuser} = req.headers;
    const data = await knex('services') 
                      .leftJoin('customerAndService', 'customerAndService.idService', '=','services.idService')
                      .leftJoin('responsibleUser_service', 'responsibleUser_service.idServices', '=', 'services.idService')
                      .leftJoin('users', 'responsibleUser_service.idResponsible', '=', 'users.idUser')
                      .leftJoin('customerService', 'customerService.idCustomerService', '=', 'customerAndService.idCustomer')
                      .select('services.*', 'customerAndService.status as statusService', 'customerService.idCustomerService as Customer','customerService.idCliente as Idcliente', 'responsibleUser_service.salesCommission').orderBy('customerAndService.idCustomer','services.idService')
                      .modify(function(queryBuilder) {
                        if (typeuser == "S") { 
                            queryBuilder.where('customerService.idCliente', iduser); //Busca os serviços do cliente
                        }
                        else if(typeuser == "R"){
                          queryBuilder.where('responsibleUser_service.idResponsible', iduser);
                        }
                      })   
                      .then(function (results) {
                          return results;
                      })
                      .catch(function(err) {
                        console.error(err.message);
                      });
      console.log(data)
      return resp.json(data);

  }
  async index(req: Request, resp: Response){
   const {typeuser} = req.headers;  
   const services = await knex('services')
                          .leftJoin('responsibleUser_service', 'responsibleUser_service.idServices', '=','services.idService')
                          .leftJoin('users', 'users.idUser','=', 'responsibleUser_service.idResponsible')
                          .select('services.*', 'users.name').orderBy('services.idService')
                          .modify(function(queryBuilder) {
                            if (typeuser !== "A") { 
                                queryBuilder.where('status', "D");
                                queryBuilder.whereNotNull('users.name')
                            }
                          })   
                          .then(function (results) {
                              resp.send(results);
                          });
    return resp.json(services);
  }

  async create(req: Request, resp: Response) {
    const {title, description, value, totalMinutes} = req.body; 

    if(await knex('services').where('title', title).select('idService').first()){
      return resp.status(400).json({"message": "Title already exists"})
    }

    const service = {
                      title,
                      description, 
                      value, 
                      totalMinutes
                    }

    try {
       const idServ = await knex('services').insert(service, 'idService');
 
       if(!idServ){
         return resp.status(500).json({"message": "Error registering service!"})
       }
 
       return resp.status(200).json({idService: idServ[0]});

    } 
    catch (error) {
       return resp.status(500).json({"message": `${error.message}`});
    }
  }

  async update(req: Request, resp: Response){
    const {id} = req.params;
    const {title, description, value, totalMinutes} = req.body; 
    
    //Verifica se há um titulo cadastrado
    if(await knex('services').where('title', title).select('idService').first()){
      //Verificar se o titulo pertence ao serviço
      if((await knex('services').where('title', title).where('idService', id).select('idService')).length == 0){
        return resp.status(500).json({"message": "Invalid title"});
      }
    }

    const service = {
                      title,
                      description, 
                      value, 
                      totalMinutes,
                      updateAt: new Date().toLocaleString()
                    }
    try {
      const serv = await knex('services')
                         .where('idService', id)
                         .update(service);

      if(!serv){
        return resp.status(500).json({"message": "Error update service!"})
      }

      return resp.status(200).json({"message": "OK"})
    } 
    catch (error) {
      return resp.status(500).json({"message": `${error.message}`});
    }
  }

  async associatePerson(req:Request, resp:Response){
    const {idServices, idResponsible, salesCommission} = req.body; 
    
    const data = {
                  idServices, 
                  idResponsible, 
                  salesCommission
                }
    //Verifica se há um representante para o serviço adicionado
    const IdAssociate = await knex('responsibleUser_service').where('idServices', idServices).select('idResponsibleUser_service').first();
    if(IdAssociate != undefined){
      //UPDATE
      const associate = await knex('responsibleUser_service')
                              .where('idResponsibleUser_service', IdAssociate.idResponsibleUser_service)
                              .update(data);

      if(!associate){
        return resp.status(500).json({"message": "Error update service!"})
      }
    }
    else{
      //INSERT
      const associate = await knex('responsibleUser_service').insert(data, 'idResponsibleUser_service');

      if(!associate){
        return resp.status(500).json({"message": "Error registering associate!"})
      }
    }
    return resp.status(200).json({"message": "OK"})
  }

  async removeAssociatePerson(idUser:String){
    
    const IdAssociate = await knex('responsibleUser_service').where('idResponsible', idUser).select('idResponsibleUser_service');
    
    IdAssociate.map(async (x)=>{
      await knex('responsibleUser_service').where('idResponsibleUser_service',x.idResponsibleUser_service).delete();
    });
  }

}

export default new servicesController();